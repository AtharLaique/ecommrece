import React, { Component } from "react";
import { Carousel } from "react-bootstrap";
export default class caraousel extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className='d-block  img-fluid'
              src={require("../../assets/img/web-banner-4.png")}
              alt='Third slide'
            />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block img-fluid'
              src={require("../../assets/img/web-banner-5.png")}
              alt='Third slide'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block img-fluid '
              src={require("../../assets/img/web-banner-4.png")}
              alt='Third slide'
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block img-fluid'
              src={require("../../assets/img/web-banner-5.png")}
              alt='Third slide'
            />
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}
