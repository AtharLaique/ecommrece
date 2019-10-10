import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import url from "../../config/Url";
import axios from "axios";

//@antd desingh
import { Badge, Icon, Affix, Modal, Avatar, Popover } from "antd";
import "antd/dist/antd.css";
//@import connenect and cart
import { connect } from "react-redux";
import { CartCount } from "../../Redux/Actions/CartCountAction";

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      top: 0,
      visible: false
    };
  }

  componentDidMount = async () => {
    //Get cart Count
    this.props.CartCount();
    //Prepare cart

    this.setState({ isLogin: localStorage.getItem("LOG") });
  };

  //Logout
  showModal = () => {
    
    this.setState({
      visible: true
    });
  };

  hideModal = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    const content = (
      <React.Fragment>
        <Nav>
          <Link to='#' className='nav-link'>
            <h6> Dashboard</h6>
          </Link>
        </Nav>
        <Nav>
          <Link to='#' className='nav-link' onClick={this.showModal}>
            <h6> Logout</h6>
          </Link>
        </Nav>
      </React.Fragment>
    );
    const { confirm } = Modal;
    return (
      <React.Fragment>
        <Affix offsetTop={this.state.top}>
          <Navbar
            className='shadow'
            collapseOnSelect
            expand='lg'
            variant='light'
            style={{ backgroundColor: "#ffffff", marginBottom: "0px" }}>
            <Container>
              <Navbar.Brand>
                <Link to='/'>
                  <img
                    src={require("../../assets/img/logo.png")}
                    width='110px'
                    height='60px'
                  />
                </Link>
              </Navbar.Brand>

              <Navbar.Toggle aria-controls='responsive-navbar-nav' />
              <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav className='mr-auto'>
                  <Nav>
                    <Link to='/user/men' className='nav-link'>
                      MEN'S
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/user/women' className='nav-link'>
                      WOMEN
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/user/boys' className='nav-link'>
                      BOYS
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/user/girls' className='nav-link'>
                      Girls
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/user/baba' className='nav-link'>
                      BABA
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/user/fragrence' className='nav-link'>
                      BABY
                    </Link>
                  </Nav>
                </Nav>
                <Nav>
                  <Nav.Link href='#deets'>
                    <Icon type='flag' />
                  </Nav.Link>
                  <Nav>
                    <Link to='/yourcart' className='nav-link'>
                      <Badge
                        count={this.props.count}
                        style={{ backgroundColor: "#ffffff" }}>
                        <Icon type='shopping-cart' style={{ size: "300" }} />
                      </Badge>
                    </Link>
                  </Nav>
                  <Nav>
                    <Popover content={content}>
                      <Avatar
                        icon='user'
                      />
                    </Popover>
                  </Nav>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Affix>
        {this.state.visible ? (
          <Modal>
            {confirm({
              title: "Are you sure you want to logout",
              onOk() {
                localStorage.setItem("id", null);
                localStorage.setItem("ROLE", null);
                localStorage.setItem("LOG", null);
                window.location.replace("/men");
              },
              cancelText: "Cancle"
            })}
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  count: state.cart.count
});
export default connect(
  mapStateToProps,
  { CartCount }
)(navbar);
