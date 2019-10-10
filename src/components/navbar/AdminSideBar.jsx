import React, { Component } from "react";

import "../../assets/css/AdminNav.css";

export default class AdminSideBar extends Component {
  Logout = () => {
    localStorage.setItem("ROLE", null);
    localStorage.setItem("LOG", null);
    window.location.replace("/");
  };
  render() {
    return (
      <div class='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul class='nav navbar-nav ml-auto'>
          <li class='nav-item active'>
            <a class='nav-link' href='#'>
              Page
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#'>
              Page
            </a>
          </li>
          <li class='nav-item'>
            <a class='nav-link' href='#'>
              Page
            </a>
          </li>
          <li class='nav-item' onClick={this.Logout}>
            <a class='nav-link' href='#'>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
