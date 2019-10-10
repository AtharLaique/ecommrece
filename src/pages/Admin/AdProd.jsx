import React, { Component } from "react";
import "../../assets/css/AdminNav.css";
import AdminNav from "../../components/navbar/AdminNav";
import AdminSideBar from "../../components/navbar/AdminSideBar";
import uid from "uuid";
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
  Upload,
  Cascader,
  Select
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
      proId: null,
      casseCader: [],
      price: null,
      fileList: [],
      dis: null,
      imgCount: 0,
      selectedItems: [],
      selectedSizes: [],
      color: [],
      size: [],
      quantity: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDes = this.handelDes.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Handling Onchange
  //imge handling
  //menue
  selectCatg = value => {
    let id = value[value.length - 1];
    this.setState({ proId: id });
  };
  //Oncolor change
  handleChange = selectedItem => {
    let dummy=[];
    dummy.push(selectedItem)
    console.log(dummy);
    this.setState({ selectedItems:dummy });
  };
  //onsize change
  handleSize = selectedSizes => {
    this.setState({ selectedSizes });
  };
  //prodname
  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };
  //price
  handlePrice = e => {
    this.setState({ price: e.target.value });
  };
  handlQuantity = e => {
    this.setState({ quantity: e.target.value });
  };
  handelDes = e => {
    this.setState({ des: e.target.value });
  };

  //Onselect
  //image
  //menue
  //color
  colorSelect = number => {
    console.log(Option);
    //update state foe sending data
  };
  //size
  SizeSelect = (number, LabeledValue) => {
    console.log(number);
    //update state foe sending data
  };
  //name
  //price
  //Submit Fom
  handleSubmit = async event => {
    if (this.state.fileList.length < 2) {
      message.warning("Please Choose the file");
    } else if (!this.state.proId) {
      message.warning("Select Product Categorie");
    } else if (this.state.selectedItems.length == 0) {
      message.warning("Product Colors are required");
    } else if (this.state.selectedSizes.length == 0) {
      message.warning("Product sizes required");
    } else if (!this.state.price) {
      message.warning("Enter Product Price");
    } else if (!this.state.name) {
      message.warning("Enter Product Name");
    } else if (!this.state.quantity) {
      message.warning("Quantity is required ");
    } else {
      this.setState({ loading: true });
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
      let res = await axios.post(url.PicUpload, data1);
      let res2 = await axios.post(url.PicUpload, data2);
      let dummy = [];
      dummy.push(res.data.result.files.File[0].name);
      dummy.push(res2.data.result.files.File[0].name);
      console.log(dummy);
      let obj = {
        name: this.state.name,
        description: "This is Product  Description",
        availableQty: this.state.quantity,
        productCategoryId: this.state.proId,
        price: this.state.price,
        imageUrls: dummy,
        colors: this.state.selectedItems,
        sizes: this.state.selectedSizes
      };
      res = await axios.post(url.AdProd, obj);
      if (res.status == 200) {
        this.setState({
          loading: false,
          name: null,
          quantity: null,
          prodId: null,
          price: null,
          selectedItems: [],
          selectedSizes: [],
          fileList:[]
        });
        success("Product is added successfully");
      }
    }
  };

  //didmount
  componentDidMount = async () => {
    let res = await axios.get(url.CaseCader);
    this.setState({ casseCader: res.data });
    //get colors
    res = await axios.get(url.Colors);
    let dummy = [];
    res.data.map(color => {
      dummy[color.id] = color.code;
    });

    this.setState({ color: dummy });
    //get sizes
    res = await axios.get(url.Size);
    dummy = [];
    res.data.map(size => {
      dummy[size.id] = size.name;
    });
    this.setState({ size: dummy });
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
        if (this.state.imgCount + 1 == 2) {
          this.setState({ dis: "d-none", imgCount: this.state.imgCount + 1 });
        } else if (this.state.imgCount <= 1) {
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
      <Spin spinning={this.state.loading} tip='Adding Product ...' size='large'>
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
                <h2>Add Product</h2>
              </Divider>
              <form onSubmit={this.handleSubmit}>
                {/*upload file*/}
                <Upload {...props}>
                  <div className={this.state.dis}>
                    <Button>
                      <Icon type='upload' /> Upload
                    </Button>
                  </div>
                </Upload>
                <br />
               
                {/*choose categorie*/}
                <Cascader
                  fieldNames={{
                    label: "name",
                    value: "id",
                    children: "productCategories"
                  }}
                  size='default'
                  onChange={this.selectCatg}
                  options={this.state.casseCader}
                  placeholder='CHOOSE MENU'
                 
                />
                <br />
                <br />
                {/*Choose Color*/}
                <Select
                  mode='single'
                  placeholder='CHOOSE COLOR'
                  value={this.state.selectedItems}
                  onChange={this.handleChange}
                  onSelect={this.colorSelect}
                  style={{ width: "100%" }}>
                  {this.state.color.map(function(item, index) {
                    return [
                      <Select.Option
                        id={index}
                        key={index}
                        value={index}
                        style={{ backgroundColor: item }}>
                        {item}
                      </Select.Option>
                    ];
                  })}
                </Select>
                <br />
                <br />
                {/*Choose Size*/}
                <Select
                  mode='multiple'
                  placeholder='Size for Product'
                  value={this.state.selectedSizes}
                  onChange={this.handleSize}
                  onSelect={this.SizeSelect}
                  style={{ width: "100%" }}>
                  {this.state.size.map(function(item, index) {
                    return [
                      <Select.Option
                        name={index}
                        id={index}
                        key={index}
                        value={index}
                        style={{ backgroundColor: item }}>
                        {item}
                      </Select.Option>
                    ];
                  })}
                </Select>
                <br />
                <br />
                {/*Enter Product Name*/}
                <Input
                  Size='large'
                  placeholder='Enter Product Name'
                  type='name'
                  value={this.state.name}
                  onChange={this.handleChangeName}
                  prefix={
                    <Icon type='form' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
                <br />
                <br />
                {/*Price*/}
                <Input
                  Size='large'
                  placeholder='Enter Price'
                  type='number'
                  value={this.state.price}
                  onChange={this.handlePrice}
                  prefix={
                    <Icon type='dollar' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
                <br />
                <br />
                {/*Quantity*/}
                <Input
                  Size='large'
                  placeholder='Enter Quantity'
                  type='number'
                  value={this.state.quantity}
                  onChange={this.handlQuantity}
                  prefix={
                    <Icon type='dollar' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
                <br />
                <br />
                <Button
                  size='large'
                  type='primary'
                  value='Submit'
                  onClick={this.handleSubmit}>
                  Add Product
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </Spin>
    );
  }
}
