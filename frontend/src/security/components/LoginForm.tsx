import React, { Component } from "react"
import { AuthService } from "../services/AuthService";

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

    onLoginClick() {
        this.props.authService.authorize(this.state.username);
        this.props.authorizedEvent.call(this);
    }

    handleChange(event: any) {
        this.setState({ username: event.target.value });
    }

    render() {
        return (
            <div className="row">
                <div className="form-group col-3">
                    <input className="form-control" type="text" placeholder="name" value={this.state.username} onChange={this.handleChange} />
                    <input className="btn btn-primary" type="button" value="Log in" onClick={this.onLoginClick} />
                </div>
            </div>
        );
    }
}