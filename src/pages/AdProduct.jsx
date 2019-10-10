import React, { Component } from 'react'
import "../assets/css/AdminNav.css";
import AdminNav from "../components/navbar/AdminNav";
import AdminSideBar from "../components/navbar/AdminSideBar";

export default class AdProduct extends Component {
    render() {
        return (
            <div class='wrapper  '>
            <AdminNav />
            <div id='content'>
              <nav class='navbar navbar-expand-lg navbar-light bg-light  '>
                <div class='container-fluid'>
                  <button type='button' id='sidebarCollapse' class='navbar-btn'>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                  <button
                    class='btn btn-dark d-inline-block d-lg-none ml-auto'
                    type='button'
                    data-toggle='collapse'
                    data-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'>
                    <i class='fas fa-align-justify'></i>
                  </button>
  
                  <AdminSideBar/>
                </div>
              </nav>
              <h1>Its Ad Product</h1>
            </div>
          </div>
      
        )
    }
}
