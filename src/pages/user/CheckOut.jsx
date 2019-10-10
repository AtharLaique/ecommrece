import React, { Component } from "react";
import { Form, Icon, Input, Button, Card } from "antd";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class CheckOut extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <h1 className='text-center'>Place Your Order</h1>
        <br />
        <br />
        <Container>
          <Row>
            <Col lg={6}>
              <Card
                title='Billing Detail'
                extra={<a href='#'>More</a>}
                style={{ width: "90%" }}>
                <Input
                  prefix={
                    <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder='First Name'
                />
                <br />
                <br />

                <Input
                  prefix={
                    <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder='Last Name'
                />
                <br />
                <br />
                <Input
                  prefix={
                    <Icon type='mail' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder='Email'
                />
                <br />
                <br />

                <Input
                  prefix={
                    <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder='Phone'
                />
                <br />
                <br />
                <Input
                  prefix={
                    <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder='Country'
                />
                <br />
                <br />
                <Input
                  prefix={
                    <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder='City'
                />
                <br />
                <br />
                <Input
                  prefix={
                    <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder='Address'
                />
                <br />
                <br />
              </Card>
            </Col>
            {/*---------------------ORDER-----------------*/}
            <Col lg={5}>
              <Card
                title='Your Order'
                style={{ width: 300 }}
                cover={
                  <img
                    alt='example'
                    src={require("../../assets/img/cart.png")}
                  />
                }
                actions={[
                  <Link to='/yourcart'>
                    <Icon type='edit' key='edit' />
                  </Link>,
                  <Icon type='swap-left' />
                ]}></Card>

              <br />
              <br />
              <br />
              <br />
              <Link to='/'>
                <Button type='danger'>Back to Shoping</Button>
              </Link>
            </Col>
          </Row>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}
