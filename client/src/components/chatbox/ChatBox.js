import React, { Component } from "react";
import "./ChatBox.css";

export default class ChatBox extends Component {
  state = {
    chatValue: "",
    username: "test",
    message: "this is a test "
  };
  handleChange = e => {
    this.setState({ chatValue: e.target.value });
  };
  render() {
    return (
      <div className="chatWindow">
        <div className="messageWindow">
          <div className="messageContainer">
            <span className="userName">{this.state.username}</span>
            <p className="message">{this.state.message}</p>
          </div>
          <div className="messageContainer">
            <span className="userName">{this.state.username}</span>
            <p className="message">{this.state.message}</p>
          </div>
          <div className="messageContainer">
            <span className="userName">{this.state.username}</span>
            <p className="message">{this.state.message}</p>
          </div>
          <div className="messageContainer">
            <span className="userName">{this.state.username}</span>
            <p className="message">{this.state.message}</p>
          </div>
          <div className="messageContainer">
            <span className="userName">{this.state.username}</span>
            <p className="message">{this.state.message}</p>
          </div>
          <div className="messageContainer">
            <span className="userName">{this.state.username}</span>
            <p className="message">{this.state.message}</p>
          </div>
          <div className="messageContainer">
            <span className="userName">{this.state.username}</span>
            <p className="message">{this.state.message}</p>
          </div>
          <div className="messageContainer">
            <span className="userName">{this.state.username}</span>
            <p className="message">{this.state.message}</p>
          </div>
        </div>
        <div className="putToBottom">
          <div className="chatInputContainer">
            <input
              type="text"
              className="chatInput"
              value={this.state.chatValue}
              onChange={this.handleChange}
              placeholder="Send a message..."
            />
            <button className="msgSubmitBtn">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}
