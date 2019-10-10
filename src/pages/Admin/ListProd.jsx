import React, { Component } from "react";
import "../../assets/css/AdminNav.css";
import AdminNav from "../../components/navbar/AdminNav";
import AdminSideBar from "../../components/navbar/AdminSideBar";
import uid from "uuid";

//@antd
import {
  Pagination,
  Divider,
  Spin,
  Modal,
  Popconfirm,
  message,
  Input,
  Icon,
  Cascader,
  Upload,
  Button,
  Select
} from "antd";
import { success } from "../../assets/js/successMsg";
//Url
import url from "../../config/Url";
//@axios
import axios from "axios";
export default class ListProd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllSizes: [],
      AllColors: [],
      ExtractColor: [],
      ExtractSizes: [],
      Prod: [],
      loading: true,
      delId: null,
      editId: null,
      editName: null,
      editPrice: null,
      visible: false,
      confirmLoading: false,
      casseCader: [],
      proId: null,
      fileList: [],
      dis: null,
      imgCount: 0,
      selectedSizes: [],
      selectedItems: [],
      recordCount: "",
      ctgId: null
    };
  }
  handleSize = selectedSizes => {
    this.setState({ selectedSizes });
  };
  componentDidMount = async () => {
    //Case Cader
    let res = await axios.get(url.CaseCader);
    this.setState({ casseCader: res.data, loading: false });
  };

  componentWillMount = async () => {
    let res = await axios.get(url.Colors);
    this.setState({ AllColors: res.data });
    res = await axios.get(url.Sizes);
    this.setState({ AllSizes: res.data });
  };
  //@Edit Model
  Edit = async event => {
    this.setState({
      editId: event.currentTarget.id,
      editName: event.currentTarget.name,
      editPrice: event.currentTarget.value,
      visible: true
    });
  };

  handleOk = async () => {
    this.setState({
      confirmLoading: true
    });
    //Genarate UUID
    let uuid1 = uid();
    let uuid2 = uid();
    //Get Extention
    let ext1 = this.state.fileList[0].name.split(".").pop();
    let ext2 = this.state.fileList[1].name.split(".").pop();
    //Get File Types Also
    let type1 = this.state.fileList[0].type;
    let type2 = this.state.fileList[1].type;
    //Concate uuid and extention
    let name1 = uuid1.concat(".", ext1);
    let name2 = uuid2.concat(".", ext2);
    //copy into new file object
    let newFile1 = new File([this.state.fileList[0]], name1, { type: type1 });
    let newFile2 = new File([this.state.fileList[1]], name2, { type: type2 });
    //Make form object to post Data
    let data1 = new FormData();
    let data2 = new FormData();

    data1.append("File", newFile1);
    data2.append("File", newFile2);
    // let res = await axios.post(url.PicUpload, data1);
    // let res2 = await axios.post(url.PicUpload, data2);
    let dummy = [];
    let dummy2 = [];
    dummy2.push(this.state.selectedItems);
    console.log(dummy2);
    dummy.push(data1);
    dummy.push(data2);
    // dummy.push(res.data.result.files.File[0].name);
    // dummy.push(res2.data.result.files.File[0].name);
    let obj = {
      productId: this.state.editId,
      name: this.state.editName,
      description: "This is Product  Description",
      price: this.state.editPrice,
      availableQty: 10,
      productCategoryId: this.state.proId,
      imageUrls: dummy,
      colors: dummy2,
      sizes: []
    };

    this.setState({ confirmLoading: false, visible: false });
    // res = await axios.post(url.AdProd, obj);
    // if (res.status == 200) {
    //   this.setState({
    //     confirmLoading: false,
    //     editName:null,
    //     editPrice:null,
    //     selectedItems:null,
    //     visible: false,
    //   });
    //   success("Product  Edited successfully");
    //   this.componentDidMount();
    // }
  };
  handleChange = selectedItems => {
    console.log(selectedItems);
    this.setState({ selectedItems });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  changeName = event => {
    this.setState({ editName: event.target.value });
  };
  changePrice = event => {
    this.setState({ editPrice: event.target.value });
  };
  changeDes = event => {
    this.setState({ editDes: event.target.value });
  };
  //@Delete Product
  Del = event => {
    let id = event.currentTarget.id;
    this.setState({ delId: id });
  };
  onConfirm = async event => {
    this.setState({ loading: true });
    let res = await axios.delete(
      "http://localhost:3000/api/products/deleteProductById?productId=" +
        this.state.delId
    );
    if (res.status == "200") {
      message.success("Product Deleted Successfully");
      let dummy = [];
      this.selectCatg(dummy);
      this.setState({ loading: false });
    }
  };
  selectCatg = async value => {
    this.setState({ loading: true });

    if (value.length != 0) {
      let id = value[value.length - 1];
      this.setState({ proId: id });
      let Prod = await axios.get(url.PageData + id + "&startIndex=" + 0);
      this.setState({
        Prod: Prod.data.reverse(),
        recordCount: Prod.data.length
      });
      this.setState({ loading: false });
    } else {
      let Prod = await axios.get(
        url.PageData + this.state.proId + "&startIndex=" + 0
      );
      this.setState({
        Prod: Prod.data.reverse(),
        recordCount: Prod.data.length
      });
      this.setState({ loading: false });
    }

    //this.setState({ Prod: Prod.data.reverse() ,ExtractColor:Prod.data[0].Colors,ExtractSizes:Prod.data[0].Sizes});
  };
  //Pagination
  pageChange = async page => {
    //Geting Pada data
    this.setState({ loading: true });
    let res = await axios.get(
      url.PageData + this.state.proId + "&startIndex=" + page - 1
    );
    this.setState({
      Prod: res.data.reverse(),
      loading: false,
      visible: false,
      recordCount: res.data.length
    });
  };
  itemRender(current, type, originalElement) {
    if (type === "prev") {
      return (
        <a>
          <b>Previous</b>
        </a>
      );
    }
    if (type === "next") {
      return (
        <a>
          <b>Next</b>
        </a>
      );
    }
    return originalElement;
  }

  render() {
    const { TextArea } = Input;
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
        if (this.state.imgCount + 1 == 2) {
          this.setState({ dis: "d-none", imgCount: this.state.imgCount + 1 });
        } else if (this.state.imgCount < 1) {
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
            <h1> All Product</h1>

            <div class='card shadow-sm p-3 mb-5 bg-white rounded'>
              <div class='card-body'>
                <h2 class='card-title'>
                  {" "}
                  Choose Product{/*choose categorie*/}
                </h2>
                <Cascader
                  fieldNames={{
                    label: "name",
                    value: "id",
                    children: "productCategories"
                  }}
                  size='large'
                  onChange={this.selectCatg}
                  options={this.state.casseCader}
                  placeholder='Product Category'
                />
                <hr />
                <table class='table table-borderless table-hover'>
                  <thead>
                    <tr>
                      <th scope='col'>id</th>
                      <th scope='col'>Product Image</th>
                      <th scope='col'>Product Name</th>
                      <th scope='col'>Product Sizes</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.Prod.map(Prod => [
                      <tr>
                        <th>{Prod.id}</th>
                        <tr>
                          {Prod.imageUrls.map(imge => {
                            return (
                              <td>
                                <img src={imge} width='70px' height='70px' />
                              </td>
                            );
                          })}
                        </tr>
                        <td>{Prod.name}</td>
                        <tr>
                          {Prod.Sizes.map(item => {
                            return <td>{item}</td>;
                          })}
                        </tr>
                        <td>{Prod.price}</td>
                        <td key={Prod.id}>
                          <button
                            onClick={this.Edit}
                            id={Prod.id}
                            name={Prod.name}
                            value={Prod.price}
                            class='btn btn-default btn-sm '
                            style={{
                              backgroundColor: "#6EDEDE",
                              padding: "4px 17px"
                            }}>
                            Edit
                          </button>
                          &nbsp;
                          <Popconfirm
                            key={Prod.id}
                            title='Are you sure delete this task?'
                            onConfirm={this.onConfirm}
                            onCancel={this.onCancel}
                            okText='Yes'
                            cancelText='No'>
                            <button
                              onClick={this.Del}
                              id={Prod.id}
                              name={Prod.name}
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
                  title='Edit Product'
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  confirmLoading={this.state.confirmLoading}
                  onCancel={this.handleCancel}>
                  {/*images*/}
                  <Upload {...props}>
                    <div className={this.state.dis}>
                      <Button>
                        <Icon type='upload' />
                         Upload             
                      </Button>
                       
                    </div>
                  </Upload>
                  <br />

                  {/*name of Product*/}
                  <Input
                    onChange={this.changeName}
                    value={this.state.editName}
                    prefix={
                      <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                  <br />
                  <br />
                  {/*product Price*/}
                  <Input
                    onChange={this.changePrice}
                    value={this.state.editPrice}
                    prefix={
                      <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                  />
                  <br />
                  <br />
                  {/*Color*/}
                  <Select
                    style={{ width: '100%'}}
                    value={this.state.selectedItems}
                    onChange={this.handleChange}
                    onSelect={this.colorSelect}
                    placeholder='Select Color'
                    optionFilterProp='children'>
                    {this.state.AllColors.map(item => {
                      return [
                        <Select.Option
                          id={item.id}
                          key={item.id}
                          value={item.id}
                          style={{ backgroundColor: item.code }}>
                          {item.name}
                        </Select.Option>
                      ];
                    })}
                  </Select>
                  <br />
                  <br />
                  {/*Size*/}
                  <Select
                    style={{ width: "100%" }}
                    value={this.state.selectedSizes}
                    onChange={this.handleSize}
                    onSelect={this.SizeSelect}
                    placeholder='Select Size'
                    optionFilterProp='children'>
                    {this.state.AllSizes.map(item => {
                      return [
                        <Select.Option
                          id={item.id}
                          key={item.id}
                          value={item.id}>
                          {item.name}
                        </Select.Option>
                      ];
                    })}
                  </Select>
                </Modal>
              </div>
              <Divider />
              <br />
              <Pagination
                total={this.state.recordCount}
                itemRender={this.itemRender}
                onChange={this.pageChange}
                style={{ marginLeft: "5%" }}
              />
              <br />
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}
