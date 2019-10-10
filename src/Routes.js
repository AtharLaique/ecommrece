//@ Importing Modules
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
//@component 4 user
import Cart from "./pages/cart";
import CheckOut from "./pages/user/CheckOut";
import Upload from "./pages/Admin/Upload";
//@component 4 admin
import Dashboard from "./pages/Dashboard";
import AdPages from "./pages/Admin/AdPages";
import ListPages from "./pages/Admin/ListPages";
import AddMenu from "./pages/Admin/AddMenu";
import ListMenu from "./pages/Admin/ListMenu";
import ListProd from "./pages/Admin/ListProd";
import AdProd from "./pages/Admin/AdProd";
import Boys from "./pages/user/Boys";
import Girls from "./pages/user/Girls";
import Baba from "./pages/user/Baba";
//Common component
import Navbar from "./components/navbar/navbar";
import UserNav from "./components/navbar/UserNav";
import UserLanding from "./pages/user/Landing";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Women";

//@component 4 visitor
import Salse from "./pages/Sales";
import Landing from "./pages/user/Landing.jsx";
import Login from "./pages/user/Login.jsx";
import Women from "./pages/Women";

import Men from "./pages/Men";

class Routes extends React.Component {
  render() {
    const ROLE = localStorage.getItem("ROLE");
    const LOG = localStorage.getItem("LOG");

    if (LOG === "true") {
      //user login
      if (ROLE === "user") {
        return (
          <Router>
            <div>
              <UserNav />
              <div>
                <Route exact path='/user' component={Landing} />
                <Route path='/user/men' component={Men} />
                <Route path='/user/women' component={Women} />
                <Route path='/user/boys' component={Boys} />
                <Route path='/user/girls' component={Girls} />
                <Route path='/user/Baba' component={Baba} />
                <Route path='/yourcart' component={Cart} />
                <Route path='/order' component={CheckOut} />
                <Route path='/prod/:id' component={Salse} />
              </div>
              <Footer />
            </div>
          </Router>
        );
      } else {
        return (
          <Router>
            <div>
              <Route exact path='/admin/dash' component={Dashboard} />
              <Route exact path='/admin/adpage' component={AdPages} />
              <Route exact path='/admin/listpage' component={ListPages} />
              <Route exact path='/admin/addmenu' component={AddMenu} />
              <Route exact path='/admin/listmenu' component={ListMenu} />
              <Route exact path='/admin/addprod' component={AdProd} />
              <Route exact path='/admin/listprod' component={ListProd} />
              <Route exact path='/admin/upload' component={Upload} />
            </div>
          </Router>
        );
      }
    } else {
      //Visitor
      return (
        <Router>
          <div>
            <Navbar />
            <div>
              <Route exact path='/' component={Landing} />
              <Route path='/men' component={Men} />
              <Route path='/women' component={Women} />
              <Route path='/boys' component={Boys} />
              <Route path='/girls' component={Girls} />
              <Route path='/Baba' component={Baba} />
              <Route path='/login' component={Login} />
              <Route path='/prod/:id' component={Salse} />
            </div>
            <Footer />
          </div>
        </Router>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.login
});

export default connect(
  mapStateToProps,
  null
)(Routes);
