import React, { Component } from "react";
import "../../assets/css/AdminNav.css";
import AdminNav from "../../components/navbar/AdminNav";
import AdminSideBar from "../../components/navbar/AdminSideBar";
//@ant desing
import "antd/dist/antd.css";
import {
  Card,
  Input,
  Icon,
  Button,
  message,
  Spin,
  Divider,
  Select,
  Cascader
} from "antd";
//@ Axios
import axios from "axios";
//Url
import url from "../../config/Url";
//msg
import { success } from "../../assets/js/successMsg";

export default class AddMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      des: null,
      loading: false,
      casseCader: [],
      proId: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDes = this.handelDes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Onchane
  handleChange = event => {
    this.setState({ name: event.target.value });
  };
  handelDes = e => {
    this.setState({ des: e.target.value });
  };

  //Submit Fom
  handleSubmit = async event => {
    if (!this.state.proId) {
      this.warning("Choose Categorie");
      event.preventDefault();
    } else if (!this.state.name) {
      this.warning("Ad name of categorie");
      event.preventDefault();
    } else if (!this.state.des) {
      this.warning("Description of page is required");
      event.preventDefault();
    } else {
      this.setState({ loading: true });
      let data = {
        name: this.state.name,
        description: this.state.des,
        productCategoryId: this.state.proId
      };
      let res = await axios.post(url.AddPage, data);
      if (res.status == "200") {
        this.componentDidMount();
        this.setState({ loading: false, name: null, des: null });
        success("Categorie is added successfully");
      }
    }
  };
  //Empty Field Function
  warning = msg => {
    message.warning(msg);
  };
  //Select
  onChange=(value)=> {
    let id=value[value.length - 1];
    console.log(id)
    this.setState({ proId: id });
  }

  onBlur() {
    console.log("blur");
  }

  onFocus() {
    console.log("focus");
  }

  onSearch(val) {
    console.log("search:", val);
  }
  //didmount
  componentDidMount = async () => {
    let res = await axios.get(url.CaseCader);
    console.log(res.data);
    this.setState({ casseCader: res.data });
  };
  render() {
    const { TextArea } = Input;
    return (
      <Spin
        spinning={this.state.loading}
        tip='Adding Categorie ...'
        size='large'>
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
                <h2>Add Menu</h2>
              </Divider>
              <form onSubmit={this.handleSubmit}>
                <Cascader
                  fieldNames={{
                    label: "name",
                    value: "id",
                    children: "productCategories"
                  }}
                  onChange={this.onChange}
                  options={this.state.casseCader}
                  placeholder='CHOOSE CATAGORIE'
                  changeOnSelect
                />
                <br />
                <br />
                <Input
                  placeholder='Enter categorie Name'
                  type='text'
                  value={this.state.name}
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
