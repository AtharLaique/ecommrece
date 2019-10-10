import React, { Component } from "react";
import "../../assets/css/AdminNav.css";
import AdminNav from "../../components/navbar/AdminNav";
import AdminSideBar from "../../components/navbar/AdminSideBar";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//@ant desing
import "antd/dist/antd.css";
import { Card, Input, Icon, Button, message, Spin, Divider } from "antd";
//@ Axios
import axios from "axios";
//Url
import url from "../../config/Url";
//msg
import { success } from "../../assets/js/successMsg";
//@LoginHandler
import {LoginHandling} from "../../Redux/Actions/loginAct";

class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null, des: null, loading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleDes = this.handelDes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };
  //Onchane
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  handelDes = e => {
    this.setState({ des: e.target.value });
  };

  //Submit Fom
  handleSubmit = async event => {
    if (!this.state.value) {
      this.warning("Email is required");
      event.preventDefault();
    } else if (!this.state.des) {
      this.warning("Password is required");
      event.preventDefault();
    } else {
      this.setState({ loading: true });
      let data = {
        email: this.state.value,
        password: this.state.des,
        eRoleId: 0
      };
      //@ call the login action to complete the login process
      this.setState({ loading: false, value: null, des: null });
      await this.props.LoginHandling(data, this.props.history);

    
    }
  };
  //Empty Field Function
  warning = msg => {
    message.warning(msg);
  };
  render() {
    const { TextArea } = Input;
    //const { value } = this.state;
    return (
      <Spin spinning={this.state.loading} tip='Adding Page ...' size='large'>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div class='wrapper  '>
          <Card
            bordered={true}
            style={{ width: "35%", margin: "auto", borderRadius: "5px" }}
            className='shadow-lg '>
            <Divider>
              {" "}
              <h2>Admin Login</h2>
            </Divider>

            <form onSubmit={this.handleSubmit}>
              <Input
                placeholder='Enter Page Name'
                type='email'
                size='large'
                value={this.state.value}
                onChange={this.handleChange}
                prefix={
                  <Icon type='mail' style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
              <br />
              <br />
              <Input
                placeholder='Password'
                size='large'
                type='password'
                value={this.state.des}
                onChange={this.handelDes}
                prefix={
                  <Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
              <br />
              <br />
              <Button type='primary' value='Submit' onClick={this.handleSubmit}>
                Submit
              </Button>
            </form>
          </Card>
        </div>
      </Spin>
    );
  }
}
export default connect(
  null,
  { LoginHandling }
)(withRouter(AdminLogin));
