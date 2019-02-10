import React, { Component } from "react";
import "./ChatBox.css";
import { withRouter } from "react-router";
import Axios from "axios";
import io from "socket.io-client";
let socket = io.connect("/");
// || "http://localhost:5000"

class ChatBox extends Component {
  state = {
    chatValue: "",
    username: "test",
    message: "this is a test ",
    chatMessages: []
  };

  componentDidMount() {
    socket.emit("joinroom", {
      room: this.props.match.params.groupname,
      username: sessionStorage.getItem("username")
    });
    this.getChatHistory();
    this.socketFunctions();
  }
  getChatHistory = async () => {
    const res = await Axios.get(`/groups/${this.props.match.params.groupname}`);
    let chatHistory = [];
    res.data.chatHistory.map(item => {
      let newObject = {
        username: item.username,
        message: item.message
      };
      chatHistory.push(newObject);
    });
    this.setState({ chatMessages: chatHistory });
  };
  socketFunctions = () => {
    socket.on("sendchat", data => {
      this.setState({
        chatMessages: this.state.chatMessages.concat(data)
      });
    });
  };
  componentDidUpdate(prevState, prevProps) {
    if (this.props.location.pathname !== prevState.location.pathname) {
      this.setState({ chatValue: "" });
      socket.emit("joinroom", {
        room: this.props.match.params.groupname,
        username: sessionStorage.getItem("username")
      });
      this.getChatHistory();
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
    socket.emit("sendchat", {
      room: this.props.match.params.groupname,
      message: this.state.chatValue,
      username: sessionStorage.getItem("username")
    });
    this.setState({ chatValue: "" });
  };
  render() {
    return (
      <div className="chatWindow">
        <div className="messageWindow">
          {this.state.chatMessages.map(({ username, message }) => (
            <div className="messageContainer" key={message}>
              <span className="userName">{username}</span>
              <p className="message">{message}</p>
            </div>
          ))}
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
            <button
              disabled={!this.state.chatValue}
              onClick={this.handleSubmit}
              className="msgSubmitBtn"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ChatBox);
