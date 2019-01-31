import React, { Component } from "react";
import Axios from "axios";

export default class Home extends Component {
  componentDidMount() {
    const token = sessionStorage.getItem("token");
    Axios.get("/users/getuser", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(data => console.log(data));
  }
  render() {
    return (
      <div>
        <p>Test</p>
      </div>
    );
  }
}
