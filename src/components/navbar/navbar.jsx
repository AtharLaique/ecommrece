import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

import url from "../../config/Url";
import axios from "axios";

//@antd desingh
import { Badge, Icon, Affix, Modal } from "antd";
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

 
 
  render() {
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
                    <Link to='/men' className='nav-link'>
                      MEN'S
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/women' className='nav-link'>
                      WOMEN
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/boys' className='nav-link'>
                      BOYS
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/girls' className='nav-link'>
                      Girls
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/baba' className='nav-link'>
                      BABA
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to='/fragrence' className='nav-link'>
                      BABY
                    </Link>
                  </Nav>
                </Nav>
                <Nav>
                  <Nav.Link href='#deets'>
                    <Icon type='flag' />
                  </Nav.Link>
                  <Nav>
                    <Link to='/login' className='nav-link'>
                      <Icon type='login' />
                    </Link>
                  </Nav>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Affix>
        
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
