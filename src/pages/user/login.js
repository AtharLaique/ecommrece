//@ Exporting Modules
import React from "react";
import "../../App.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginuser } from "../../Redux/actions/loginAction";
class Login extends React.Component {
  //@ state
  state = { email: "", password: "" };

  //@ Extracting values from fields
  onEmailchange = event => {
    this.setState({ email: event.target.value });
  };
  onPasswordchange = event => {
    this.setState({ password: event.target.value });
  };

  //@ On Submit form
  onsubmit = () => {
    const newUser = {
      email: "admin@gmail.com",
      password: "eprod1122"
    };

    //@ call the login action to complete the login process
    this.props.loginuser(newUser, this.props.history);
  };
  render() {
    const user = this.props.user.error;
    return (
      <form>
        <h1>Login</h1>

        <input
          type='email'
          name='email'
          id='email'
          placeholder='Enter your email... '
          onChange={this.onEmailchange}
        />
        <p style={{ color: "red" }}>{user ? user.email : null}</p>

        <input
          type='password'
          name='password'
          id='password'
          placeholder='Enter your password... '
          onChange={this.onPasswordchange}
        />
        <p style={{ color: "red" }}>{user ? user.password : null}</p>

        <button
          type='button'
          color='primary'
          size='md'
          block
          onClick={this.onsubmit}>
          Login
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login
});

export default connect(
  mapStateToProps,
  { loginuser }
)(withRouter(Login));
