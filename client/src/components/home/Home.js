import React, { Component } from "react";
import Axios from "axios";
import NavBar from "../navBar/NavBar";
import ChatBox from "../chatbox/ChatBox";

export default class Home extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem("token");
  }
  handleLogout = () => {
    sessionStorage.removeItem("token");
    Axios.get("/users/logout");
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <div className="move">
          <p>Test</p>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
        <NavBar />
        <ChatBox />
      </div>
    );
  }
}
