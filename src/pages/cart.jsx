import React, { Component } from "react";
import url from "../config/Url";
import Axios from "axios";
import { Form, Icon, Input, Button, Card, Popconfirm, Tooltip } from "antd";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { CartCount } from "../Redux/Actions/CartCountAction";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      delId: null,
      delSize:null,
      delColor:null
    };
  }

  componentDidMount = async () => {
    let res = await Axios.get(url.MyCart +localStorage.getItem('id'));
    console.log(res.data)
    if (res.data.length == 0) {
    } else {
      this.setState({ cart: res.data[0].productShoppingCarts });
    }
   
  };
  clearAll = async () => {
    let res = await Axios.delete(url.clearCart, { userId:localStorage.getItem('id') });
    this.props.CartCount();
    this.componentDidMount();
  };
  Del = event => {
    var res =event.currentTarget.id.split('.');
    this.setState({ delId:res[0],delSize:res[1],delColor:res[2] });
  };
  onConfirm=async()=>{
   
    let data={
      userId:localStorage.getItem('id'),
      productId:this.state.delId,
      color:this.state.delColor,
      size:this.state.delSize
      }
    let res=await Axios.post(url.DelCartItem,data)
   if(res.status=='200')
   {
    this.props.CartCount();
    this.componentDidMount();
   }
    
  
  }
  render() {
   
    return (
      <div className='m-5 flex'>
        <Container>
          <Card title='Your Cart' style={{ width: "90%" }}>
            <table class='table '>
              <thead class='thead-dark'>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.cart.map(itemInfo => [
                  <tr>
                    <th scope='row'>
                      <img
                        src={itemInfo.imageUrl}
                        width='100px'
                        height='100px'
                      />
                    </th>
                    <td>{itemInfo.product.name}</td>
                    <td>{itemInfo.qty}</td>
                    <td>{itemInfo.size}</td>
                    <td>{itemInfo.product.price}</td>
                    <td>
                      <Popconfirm
                     onConfirm={this.onConfirm}
                        title='Are you sure？'
                        okText='Yes'
                        cancelText='No'>
                        <Tooltip title='Delete Item from Your cart'>
                          <h3>
                            <Icon
                              type='delete'
                              id={itemInfo.productId+"."+itemInfo.size+"."+itemInfo.color}
                              style={{ color: "red" }}
                              onClick={this.Del}
                            />
                          </h3>
                        </Tooltip>
                      </Popconfirm>
                    </td>
                  </tr>
                ])}
              </tbody>
            </table>
            <br />
            <br />
            <Link to='/order'>
              <Button type='danger'>Check Out</Button>
            </Link>
            &nbsp;
            {/* <Button type='danger' onClick={this.clearAll}>
              Clear Cart
            </Button> */}
          </Card>
        </Container>
      </div>
    );
  }
}

export default connect(
  null,
  { CartCount }
)(Cart);
