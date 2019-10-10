import React, { Component } from "react";
import ReactImageZoom from "react-image-zoom";
import Slick from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import ContentZoom from "react-content-zoom";
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";
//@import connenect and cart
import { connect } from "react-redux";
//@ ant desing
import {
  Tag,
  Divider,
  Button,
  Icon,
  Select,
  message,
  notification
} from "antd";

import "antd/dist/antd.css";

import url from "../config/Url";
import Axios from "axios";
import { cart } from "../Redux/Actions/cartAction";

class Sales extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      InStock: "",
      price: null,
      Sizes: [],
      Colors: [],
      images: [],
      imge: null,
      proData: {},
      ProdCount: 0,
      selectSize: null,
      selectColor: null,
      visible: false
    };
  }
  //Add to cart
  adToCart = () => {
    if (localStorage.getItem("LOG") == "true") {
      if (this.state.ProdCount == 0) {
        message.warning("Quntity of product is required");
      } else if (!this.state.selectSize) {
        message.warning("Size of product is required");
      } else if (!this.state.selectColor) {
        message.warning("color of product is required");
      } else {
      
        let data = {
          userId: localStorage.getItem('id'),
          prodId: this.props.match.params.id,
          qty: this.state.ProdCount,
          size: this.state.selectSize,
          color: this.state.selectColor,
          imageUrl: this.state.images[0]
        };

        this.props.cart(data);
      }
    } else {
      this.openNotification();
    }
    //for login
  };
  UpdateCount = () => {};
  //Product Count
  rmProd = () => {
    if (this.state.ProdCount == 0) {
    } else {
      this.setState({ ProdCount: this.state.ProdCount - 1 });
    }
  };
  adProd = () => {
    this.setState({ ProdCount: this.state.ProdCount + 1 });
  };
  //Product Size
  selectSize = size => {
    console.log(size);
    this.setState({ selectSize: size });
  };
  //Product Color
  selectColor = async color => {
    //  let res=await Axios.get(url.ProdByColor+this.props.match.params.id+"&colorId="+color)
    this.setState({ selectColor: color });
  };
  componentDidMount = async () => {
    let res = await Axios.get(url.ProdById + this.props.match.params.id);
    if (res.data.Qty != 0) {
      this.setState({
        InStock: "In Stock",
        Colors: res.data.Colors,
        Sizes: res.data.Sizes,
        price: res.data.price,
        images: res.data.imageUrls,
        imge: res.data.imageUrls[0]
      });
    } else {
      this.setState({
        InStock: "Not In Stock",
        Colors: res.data.Colors,
        Sizes: res.data.Sizes,
        price: res.data.price,
        images: res.data.imageUrls,
        imge: res.data.imageUrls[0]
      });
    }
    this.setState({
      flag: true
    });
    console.log(res.data);
  };
  change = e => {
    if (e.target.id == "0") {
      this.setState({ imge: this.state.images[0] });
    } else if (e.target.id == "1") {
      this.setState({ imge: this.state.images[1] });
    }
  };
  //Login
  openNotification = () => {
    const args = {
      message: <h5>You Need To Login First</h5>,
      duration: 3,
    };
    notification.open(args);
  };
  render() {
    const im = {
      width: 320,
      height: 450,
      scale: 1,
      zoomWidth: 500,
      img: this.state.imge
    };
    const { Option } = Select;
    const props = this.state.proData;
    return (
      <div style={{ backgroundColor: "#FFFFFF" }}>
        <br />
        <br />
        <br />

        <div className='d-none d-lg-block' style={{ marginLeft: "15%" }}>
          <h1>Product Detail</h1>
          <div className='row '>
            <div className='col-lg-3 col-md-3'>
              {/*In stock*/}
              <Divider>
                <Tag color='lime'>
                  <h4 lassName='font-weight-bold'>{this.state.InStock}</h4>
                </Tag>
              </Divider>
              {/*Price*/}
              <Divider>
                <Tag color='lime'>
                  <h4 className='font-weight-bold'>
                    PKR &nbsp;{this.state.price}
                  </h4>
                </Tag>
              </Divider>
              {/*Quantity*/}
              <Divider>
                <Button.Group>
                  <Button onClick={this.rmProd}>
                    <Icon type='minus' />
                  </Button>
                  <Button>{this.state.ProdCount}</Button>
                  <Button onClick={this.adProd}>
                    <Icon type='plus' />
                  </Button>
                </Button.Group>
              </Divider>
              {/*Sizes*/}
              <Divider>Available Sizes</Divider>
              <Select
                style={{ width: 250 }}
                placeholder='CHOOSE SIZE'
                onSelect={this.selectSize}
                optionFilterProp='children'>
                {this.state.Sizes.map(size => {
                  return <Option value={size.Size}>{size.Size}</Option>;
                })}
              </Select>
              {/*Colors*/}
              <Divider>Available Colors</Divider>
              <Select
                style={{ width: 250 }}
                onSelect={this.selectColor}
                placeholder='CHOOSE COLOR'
                optionFilterProp='children'>
                {this.state.Colors.map(color => {
                  return (
                    <Option
                      value={color.Code}
                      style={{ backgroundColor: color.Code }}>
                      {color.Code}
                    </Option>
                  );
                })}
              </Select>
              {/*Ad to cart*/}
              <Divider />
              <button
                className='btn btn-dark btn-block py-2'
                onClick={this.adToCart}>
                <b> ADD TO BAG</b>
              </button>
              <Divider />
              <p className='font-weight-bold'>More information</p>
              <div className='row'>
                <div className='col-4'>
                  <b>Size</b>
                </div>
                <div className='col-6'>9-10 Years</div>
              </div>
              <div className='row'>
                <div className='col-4'>
                  <b>Color</b>
                </div>
                <div className='col-6'>Multicolor</div>
              </div>
            </div>
            {/*image*/}
            {this.state.flag ? (
              <div className='col-lg-4 col-md-4'>
                <ReactImageZoom {...im} />
                <div className='row justify-content-center '>
                  <div className='col-lg-4 col-md-4 py-3'>
                    <img
                      id='0'
                      onClick={this.change}
                      src={this.state.images[0]}
                      alt=''
                      className='img-fluid'
                    />
                  </div>
                  <div className='col-lg-4 col-md-4  py-3'>
                    <img
                      id='1'
                      onClick={this.change}
                      src={this.state.images[1]}
                      alt=''
                      className='img-fluid'
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/*md*/}
        <div className='container d-lg-none d-sm-none d-md-block '>
          <h1 className='text-center'>Product Detail</h1>
          <div className='row justify-content-center'>
            <div className='col-md-6'>
              {this.state.flag ? (
                <Slick dots={true}>
                  <InnerImageZoom
                    src={this.state.images[0]}
                    fullscreenOnMobile={false}
                  />
                  <InnerImageZoom
                    src={this.state.images[1]}
                    fullscreenOnMobile={false}
                  />
                </Slick>
              ) : null}
              <br />
              <br />
            </div>

            <div className=' col-md-4'>
              {/*In stock*/}

              <Divider>
                <Tag color='lime'>
                  <h4 lassName='font-weight-bold'>{this.state.InStock}</h4>
                </Tag>
              </Divider>
              {/*Price*/}
              <Divider>
                <Tag color='lime'>
                  <h4 className='font-weight-bold'>
                    PKR &nbsp;{this.state.price}
                  </h4>
                </Tag>
              </Divider>
              {/*Quantity*/}
              <Divider>
                <Button.Group>
                  <Button onClick={this.rmProd}>
                    <Icon type='minus' />
                  </Button>
                  <Button>{this.state.ProdCount}</Button>
                  <Button onClick={this.adProd}>
                    <Icon type='plus' />
                  </Button>
                </Button.Group>
              </Divider>
              {/*Sizes*/}
              <Divider>Available Sizes</Divider>
              <Select
                style={{ width: 250 }}
                placeholder='CHOOSE SIZE'
                onSelect={this.selectSize}
                optionFilterProp='children'>
                {this.state.Sizes.map(size => {
                  return <Option value={size.Size}>{size.Size}</Option>;
                })}
              </Select>
              {/*Colors*/}
              <Divider>Available Colors</Divider>
              <Select
                style={{ width: 250 }}
                onSelect={this.selectColor}
                placeholder='CHOOSE COLOR'
                optionFilterProp='children'>
                {this.state.Colors.map(color => {
                  return (
                    <Option
                      value={color.Code}
                      style={{ backgroundColor: color.Code }}>
                      {color.Code}
                    </Option>
                  );
                })}
              </Select>
              {/*Ad to cart*/}
              <Divider />
              <button
                className='btn btn-dark btn-block py-2'
                onClick={this.adToCart}>
                <b> ADD TO BAG</b>
              </button>
              <Divider />
              <p className='font-weight-bold'>More information</p>
              <div className='row'>
                <div className='col-4'>
                  <b>Size</b>
                </div>
                <div className='col-6'>9-10 Years</div>
              </div>
              <div className='row'>
                <div className='col-4'>
                  <b>Color</b>
                </div>
                <div className='col-6'>Multicolor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  count: state.cart.count
});
export default connect(
  mapStateToProps,
  { cart }
)(Sales);
