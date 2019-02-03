import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

library.add(faBars);

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      sessionStorage.getItem("token") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
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

  render() {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
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
              isLoggedIn={isLoggedIn}
              exact
              path="/groups"
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
