import React, { Component } from "react";
import "../../assets/css/AdminNav.css";
import AdminNav from "../../components/navbar/AdminNav";
import AdminSideBar from "../../components/navbar/AdminSideBar";

//@antd
import {
  Pagination,
  Divider,
  Spin,
  Modal,
  Popconfirm,
  message,
  Input,
  Icon
} from "antd";
//Url
import url from "../../config/Url";
//@axios
import axios from "axios";
export default class ListPages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      loading: true,
      delId: null,
      editId: null,
      editName: null,
      editDes: null,
      visible: false,
      confirmLoading: false
    };
  }
  componentDidMount = async () => {
    let pages = await axios.get(url.MainPages);
    this.setState({ pages: pages.data.reverse() });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 0.3 * 1000);
  };
  //@Edit Model
  Edit = event => {
    this.setState({
      editId: event.currentTarget.id,
      editName: event.currentTarget.name,
      editDes: event.currentTarget.value,
      visible: true
    });
  };

  handleOk = async() => {
    this.setState({
      confirmLoading: true
    });
    let data = {
      name: this.state.editName,
      description: this.state.editDes,
      productCategoryId: 0
    };
    let res = await axios.put(url.EditMainPage + this.state.editId, data);
    if(res.status=='200')
    {
      this.setState({
        confirmLoading:false,
        visible:false
      })
      this.componentDidMount();
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  changeName =(event)=>{
    this.setState({editName:event.target.value})
  }
  changeDes =(event)=>{
    this.setState({editDes:event.target.value})
  }
  //@Delete Product
  Del = event => {
    let id = event.currentTarget.id;
    this.setState({ delId: id });
  };
  onConfirm = async (event) => {
    let res=await axios.delete(url.DelMainPage+this.state.delId);
    if(res.status=='200')
    {
      message.success("Product Deleted Successfully");
      this.componentDidMount();
    }
  };


  render() {
    const { TextArea } = Input;
    return (
      <Spin spinning={this.state.loading} tip='Loading data ...' size='large'>
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
            <h1> All Pages</h1>
            <div class='card shadow-sm p-3 mb-5 bg-white rounded'>
              <div class='card-body'>
                <h2 class='card-title'>Pages</h2>
                <hr />
                <table class='table table-borderless table-hover'>
                  <thead>
                    <tr>
                      <th scope='col'>id</th>
                      <th scope='col'>Page Name</th>
                      <th scope='col'>Desrciption</th>
                      <th scope='col'>Create_On</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.pages.map(page => [
                      <tr>
                        <th>{page.id}</th>
                        <td>{page.name}</td>
                        <td>{page.description}</td>
                        <td>{page.creationDate}</td>
                        <td key={page.id}>
                          <button
                            onClick={this.Edit}
                            id={page.id}
                            name={page.name}
                            type={page.description}
                            value={page.description}
                            class='btn btn-default btn-sm '
                            style={{
                              backgroundColor: "#6EDEDE",
                              padding: "4px 17px"
                            }}>
                            Edit
                          </button>
                          &nbsp;
                          <Popconfirm
                            key={page.id}
                            title='Are you sure delete this task?'
                            onConfirm={this.onConfirm}
                            onCancel={this.onCancel}
                            okText='Yes'
                            cancelText='No'>
                            <button
                              onClick={this.Del}
                              id={page.id}
                              name={page.name}
                              type='button'
                              class='btn btn-default btn-sm'
                              style={{
                                backgroundColor: "#FF8084"
                              }}>
                              <span> Delete</span>
                            </button>
                          </Popconfirm>
                        </td>
                      </tr>
                    ])}
                  </tbody>
                </table>
                <Modal
                  title='Title'
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  confirmLoading={this.state.confirmLoading}
                  onCancel={this.handleCancel}>
                  <Input
                    onChange={this.changeName}
                    value={this.state.editName}
                    prefix={
                      <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                  <br /> <br />
                  <TextArea
                    value={this.state.editDes}
                    onChange={this.changeDes}
                    placeholder='Controlled autosize'
                    autosize={{ minRows: 3, maxRows: 5 }}
                  />
                </Modal>
              </div>
              <Divider />
              <Pagination
                size='small'
                total={50}
                showSizeChanger
                showQuickJumper
                style={{ marginLeft: "3%" }}
              />
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}
