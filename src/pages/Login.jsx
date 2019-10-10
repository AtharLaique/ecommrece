import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
//@antd
import { Tabs, Icon, TabPane, Divider, Card } from "antd";
import "antd/dist/antd.css";
export default class Login extends Component {
  render() {
    const { TabPane } = Tabs;
    return (
      <div className='container '>
        
        <Tabs defaultActiveKey='1'>
          <TabPane
            tab={
              <span>
                <Icon type='apple' />
                Login
              </span>
            }
            key='1'>
            <Row>
              <Col xs={12} md={3} lg={6}></Col>
              <Col xs={12} md={4} lg={6}>
                <br />
                <Card
                  bordered={false}
                  style={{ width: "100%" }}
                  className='shadow-sm'>
                  <Divider orientation='center'>
                    <h1>Login</h1>
                  </Divider>
                  <div class='container'>
                    <div class='row'>
                      <div class='col-12'>
                        <form>
                          <div class='form-group'>
                            <label for='name'>Enter Email</label>
                            <input
                              type='text'
                              class='form-control'
                              id='name'
                              placeholder='Your name'
                              required
                            />
                          </div>

                          <div class='form-group'>
                            <label for='telephone'>EnterPassword</label>
                            <input
                              type='text'
                              class='form-control'
                              id='telephone'
                              placeholder='Your telephone number'
                              required
                              minlength='7'
                              maxlength='12'
                            />
                          </div>

                          <button type='submit' class='btn btn-info '>
                            Submit
                          </button>
                        </form>
                        <Divider orientation='center'>
                          Or &nbsp;
                          <a href='#' onClick={this.show}>
                            register now!
                          </a>
                        </Divider>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            <br />
            <br />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type='android' />
                Signup
              </span>
            }
            key='2'>
            <Row>
              <Col xs={12} md={3} lg={4}></Col>
              <Col xs={12} md={6} lg={4}>
                <br />
                <Card
                  bordered={false}
                  style={{ width: "100%" }}
                  className='shadow-sm'>
                  <Divider orientation='center'>
                    <h1>SignUp</h1>
                  </Divider>
                  <div class='container'>
                    <div class='row'>
                      <div class='col-12'>
                        <form>
                          <div class='form-group'>
                            <label for='name'>Enter Email</label>
                            <input
                              type='text'
                              class='form-control'
                              id='name'
                              placeholder='Your name'
                              required
                            />
                          </div>

                          <div class='form-group'>
                            <label for='telephone'>EnterPassword</label>
                            <input
                              type='text'
                              class='form-control'
                              id='telephone'
                              placeholder='Your telephone number'
                              required
                              minlength='7'
                              maxlength='12'
                            />
                          </div>

                          <button type='submit' class='btn btn-info '>
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            <br />
            <br />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
