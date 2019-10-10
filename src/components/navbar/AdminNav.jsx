import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "../../assets/css/AdminNav.css";
export default class AdminNav extends Component {
  componentDidMount = () => {
    $(document).ready(function() {
      $("#sidebarCollapse").on("click", function() {
        $("#sidebar").toggleClass("active");
        $(this).toggleClass("active");
      });
    });
  };

  render() {
    return (
      <nav id='sidebar'>
        <div class='sidebar-header text-center'>
          <h3>E-Commress Product</h3>
        </div>

        <ul class='list-unstyled components '>
          <div class='img-wrapper text-center'>
            <img
              src={require("../../assets/img/7_avatar-512.png")}
              class='img-fluid rounded-circle'
              alt='Square Sheep'
              width='90px'
              height='90px'
            />
            <figcaption class='figure-caption text-center font-weight-bold'>
              Admin Name
            </figcaption>
            <figcaption class='figure-caption text-center '>
              A Genral Manager
            </figcaption>
          </div>
          <br />
          <li>
            <Link to='/admin/dash'>
              &nbsp;&nbsp;<i class='fa fa-home' aria-hidden='true'></i>
              &nbsp;&nbsp;Dashboard
            </Link>
            <li>
              {/*---------Pages----------*/}
              <a
                href='#homeSubmenu'
                data-toggle='collapse'
                aria-expanded='false'
                class='dropdown-toggle'>
                &nbsp;&nbsp;<i class='fa fa-clipboard' aria-hidden='true'></i>
                &nbsp;&nbsp;Pages
              </a>
              <ul class='collapse list-unstyled' id='homeSubmenu'>
                <li>
                  <Link to='/admin/listpage'>List Pages</Link>
                </li>
                <li>
                  <Link to='/admin/adpage'>Create New Pages</Link>
                </li>
              </ul>
            </li>
            {/*---------Menue----------*/}
            <a
              href='#pageSubmenu'
              data-toggle='collapse'
              aria-expanded='true'
              class='dropdown-toggle'>
              &nbsp;&nbsp;
              <i class='fa fa-bars' aria-hidden='true'></i>
              &nbsp;&nbsp; Menus
            </a>
            <ul class='collapse list-unstyled' id='pageSubmenu'>
              <li>
                <Link to='/admin/addmenu'>Ad Menu </Link>
              </li>
            </ul>
            {/*---------Product----------*/}
            <a
              href='#prodSubmenu'
              data-toggle='collapse'
              aria-expanded='true'
              class='dropdown-toggle'>
              &nbsp;&nbsp;
              <i class='fa fa-cubes' aria-hidden='true'></i>
              &nbsp;&nbsp; Prod
            </a>
            <ul class='collapse list-unstyled' id='prodSubmenu'>
              <li>
                <Link to='/admin/listprod'>Product List</Link>
              </li>
              <li>
                <Link to='/admin/addprod'>Add New Product </Link>
              </li>
            </ul>
          </li>

          {/*---------Other----------*/}
          <li>
            <a href='#'>
              &nbsp;&nbsp;<i class='fa fa-users' aria-hidden='true'></i>
              &nbsp;&nbsp;Users
            </a>
          </li>
          <li>
            <Link to='/'>
              &nbsp;&nbsp;<i class='fa fa-signal' aria-hidden='true'></i>
              &nbsp;&nbsp;Report
            </Link>
          </li>
          <li>
            <Link to='/admin/upload'>
              &nbsp;&nbsp;<i class='fa fa-signal' aria-hidden='true'></i>
              &nbsp;&nbsp;Pages
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
