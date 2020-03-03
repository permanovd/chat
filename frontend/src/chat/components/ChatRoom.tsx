import React, { Component } from "react"
import { User } from "../../security/services/AuthService";
import { Client, IMessage } from '@stomp/stompjs';
import { Message } from "../domain/Message";

type ChatRoomState = {
    userInput: string,
    messages: Array<Message>
}

type ChatRoomProps = {
    user: User;
    wsUrl: string;
};

export class ChatRoom extends Component<ChatRoomProps, ChatRoomState> {

    state = {
        userInput: "",
        messages: new Array<Message>()
    }

    private messageRepo!: Client;

    constructor(props: ChatRoomProps) {
        super(props)

        this.messageRepo = new Client({
            brokerURL: this.props.wsUrl,
            connectHeaders: {
                login: this.props.user.name,
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000
        });

        this.onMessageChanged = this.onMessageChanged.bind(this);
        this.onMessageFormSubmit = this.onMessageFormSubmit.bind(this);
    }

    componentDidMount() {
        this.messageRepo.activate();

        this.messageRepo.onConnect = () => {
            this.messageRepo.subscribe("/chat/messages/onUpdate", (data: IMessage) => {

                const message = Message.of(JSON.parse(data.body));
                this.setState(prevState => ({
                    messages: [
                        ...prevState.messages,
                        message
                    ]
                }));

            });
        };
    }

    componentWillUnmount() {
        this.messageRepo.deactivate();
    }

    onMessageChanged(event: any) {
        this.setState({ userInput: event.target.value });
    }

    onMessageFormSubmit(e: any) {
        e.preventDefault();

        const text: string = this.state.userInput;
        if (text.length === 0) {
            return;
        }

        this.sendMessage(text);
        this.setState({ userInput: "" });
    }

    sendMessage(text: string) {
        const payload = {
            author: this.props.user.name,
            text: text,
            date: new Date().toISOString(),
        };

        this.messageRepo.publish({ destination: "/chat/messages/new", body: JSON.stringify(payload) });
    }

    renderMessages() {
        return this.state.messages.map((message: Message) => {
            // Date format taken from https://stackoverflow.com/a/25279399/4082772
            return (
                <div className="col-12 alert alert-secondary">
                    <span className="badge badge-primary">{message.author.name}</span>
                    <span className="ml-1 badge badge-dark">{message.date.toISOString().substr(11, 8)}</span>
                    <div className="mt-2 col-12">{message.text}</div>
                </div>);
        });
    }

    render() {
        return (
            <div className="row mb-5">
                <div className="col-12"><div className="alert alert-success">Welcome user: "{this.props.user.name}"</div></div>
                <hr />
                <div className="col-12">{this.renderMessages()}</div>
                <hr />
                <div className="col-12">
                    <form className="form-inline" onSubmit={this.onMessageFormSubmit} >
                        <div className="form-group col-11">
                            <input type="text" className="form-control col-12" value={this.state.userInput} onChange={this.onMessageChanged} placeholder="message" />
                        </div>
                        <input type="submit" className="btn btn-primary col-1" value="Send" />
                    </form>
                </div>
            </div>
        );
    }
}

export default ChatRoom