import React, { Component } from "react";
import axios from "axios";
import "./FloatingLabel.css";
import { withRouter } from "react-router";

class FloatingLabel extends Component {
  state = {
    userNameActive: false,
    passActive: false,
    userNameValue: "",
    passValue: "",
    error: false,
    errorMsg: ""
  };

  activateField = value => {
    {
      value === "pass"
        ? this.setState({ passActive: true })
        : this.setState({ userNameActive: true });
    }
  };
  disableFocus = e => {
    if (e === "pass" && this.state.passValue === "") {
      this.setState({ passActive: false });
    }

    if (e === "userName" && this.state.userNameValue === "") {
      this.setState({ userNameActive: false });
    }
  };
  handleUserNameChange = e => {
    if (this.state.userNameValue.length > 70) {
      this.setState({
        error: true,
        errorMsg: "Username cannot be greater than 70 characters"
      });
    }
    this.setState({ userNameValue: e.target.value });
    e.preventDefault();
  };
  handlePassChange = e => {
    this.setState({ passValue: e.target.value });
    e.preventDefault();
  };
  handleLogin = async e => {
    const data = {
      username: this.state.userNameValue,
      password: this.state.passValue
    };
    e.preventDefault();
    if (this.state.passValue === "" || this.state.userNameValue === "") {
      this.setState({ error: true, errorMsg: "All fields are required." });
    } else if (this.state.passValue.length < 6) {
      this.setState({
        error: true,
        errorMsg: "Password must be at least 6 characters."
      });
    } else if (this.props.type === "register") {
      try {
        const res = await axios.post("/users/register", data);
        if (res.data.errors) {
          this.setState({
            error: true,
            errorMsg: res.data.msg
          });
        }
        this.props.history.push("/login");
        this.props.handleRegister(res.isRegistered);
      } catch (error) {}
    } else {
      try {
        const res = await axios.post("/users/login", data);
        if (res.data.err) {
          this.setState({
            error: true,
            errorMsg: res.data.err.message
          });
        }
        if (res.data.token) {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("username", res.data.username);

          this.props.history.push("/groups/welcome");
        }
      } catch (error) {}
    }
  };
  render() {
    const {
      userNameValue,
      passValue,
      userNameActive,
      passActive,
      error,
      errorMsg
    } = this.state;
    const { isRegistered } = this.props;
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <div className="field-group">
            <label
              onClick={() => this.activateField("userName")}
              className={userNameActive ? "field-active" : "formLabel"}
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
          {error ? (
            <div className="errorDiv">
              <p className="errorMsg">{errorMsg}</p>
            </div>
          ) : (
            ""
          )}
          {isRegistered ? (
            <div className="loginMsgDiv">
              <p className="loginMsg">You may now login.</p>
            </div>
          ) : (
            ""
          )}
          <div className="field-group">
            <label
              onClick={() => this.activateField("pass")}
              className={passActive ? "password-active" : "formLabel"}
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
          <button className="submitBtn">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(FloatingLabel);
