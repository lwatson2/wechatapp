import React, { Component } from "react";
import "./ChatBox.css";
import { withRouter } from "react-router";
import Axios from "axios";

class ChatBox extends Component {
  state = {
    chatValue: "",
    username: "test",
    message: "this is a test "
  };

  componentDidMount() {
    Axios.get(`/groups/${this.props.match.params.groupname}`);
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.location.pathname !== prevState.location.pathname) {
      this.setState({ chatValue: "" });
    }
  }

  handleChange = e => {
    this.setState({ chatValue: e.target.value });
  };
  handleSubmit = () => {
    const data = {
      message: this.state.chatValue,
      username: sessionStorage.getItem("username")
    };
    Axios.post(`/groups/${this.props.match.params.groupname}`, data);
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
            <button onClick={this.handleSubmit} className="msgSubmitBtn">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ChatBox);
