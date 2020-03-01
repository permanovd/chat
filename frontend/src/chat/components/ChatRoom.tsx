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
            debug: function (str) {
                console.log(str);
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
            return (
                <div className="col-12">
                    <div className="col-12">{message.author.name}</div>
                    <div className="col-12">{message.text}</div>
                    <div className="col-12">{message.date.toISOString()}</div>
                </div>);
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">Welcome "{this.props.user.name}"</div>
                <hr />
                <div className="col-12">{this.renderMessages()}</div>
                <hr />
                <div className="col-12">
                    <form onSubmit={this.onMessageFormSubmit} >
                        <div className="form-group">
                            <input type="text" value={this.state.userInput} onChange={this.onMessageChanged} placeholder="message" />
                            <input type="submit" className="btn btn-primary" value="Send" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ChatRoom