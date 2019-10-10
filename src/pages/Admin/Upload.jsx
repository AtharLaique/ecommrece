import React, { Component } from "react";
import "../../assets/css/AdminNav.css";
import AdminNav from "../../components/navbar/AdminNav";
import AdminSideBar from "../../components/navbar/AdminSideBar";
//@ant desing
import "antd/dist/antd.css";
import { Upload, Button, Icon } from "antd";
//@ Axios
import axios from "axios";
//Url
import url from "../../config/Url";
import { async } from "q";
export default class AdMenu extends Component {
  state = {
    fileList: [],
    dis: null,
    imgCount: 0,
    selectedFile: null,
    img: []
  };

  onChangeHandler = event => {
    console.log("on change is called");
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  onClickHandler = async () => {
    console.log(this.state.selectedFile);

    let data = new FormData();

    data.append("File", this.state.selectedFile);
    console.log(data)

    // let res = await axios.post(
    //   "http://localhost:3000/api/attachments/images/upload",
    //   data
    // );

   
  };

  handleUpload = async () => {
    const { fileList } = this.state;

    const formData = new FormData();

    formData.file = fileList[0];

    console.log(fileList[0]);

    let res = await axios.post(
      "http://192.168.0.113:3000/api/attachments/images/upload",

      fileList[0]
    );

    console.log(res);
  };

  componentDidMount = async () => {
    console.log("Its");

    let res = await axios.get(
      "http://localhost:3000/api/attachments/images/files"
    );

    this.setState({ img: res.data });

    console.log(res.data);
  };

  render() {
    const props = {
      onRemove: file => {
        this.setState({ imgCount: this.state.imgCount - 1 });

        this.setState({ dis: null });

        this.setState(state => {
          const index = state.fileList.indexOf(file);

          const newFileList = state.fileList.slice();

          newFileList.splice(index, 1);

          return {
            fileList: newFileList
          };
        });
      },

      beforeUpload: file => {
        if (this.state.imgCount + 1 == 1) {
          this.setState({ dis: "hidden", imgCount: this.state.imgCount + 1 });
        } else if (this.state.imgCount <= 0) {
          this.setState({ imgCount: this.state.imgCount + 1 });
        }

        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));

        return false;
      },

      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

      listType: "picture",

      defaultFileList: null
    };

    return (
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

          <Upload {...props}>
            <div className={this.state.dis}>
              <Button>
                <Icon type='upload' /> Upload
              </Button>
            </div>
          </Upload>

          <Button type='primary' onClick={this.handleUpload}>
            upload
          </Button>

          <input type='file' name='file' onChange={this.onChangeHandler} />

          <button
            type='button'
            class='btn btn-success '
            onClick={this.onClickHandler}>
            Upload
          </button>

          <br />

          <br />

          <button type='button' class='btn btn-success ' onClick={this.show}>
            show
          </button>

          {this.state.img.map(im => [
            <img
              src={require("../../assets/img/images/" + im.name)}
              width='200px'
              height='200px'
            />
          ])}
        </div>
      </div>
    );
  }
}
