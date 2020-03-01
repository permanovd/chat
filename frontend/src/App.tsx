import React, { Component } from 'react';
import ChatRoom from './chat/components/ChatRoom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { LoginForm } from "./security/components/LoginForm";
import { AuthService, User } from "./security/services/AuthService";

class App extends Component {
  private authService: AuthService;

  constructor(props: any) {
    super(props);
    this.authService = new AuthService();
    // this.authService = new MockAuthService();
  }

  render() {
    if (!this.authService.isAuthorized()) {
      return (
        <div className="root container" >
          <LoginForm authService={this.authService} authorizedEvent={() => this.forceUpdate()} />
          <ToastContainer />
        </div>
      );
    }

    const user: User = this.authService.currentUser() || { name: "error" };
    return (
      <div className="root container" >
        <ChatRoom user={user} wsUrl="ws://172.29.128.2/chat" />
        <ToastContainer />
      </div>
    );
  }
}

export default App;
