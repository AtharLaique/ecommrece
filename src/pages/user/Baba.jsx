import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
//@url
import url from "../../config/Url";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { connect } from "react-redux";
import { Data } from "../../Redux/Actions/LoadDataAction";
import "../../assets/css/ProductCard.css";
//@Ant Design
import "antd/dist/antd.css";
import {
  Tooltip,
  Icon,
  Button,
  Card,
  Breadcrumb,
  Drawer,
  Collapse,
  Pagination,
  Menu,
  Divider,
  Spin
} from "antd";
import { Link } from "react-router-dom";

class Baba extends Component {
  //@state
  constructor(props) {
    super(props);
    this.state = {
      pageId: "",
      CtgId: "",
      sideMenu: [],
      Content: [],
      loading: false,
      visible: false,
      recordCount: 0
    };
  }

  
  componentDidMount = async () => {
    //Getting Page Id
    let res = await axios.get(url.PageId + "BABA");
    console.log(res.data)
    this.setState({ pageId: res.data[0].id, CtgId: res.data[0].id });
    //Geting Pada data
    this.setState({ loading: true });
    res = await axios.get(
      url.PageData + this.state.pageId + "&startIndex=" + 0
    );
    this.setState({ Content: res.data, recordCount: res.data.length });
    //Getting Side bar content from DB
    res = await axios.get(
      url.SideBar + this.state.pageId + "/productCategories"
    );
    this.setState({ sideMenu: res.data });
    this.setState({ loading: false });
  };
  //LoadData for side Menue
  LoadData = async e => {
    let id = e.target.id;
    this.setState({ loading: true });
    //Geting Pada data
    let res = await axios.get(url.PageData + id + "&startIndex=" + 0);
    this.setState({
      Content: res.data,
      loading: false,
      visible: false,
      recordCount: res.data.length,
      CtgId: id
    });
  };
  //Pagination
  pageChange = async page => {
    //Geting Pada data
    this.setState({ loading: true });
    let res = await axios.get(
      url.PageData + this.state.CtgId + "&startIndex=" + page - 1
    );
    this.setState({
      Content: res.data,
      loading: false,
      visible: false,
      recordCount: res.data.length
    });
    console.log(page);
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
  //Add side Drwarer
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
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
                <h1>Boys</h1>
              </div>
              <img
                src={require("../../assets/img/ks-01.jpg")}
                width='98%'
                style={{ marginLeft: "1%", backgroundColor: "#FFFFFF" }}
              />
            </Col>
            {/*3 column in lg and md & 12* hide on small*/}
            <Col md={3} lg={3} style={{ backgroundColor: "#FFFFFF" }}>
              <div
                className='d-none d-lg-block d-md-block '
                style={{
                  marginLeft: "10%",
                  marginTop: "15%",
                  overflowY: "scroll"
                }}>
                {this.state.sideMenu.map(menu => {
                  return (
                    <div>
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
                    </div>
                  );
                })}
              </div>
            </Col>
            {/*9 column in lg and md */}
            <Col md={9} lg={9} style={{ backgroundColor: "#FFFFFF" }}>
              <div className='d-lg-none d-md-none d-sm-block '>
                <br />
                <br />
                <Button
                  onClick={this.showDrawer}
                  style={{
                    display: "block",
                    width: "97%",
                    border: "2px solid black",
                    backgroundColor: "#ffffff",
                    color: "black",
                    fontSize: "22px",
                    cursor: "pointer",
                    textAlign: "center",
                    marginLeft: "1%"
                  }}>
                  SHOPING OPTIONS
                </Button>
              </div>
              <br />
              <div className='d-none d-lg-block d-md-block'></div>
              <Row>
                {this.state.Content.map(imge => [
                  <Col lg={4} md={6} xs={12}>
                    <Card bordered={false} className='mt-n1'>
                      <div class='c2 center'>
                        <LazyLoadImage
                          effect='blur'
                          width='100%'
                          class='normal-image'
                          src={imge.imageUrls[0]}
                          style={{
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                          }}
                        />

                        <Link
                          to={{
                            pathname: "/prod/" + imge.id,
                            state: {
                              imgUrl: imge.imageUrls,
                              sizes: imge.Sizes,
                              colors: imge.Colors
                            }
                          }}>
                          <img
                            src={imge.imageUrls[1]}
                            class='hover-image'
                            width='100%'
                          />
                        </Link>
                      </div>
                      <br />
                      <h4>
                        Price: {imge.price}
                        <Tooltip title=' Add Into Your Wish List'>
                          <Icon
                            type='heart'
                            theme='twoTone'
                            twoToneColor='#eb2f96'
                            style={{ marginLeft: "35%" }}
                          />
                        </Tooltip>
                      </h4>
                      <Link
                        to={{
                          pathname: "/prod/" + imge.id,
                          state: {
                            imgUrl: imge.imageUrls,
                            sizes: imge.Sizes,
                            colors: imge.Colors
                          }
                        }}>
                        <button
                          style={{
                            display: "block",
                            width: "100%",
                            border: "2px solid black",
                            backgroundColor: "#ffffff",
                            color: "black",
                            fontSize: "22px",
                            cursor: "pointer",
                            textAlign: "center"
                          }}>
                          Add To Cart
                        </button>
                      </Link>
                    </Card>
                  </Col>
                ])}
              </Row>
              <br />
              <Pagination
                total={this.state.recordCount}
                itemRender={this.itemRender}
                onChange={this.pageChange}
                style={{ marginLeft: "5%" }}
              />
              <br />
            </Col>
          </Row>
        </div>
        <Drawer
          title='Basic Drawer'
          placement='left'
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          getContainer={false}
          style={{ position: "absolute" }}>
          <div
            style={{
              overflowY: "scroll"
            }}>
            {this.state.sideMenu.map(menu => {
              return (
                <div>
                  <div>
                    <Link to='#' style={{ color: "#222222" }}>
                      <Divider orientation='left' style={{ color: "#ff8084" }}>
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
                </div>
              );
            })}
          </div>
        </Drawer>
      </Spin>
    );
  }
}
const mapStateToProps = state => ({
  data: state.data
});
export default connect(
  mapStateToProps,
  { Data }
)(Baba);
