import React, { Component } from "react";
import "./ChatBox.css";

export default class ChatBox extends Component {
  state = {
    chatValue: ""
  };
  handleChange = e => {
    this.setState({ chatValue: e.target.value });
  };
  render() {
    return (
      <div className="chatWindow">
        <p>Chat window </p>
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
