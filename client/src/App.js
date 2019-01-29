import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
class App extends Component {
  state = {
    isLoggedIn: false,
    isRegistered: false
  };
  handleRegister = msg => {
    if (msg === true) {
      this.setState({ isRegistered: true });
    }
  };
  handleLogin = msg => {
    if (msg === true) {
      this.setState({ isLoggedIn: true });
    }
    console.log(msg);
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              handleRegister={this.handleRegister}
              component={Register}
            />
            <ProtectedRoute
              isLoggedIn={this.state.isLoggedIn}
              exact
              path="/test"
              component={Home}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
