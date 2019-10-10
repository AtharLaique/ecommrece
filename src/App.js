import "./App.css";
//@ App component
import Navbar from "./components/navbar/navbar";
import Footer from "./components/Footer/Footer";
//@ App Pages
import Home from "./pages/Landing";
import Product from "./pages/Product";
import WrappedLogin from "./pages/Login";
import Men from "./pages/Men";
import Wommen from "./pages/Women";
import BG from "./pages/BG";
import Fragrence from "./pages/Fragrence";
import { connect } from "react-redux";
//@ Admin Pages
import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdProduct from "./pages/AdProduct";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import ListPages from "./pages/Admin/ListPages";
import AdPages from "./pages/Admin/AdPages";
import AdminNav from "./components/navbar/AdminNav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null
    };
  }

  render() {

      return (
        // <div>
        //   <Router>
        //     <div>
        //       <div>
        //         <Switch>
        //           <Route exact path='/' component={Home} />
        //           <Route exact path='/admin/' component={AdminLogin} />
        //           <Route path='/arrivals' component={Product} />
        //           <Route path='/women' component={Wommen} />
        //           <Route path='/men' component={Men} />
        //           <Route path='/boysgirl' component={BG} />
        //           <Route path='/fragrence' component={Fragrence} />
        //           <Route path='/login' component={WrappedLogin} />
        //         </Switch>
        //       </div>
        //     </div>
        //   </Router>
        // </div>
         <div>
         <Router>
           <div>
             <Switch>
               <Route exact path='/dashboard' component={Dashboard} />
               <Route path='/adprod' component={AdProduct} />
               <Route path='/sales' component={Sales} />
               <Route path='/users' component={Users} />
               <Route path='/reports' component={Reports} />
               <Route path='/adpage' component={AdPages} />
               <Route path='/listpage' component={ListPages} />
             </Switch>
           </div>
         </Router>
       </div>
      );
    }
}

export default App;
