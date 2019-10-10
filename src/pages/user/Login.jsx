import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
//@antd
import { Tabs, Icon, TabPane, Divider, Card ,message} from "antd";
import "antd/dist/antd.css";
//@Redux
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginuser } from "../../Redux/Actions/loginAction";
 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  //@ Extracting values from fields
  onEmailchange = event => {
    this.setState({ email: event.target.value });
  };
  onPasswordchange = event => {
    this.setState({ password: event.target.value });
  };
  //@ On Submit form
  onsubmit = () => {
   
    if(!this.state.email )
    {
      message.warning('Email is required')
    }
    else if(!this.state.password )
    {
      message.warning('password  is required')
    }
    else{
      const newUser = {
        email: this.state.email,
        password:this.state.password
      };
       this.props.loginuser(newUser, this.props.history);
    }
  };
  render() {
    const { TabPane } = Tabs;
    return (
      <div className='container '>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
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
              <Col xs={12} md={3} lg={3}></Col>
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
                      
                          <div class='form-group'>
                            <label for='name'>Enter Email</label>
                            <input
                              type='email'
                              name='email'
                              id='email'
                              class='form-control'
                              placeholder='Email ...'
                              required
                              onChange={this.onEmailchange}
                            />
                          </div>

                          <div class='form-group'>
                            <label for='telephone'>EnterPassword</label>
                            <input
                              type='password'
                              class='form-control'
                              id='password'
                              name='password'
                              placeholder='Enter Your password'
                              required
                              minlength='7'
                              maxlength='12'
                              onChange={this.onPasswordchange}
                            />
                          </div>

                          <button
                            type='submit'
                            class='btn btn-info '
                            onClick={this.onsubmit}>
                            Login
                          </button>
                        
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

                          <button type='button' class='btn btn-info '>
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
const mapStateToProps = state => ({
  Error: state.login
});

export default connect(
  mapStateToProps,
  { loginuser }
)(withRouter(Login));
