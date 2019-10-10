import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
//@url
import url from "../config/Url";
import axios from "axios";

import "../assets/css/ProductCard.css";
//@Ant Design
import "antd/dist/antd.css";
import {
  Tooltip,
  Icon,
  Button,
  Card,
  Breadcrumb,
  Pagination,
  Spin,
  Divider
} from "antd";

export default class BG extends Component {
  //@state
  constructor(props) {
    super(props);

    this.state = {
      pageId: null,
      sideMenu: [],
      Content: [],
      loading: false
    };
  }

  //@Pagination
  onChange = pageNumber => {
    console.log("Page: ", pageNumber);
  };
  componentDidMount = async () => {
    //Getting Page Id
    let res = await axios.get(url.PageId + "women");
    this.setState({ pageId: res.data[0].id });
    //Geting Pada data
    this.setState({ loading: true });
    res = await axios.get(url.PageData + this.state.pageId);
    console.log(res.data);
    this.setState({ Content: res.data });
    //Getting Side bar content from DB
    res = await axios.get(
      url.SideBar + this.state.pageId + "/productCategories"
    );
    this.setState({ sideMenu: res.data });
    //Getting Content

    this.setState({ loading: false });
  };
  //LoadData for side Menue
  LoadData = async e => {
    this.setState({ loading: true });
    //Geting Pada data
    this.setState({ loading: true });
    let res = await axios.get(url.PageData + e.target.id);
    this.setState({ Content: res.data, loading: false });
  };
  render() {
    return (
      <Spin spinning={this.state.loading} tip='Loading Data ...' size='large'>
        <div>
          <Row>
            {/*12 column in all screen*/}
            <Col xs={12} md={12} lg={12}>
              <div
                className='text-center'
                style={{ backgroundColor: "#FFFFFF" }}>
                <br />
                <h1>KAMEEZ SHALWAR</h1>
              </div>
              <img
                src={require("../assets/img/ks-01.jpg")}
                width='98%'
                style={{ marginLeft: "1%", backgroundColor: "#FFFFFF" }}
              />
            </Col>
            {/*3 column in lg and md & 12* hide on small*/}
            <Col md={3} lg={3} style={{ backgroundColor: "#FFFFFF" }}>
              <div
                className='d-none d-lg-block d-md-block'
                style={{ marginLeft: "10%" }}>
                {this.state.sideMenu.map(menu => {
                  return (
                    <div>
                      <Link to='#' style={{ color: "#222222" }}>
                        <Divider
                          orientation='left'
                          style={{ color: "#ff8084" }}>
                          <h4
                            id={menu.id}
                            name={menu.id}
                            value={menu.id}
                            onClick={this.LoadData}>
                            {menu.name}
                          </h4>
                        </Divider>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </Col>
            {/*9 column in lg and md */}
            <Col md={9} lg={9} style={{ backgroundColor: "#FFFFFF" }}>
              <div className='d-lg-none d-md-none d-sm-block '>
                <Button
                  style={{
                    width: "40%",
                    marginRight: "18%",
                    marginLeft: "1%"
                  }}>
                  SHOP BY
                </Button>
                <Button style={{ width: "40%", marginRight: "1%" }}>
                  SORT BY
                </Button>
              </div>
              <br />
              <div className='d-none d-lg-block d-md-block'>
                <Breadcrumb>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <a href=''>Application List</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>An Application</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <Row>
                {this.state.Content.map(imge => [
                  <Col lg={4} md={6} xs={12}>
                    <Card bordered={false} className='mt-n1'>
                      <div class='c2 center'>
                        <LazyLoadImage
                          effect='blur'
                          width='105%'
                          class='normal-image'
                          src={imge.imageUrls[0]}
                        />

                        <Link
                          to={{
                            pathname: "/boysgirl/" + imge.id,
                            state: { imgUrl: imge.imageUrls }
                          }}>
                          <img
                            src={imge.imageUrls[1]}
                            class='hover-image'
                            width='105%'
                            style={{
                              boxShadow:
                                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                            }}
                          />
                        </Link>
                      </div>
                      <h2>
                        Price:{imge.price}
                        <Tooltip title=' Add Into Your Wish List'>
                          <Icon
                            type='heart'
                            theme='twoTone'
                            twoToneColor='#eb2f96'
                            style={{ marginLeft: "40%" }}
                          />
                        </Tooltip>
                      </h2>
                    </Card>
                  </Col>
                ])}
              </Row>
              <br />
              <br />
              <Pagination total={50} onChange={this.onChange} showSizeChanger />
            </Col>
          </Row>
        </div>
      </Spin>
    );
  }
}
