import React, { Component } from "react";
import PropTypes from "prop-types";

import Axios from "axios";
import SideBar from "../sideBar/SideBar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import ChatBox from "../chatbox/ChatBox";
import { withStyles } from "@material-ui/core/styles";
import NavBar from "../navbar/NavBar";

const classes = () => ({
  drawerPaper: {
    width: 240,
    backgroundColor: "hsl(234, 62%, 26%)",
    zIndex: 1,
    height: 94 + "vh",
    position: "absolute",
    top: "50px"
  }
});
class Home extends Component {
  state = {
    mobileOpen: false
  };
  componentDidMount() {}
  handleLogout = () => {
    sessionStorage.removeItem("token");
    Axios.get("/users/logout");
    this.props.history.push("/");
  };

  handleSideBar = props => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar handleSideBar={this.handleSideBar} />
        <div className="homeWrapper">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              open={this.state.mobileOpen}
              anchor="left"
              onClose={this.handleSideBar}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <SideBar />
            </Drawer>
          </Hidden>

          <Hidden xsDown implementation="css">
            <Drawer
              variant="permanent"
              open={true}
              className="drawer"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              <SideBar />
            </Drawer>
          </Hidden>
          <ChatBox />
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(classes)(Home);
