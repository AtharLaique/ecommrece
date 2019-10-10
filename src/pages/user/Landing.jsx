import React, { Component } from "react";
import Footer from "../../components/Footer/Footer";
import Caraousel from "../../components/caraousel/caraousel";
import HomeContent from "../../components/Content/HomeContent";
//@Loding bar
import Loading from "react-loading-bar";
import "react-loading-bar/dist/index.css";
export default class Landing extends Component {
  state = {
    show: true
  };
  render() {
    return (
      <React.Fragment>
        <Caraousel />
        <HomeContent />
      </React.Fragment>
    );
  }
}
