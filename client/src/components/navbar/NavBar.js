import React, { Component } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";

class NavBar extends Component {
  state = {
    currentGroupName: ""
  };
  componentDidMount() {
    this.setState({ currentGroupName: this.props.match.params.groupname });
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.props.location.pathname !== prevState.location.pathname) {
      this.setState({ currentGroupName: this.props.match.params.groupname });
    }
  }

  render() {
    const username = sessionStorage.getItem("username");
    return (
      <div>
        <div className="move">
          <button className="showNav" onClick={this.props.handleSideBar}>
            <FontAwesomeIcon icon="bars" />
          </button>
          <div className="main-nav">
            <ul className="navList">
              <li className="appName">WeChat</li>
              <li className="currentGroup">
                Currently in {this.state.currentGroupName}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
