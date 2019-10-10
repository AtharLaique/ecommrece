import React, { Component } from "react";
import "../../assets/css/AdminNav.css";
import AdminNav from "../../components/navbar/AdminNav";
import AdminSideBar from "../../components/navbar/AdminSideBar";
//@ant desing
import "antd/dist/antd.css";
import { Card, Input, Icon, Button, message, Spin, Divider } from "antd";
//@ Axios
import axios from "axios";
//Url
import url from "../../config/Url";
//msg
import { success } from "../../assets/js/successMsg";

export default class AdPages extends Component {
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
      this.warning("Page name is requires");
      event.preventDefault();
    } else if (!this.state.des) {
      this.warning("Description of page is required");
      event.preventDefault();
    } else {
      this.setState({ loading: true });
      let data = {
        name: this.state.value,
        description: this.state.des,
        productCategoryId: 0
      };
      let res = await axios.post(url.AddPage, data);
      if (res.status == "200") {
        this.setState({ loading: false, value: null, des: null });
        success("Page is added successfully");
      }
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

                <AdminSideBar />
              </div>
            </nav>
            {/*----------------Content-------------------*/}
            
              <Card
                bordered={true}
                style={{ width: "44%", margin: "auto", borderRadius: "10px" }}
                className='shadow-lg '>
                <Divider>
                  {" "}
                  <h2>Add Page</h2>
                </Divider>

                <form onSubmit={this.handleSubmit}>
                  <Input
                    placeholder='Enter Page Name'
                    type='text'
                    value={this.state.value}
                    onChange={this.handleChange}
                    prefix={
                      <Icon type='form' style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                  <br />
                  <br />
                  <TextArea
                    type='text'
                    value={this.state.des}
                    onChange={this.handelDes}
                    placeholder='Enter Description for Page . . .'
                    autosize={{ minRows: 3, maxRows: 5 }}
                  />
                  <br />
                  <br />
                  <Button
                    type='primary'
                    value='Submit'
                    onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </form>
              </Card>
         
          </div>
        </div>
      </Spin>
    );
  }
}
