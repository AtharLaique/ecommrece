//@ Exporting Modules
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./pages.css";
import { withRouter } from "react-router-dom";
class Landing extends React.Component {
  //@ state
  change = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand='lg'
          bg='dark'
          variant='dark'
          fixed='top'>
          <Navbar.Brand> Welcome{this.props.user.name}</Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </Nav>
            <Nav className='nav-link'>
              <Link to='/login' className='nav-link'>
                login
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login
});

export default connect(
  mapStateToProps,
  null
)(withRouter(Landing));
