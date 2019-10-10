import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Dropdown } from "rsuite";
import "rsuite/styles/less/index.less";
import "rsuite/dist/styles/rsuite.min.css";

//@antd
import { PageHeader } from 'antd';
import "antd/dist/antd.css";


export default class ProductContent extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12}>
       
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={4} lg={6}>
            <Row>
              <Col xs={12} md={12} lg={12}>
                sidenav
              </Col>
            </Row>
          </Col>
          <Col xs={6} md={4} lg={6}>
            <Row>
              <Col className='offset-md-3' xs={12} md={12} lg={12}>
                <Dropdown title='Most Relevent'>
                  <Dropdown.Item>New File</Dropdown.Item>
                  <Dropdown.Item>New File with Current Profile</Dropdown.Item>
                  <Dropdown.Item>Download As...</Dropdown.Item>
                  <Dropdown.Item>Export PDF</Dropdown.Item>
                  <Dropdown.Item>Export HTML</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>About</Dropdown.Item>
                </Dropdown>
              </Col>
              <Col xs={12} md={12} lg={12}>
                <h1>Content</h1>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
