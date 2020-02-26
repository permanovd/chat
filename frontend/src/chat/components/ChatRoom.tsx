import React, { Component } from "react"
import { User } from "../../security/services/AuthService";


export class ChatRoom extends Component<{ user: User }, {}> {

    render() {
        return (
            <div>Welcome {this.props.user.name}</div>
        );
    }
}

export default ChatRoom