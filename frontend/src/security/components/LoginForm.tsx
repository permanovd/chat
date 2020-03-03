import React, { Component } from "react"
import { AuthService } from "../services/AuthService";
import { toast } from "react-toastify";

type LoginFormState = {
    username: string
}

export class LoginForm extends Component<{ authService: AuthService, authorizedEvent: Function }, LoginFormState> {

    state = {
        username: ""
    }

    constructor(props: any) {
        super(props);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onLoginClick(event: any) {
        event.preventDefault();
        if ("" === this.state.username) {
            toast.error("Please enter your nickname");
            return;
        }

        this.props.authService.authorize(this.state.username);
        this.props.authorizedEvent.call(this);
    }

    handleChange(event: any) {
        let name: string = String(event.target.value).trim();
        this.setState({ username: name });
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <form onSubmit={this.onLoginClick}>
                        <div className="form-group">
                            <label htmlFor="nickname-input">Nickname</label>
                            <input id="nickname-input" className="form-control" type="text" aria-describedby="nicknameHelp" placeholder="enter your nickname" value={this.state.username} onChange={this.handleChange} />
                            <small id="nicknameHelp" className="form-text text-muted">Will be displayed in your messages.</small>
                        </div>
                        <input className="btn btn-primary" type="submit" value="Enter chat room" />
                    </form>
                </div>

            </div>
        );
    }
}