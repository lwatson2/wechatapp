import React, { Component } from "react";
import "./FloatingLabel.css";
export default class FloatingLabel extends Component {
  state = {
    userNameActive: false,
    passActive: false,
    userNameValue: "",
    passValue: ""
  };
  activateField = value => {
    {
      value === "pass"
        ? this.setState({ passActive: true })
        : this.setState({ userNameActive: true });
    }
  };
  disableFocus = e => {
    console.log(e);
    if (e === "pass" && this.state.passValue === "") {
      this.setState({ passActive: false });
    }

    if (e === "userName" && this.state.userNameValue === "") {
      this.setState({ userNameActive: false });
    }
  };
  handleUserNameChange = e => {
    this.setState({ userNameValue: e.target.value });
    e.preventDefault();
  };
  handlePassChange = e => {
    this.setState({ passValue: e.target.value });
    e.preventDefault();
  };
  handleLogin = e => {
    e.preventDefault();
    console.log("login successful");
  };
  render() {
    const { userNameValue, passValue, userNameActive, passActive } = this.state;
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <div className="field-group">
            <label
              onClick={() => this.activateField("userName")}
              className={userNameActive ? "field-active" : ""}
            >
              Username
            </label>
            <input
              className={
                this.state.userNameActive
                  ? "floating-label-active"
                  : "floating-label"
              }
              type="text"
              value={userNameValue}
              onFocus={() => this.activateField("userName")}
              onBlur={() => this.disableFocus("userName")}
              onChange={this.handleUserNameChange}
            />
          </div>
          <div className="field-group">
            <label
              onClick={() => this.activateField("pass")}
              className={passActive ? "password-active" : ""}
            >
              Password
            </label>
            <input
              className={
                this.state.passActive
                  ? "floating-password-active"
                  : "floating-password"
              }
              type="password"
              value={passValue}
              onFocus={() => this.activateField("pass")}
              onBlur={() => this.disableFocus("pass")}
              onChange={this.handlePassChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
