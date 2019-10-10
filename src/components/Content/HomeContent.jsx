import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
//@Animation package import
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

export default class HomeContent extends Component {
  componentDidMount = () => {};
  render() {
    return (
      <div>
        <Row>
          <Col xs={12} md={4} lg={4}>
            <Fade left cascade>
              <div>
                <img
                  src={require("../../assets/img/SYUITS.jpg")}
                  className='img-fluid p-2'
                />
              </div>
            </Fade>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <Zoom cascade>
              <div>
                <img
                  src={require("../../assets/img/ACCESSORIES.jpg")}
                  className='img-fluid'
                />
              </div>
            </Zoom>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <Fade right cascade>
              <div>
                <img
                  src={require("../../assets/img/SHERWANI.jpg")}
                  className='img-fluid p-2'
                />
              </div>
            </Fade>
          </Col>
          <Col xs={12} md={12} lg={12}>
            <Fade top cascade>
              <div>
                <img
                  src={require("../../assets/img/SHOE.jpg")}
                  className='img-fluid p-2'
                />
              </div>
            </Fade>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <Fade right cascade>
              <div>
                <img
                  src={require("../../assets/img/SHIRT.jpg")}
                  className='img-fluid p-2'
                />
              </div>
            </Fade>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <Fade left cascade>
              <div>
                <img
                  src={require("../../assets/img/PRINCECOAT.jpg")}
                  alt='noting'
                  className='img-fluid p-2'
                />
              </div>
            </Fade>
          </Col>
        </Row>
      </div>
    );
  }
}
