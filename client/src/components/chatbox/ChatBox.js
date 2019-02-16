import React, { Component } from "react";
import "./ChatBox.css";
import { withRouter } from "react-router";
import Axios from "axios";
import io from "socket.io-client";
let socket = io.connect("https://floating-woodland-27702.herokuapp.com/", {
  secure: true
});
// || "http://localhost:5000"

class ChatBox extends Component {
  messagesEnd = React.createRef();
  state = {
    chatValue: "",
    time: "",
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
  scrollToBottom() {
    this.messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }
  getChatHistory = async () => {
    const res = await Axios.get(`/group/${this.props.match.params.groupname}`);
    /* let chatHistory = [];
    res.data.chatHistory.map(item => {
      let newObject = {
        username: item.username,
        message: item.message
      }; */
    /*  chatHistory.push(newObject);
    }); */
    this.setState({ chatMessages: res.data.chatHistory }, () =>
      this.scrollToBottom()
    );
  };
  socketFunctions = () => {
    socket.on("sendchat", data => {
      this.setState(
        {
          chatMessages: this.state.chatMessages.concat(data)
        },
        () => this.scrollToBottom()
      );
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
  handleSubmit = e => {
    e.preventDefault();
    const time = Date.now();
    const formattedTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(time);
    const data = {
      message: this.state.chatValue,
      username: sessionStorage.getItem("username"),
      time: formattedTime
    };
    Axios.post(`/group/${this.props.match.params.groupname}`, data);
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
          {this.state.chatMessages.map(({ username, message, time, _id }) => (
            <div className="messageContainer" key={_id}>
              <span className="userName">{username}</span>
              <p className="message">{message}</p>
              <span className="timestamp">{time}</span>
              <div ref={this.messagesEnd} />
            </div>
          ))}
        </div>
        <div className="putToBottom">
          <div className="chatInputContainer">
            <form className="formWrapper" onSubmit={this.handleSubmit}>
              <input
                type="text"
                className="chatInput"
                value={this.state.chatValue}
                onChange={this.handleChange}
                placeholder="Send a message..."
              />
              <button disabled={!this.state.chatValue} className="msgSubmitBtn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(ChatBox);
