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
        <div className="chatIput">
          <input
            type="text"
            value={this.state.chatValue}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
