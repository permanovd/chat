import React, { Component } from 'react';
import ChatRoom from './chat/components/ChatRoom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { LoginForm } from "./security/components/LoginForm";
import { AuthService, User } from "./security/services/AuthService";
import { MockAuthService } from './security/services/MockAuthService';

class App extends Component {
  private authService: AuthService;

  constructor(props: any) {
    super(props);
    this.authService = new AuthService();
    // this.authService = new MockAuthService();
  }

  renderHeader() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Chat application</h1>
      </div>
    );
  }

  renderContent() {
    if (!this.authService.isAuthorized()) {
      return (
        <LoginForm authService={this.authService} authorizedEvent={() => this.forceUpdate()} />
      )
    }
    const user: User = this.authService.currentUser() || { name: "error" };

    return (<ChatRoom user={user} wsUrl="ws://172.29.128.2/chat" />)
  }

  render() {
    const header = this.renderHeader();
    const content = this.renderContent();

    return (
      <div className="root container" >
        {header}
        {content}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
