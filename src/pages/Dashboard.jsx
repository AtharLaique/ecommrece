import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../assets/css/AdminNav.css";
import "../assets/css/Dashboard.css";
import AdminNav from "../components/navbar/AdminNav";
import AdminSideBar from "../components/navbar/AdminSideBar";
import CountUp from "react-countup";
//@url
import url from '../config/Url';
import { async } from "q";
import Axios from "axios";
export default class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
       totalEarn:"",
       totalProd:""
    }
  }
  componentDidMount= async()=>{
    let tEarn=await Axios.get(url.TotalEarn);
    let tProd=await Axios.get(url.TotalProd)
    this.setState({totalEarn:tEarn.data.totalEarning,totalProd:tProd.data.count})
   

  }
  render() {
    return (
      <div>
        <div className='wrapper  '>
          <AdminNav />
          <div id='content'>
            <nav className='navbar navbar-expand-lg navbar-light bg-light  '>
              <div className='container-fluid'>
                <button type='button' id='sidebarCollapse' className='navbar-btn'>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <button
                  className='btn btn-dark d-inline-block d-lg-none ml-auto'
                  type='button'
                  data-toggle='collapse'
                  data-target='#navbarSupportedContent'
                  aria-controls='navbarSupportedContent'
                  aria-expanded='false'
                  aria-label='Toggle navigation'>
                  <i className='fas fa-align-justify'></i>
                </button>
                <AdminSideBar />
              </div>
            </nav>
            {/*Here Is content*/}
            <Container>
              <Row>
                <Col xs={12} md={6} lg={6}>
                  <h1>Dashboard</h1>
                  <p>E-Comress Product Admin Panel</p>
                </Col>
                <Col xs={0} md={6} lg={6}></Col>
              </Row>
              <Row>
                <Col xs={12} md={6} lg={6}>
                  <div
                    className='card  shadow p-3 mb-5 '
                    style={{
                      backgroundColor: "#FFBC58",
                      borderRadius: "30px"
                    }}>
                    <div className='card-body'>
                      <h2 className='card-title'>
                        <i className='fa fa-suitcase' aria-hidden='true'></i>{" "}
                        &nbsp;Total Earnings
                      </h2>
                      <h2>
                        <CountUp
                          start={-85.039}
                          end={this.state.totalEarn}
                          duration={2.75}
                          separator=' '
                          decimals={4}
                          decimal=','
                          prefix='$  '
                          suffix=''
                        />
                      </h2>
                      <p className='card-text'>
                        It's a broader card with text below as a natural lead-in
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <div
                    className='card  shadow p-3 mb-5 '
                    style={{
                      backgroundColor: "#6EDEDE",
                      borderRadius: "30px"
                    }}>
                    <div className='card-body'>
                      <h2 className='card-title'>
                        <i className='fa fa-cube' aria-hidden='true'></i>{" "}
                        &nbsp;Products
                      </h2>
                      <h2>
                        <CountUp
                          start={-875.039}
                          end={this.state.totalProd}
                          duration={2.75}
                          separator=' '
                          decimals={4}
                          decimal=','
                          prefix='Product   '
                          suffix=''
                        />
                      </h2>
                      <p className='card-text'>
                        It's a broader card with text below as a natural lead-in
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <div
                    className='card  shadow p-3 mb-5  '
                    style={{
                      backgroundColor: "#FF8084",
                      borderRadius: "30px"
                    }}>
                    <div className='card-body'>
                      <h2 className='card-title'>
                        <i className='fa fa-credit-card' aria-hidden='false'></i>
                        &nbsp;Total Customer
                      </h2>
                      <h2>
                        <CountUp
                          start={-875.039}
                          end={this.state.totalProd}
                          duration={2.75}
                          separator=' '
                          decimals={4}
                          decimal=','
                          prefix='Product   '
                          suffix=''
                        />
                      </h2>
                      <p className='card-text'>
                        It's a broader card with text below as a natural lead-in
                        to extra content. This content is a little longer.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <div
                    className='card  shadow p-3 mb-5  '
                    style={{
                      backgroundColor: "#A5A5A5",
                      borderRadius: "30px"
                    }}>
                    <div className='card-body'>
                      <h2 className='card-title'>
                        <i className='fa fa-signal' aria-hidden='true'></i>
                        &nbsp;Completed Order{" "}
                      </h2>
                      <h2>
                        <CountUp
                          start={-875.039}
                          end={this.state.totalProd}
                          duration={2.75}
                          separator=' '
                          decimals={4}
                          decimal=','
                          prefix='Product   '
                          suffix=''
                        />
                      </h2>
                      <p className='card-text'>
                        It's a broader card with text below as a natural lead-in
                        to extra content. This content is a little longer.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <div className='card shadow-sm p-3 mb-5 bg-white rounded'>
                    <div className='card-body'>
                      <h2 className='card-title'>Product Chart</h2>
                      <hr />
                      <table className='table table-borderless table-hover'>
                        <thead>
                          <tr>
                            <th scope='col'>id</th>
                            <th scope='col'>Prod Name</th>
                            <th scope='col'>Detail</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope='row'>1</th>
                            <td>Cristina</td>
                            <td>Its a good Project</td>
                            <td>784</td>

                            <td>
                              <button
                                type='button'
                                className='btn btn-default btn-sm '
                                style={{
                                  backgroundColor: "#6EDEDE",
                                  padding: "4px 17px"
                                }}>
                                Edit
                              </button>
                              &nbsp;
                              <button
                                type='button'
                                className='btn btn-default btn-sm'
                                style={{
                                  backgroundColor: "#FF8084"
                                }}>
                                Delete
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <th scope='row'>1</th>
                            <td>Cristina</td>
                            <td>Its a good Project</td>
                            <td>784</td>

                            <td>
                              <button
                                type='button'
                                className='btn btn-default btn-sm '
                                style={{
                                  backgroundColor: "#6EDEDE",
                                  padding: "4px 17px"
                                }}>
                                Edit
                              </button>
                              &nbsp;
                              <button
                                type='button'
                                className='btn btn-default btn-sm'
                                style={{
                                  backgroundColor: "#FF8084"
                                }}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
