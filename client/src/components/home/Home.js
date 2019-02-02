import React, { Component } from "react";
import Axios from "axios";
import NavBar from "../navBar/NavBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import ChatBox from "../chatbox/ChatBox";
import { withStyles } from "@material-ui/core/styles";

const classes = () => ({
  drawerPaper: {
    width: 240,
    backgroundColor: "blue"
  }
});
class Home extends Component {
  state = {
    showSideBar: false
  };
  componentDidMount() {
    const token = sessionStorage.getItem("token");
  }
  handleLogout = () => {
    sessionStorage.removeItem("token");
    Axios.get("/users/logout");
    this.props.history.push("/");
  };
  handleSideBar = () => {
    this.setState({ showSideBar: !this.state.showSideBar });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="move">
          <p>Test</p>
          <button onClick={this.handleLogout}>Logout</button>
          <button onClick={this.handleSideBar}>Show</button>
        </div>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={this.state.showSideBar}
            anchor="left"
            onClose={this.handleSideBar}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <NavBar />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            open
            className="drawer"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <NavBar />
          </Drawer>
        </Hidden>
        <ChatBox />
      </div>
    );
  }
}
export default withStyles(classes)(Home);
