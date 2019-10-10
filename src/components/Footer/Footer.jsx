import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../assets/css/Footer.css";
export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <Container>
          <Row>
            <Col xs={12} md={6} lg={3}>
              <Row>
                <Col xs={6} md={6} lg={6}>
                  <br />
                  <br />
                  <br />
                  <img
                    src={require("../../assets/img/logo.png")}
                    alt='noting'
                    width='180'
                    height='100'
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={12} md={6} lg={3} style={{ padding: "25px" }}>
              <br />
              <h5>Let Us Help You</h5>
              <a href='/#' className='footerLink' >
                Customer Service
              </a>
              <br />
              <a href='/#' className='footerLink'>
                Orders
              </a>
              <br />
              <a href='/#' className='footerLink'>
                Shipping
              </a>
              <br />
              <a href='/#' className='footerLink'>
                Size Guide
              </a>
              <br />
              <a href='/#' className='footerLink'>
                Account details
              </a>
              <br />
              <a href='/#' className='footerLink'>
                Wishlist
              </a>
            </Col>
            <Col xs={12} md={6} lg={3} style={{ padding: "25px" }}>
              <br />
              <h5>Store Locations</h5>
              <text className='address'>
                DHA – 149 DD Commercial Area, Phase 4 Lahore.
              </text>
              <text className='address'>
                MM Alam – Upper Floor, 9C Mall Lahore.
              </text>
              <text className='address'>
                Blue Area – 56-G Lower Ground, Beverly Center Islamabad.
              </text>
              <br />
              <br />
            </Col>
            <Col xs={12} md={6} lg={3} style={{ padding: "25px" }}>
              <br />
              <h3>Policies</h3>
              <a href='/#' className='footerLink'>
                Privacy Plocy
              </a>{" "}
              <br />
              <a href='/#' className='footerLink'>
                Terms & condition
              </a>
            </Col>
          </Row>
          <Row>
            <Col xs={1} md={2} lg={4}></Col>
            <Col xs={10} md={8} lg={6}>
              <text>COPYRIGHT © RICI MELION. ALL RIGHTS RESERVED</text>
            </Col>
            <Col xs={1} md={2} lg={2}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
