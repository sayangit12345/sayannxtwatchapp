import "./index.css";
import { Component } from "react";
import Cookies from "js-cookie";
import FunctionaliContext from "../Context/FunctionaliContext";

class Login extends Component {
  state = {
    username: "",
    password: "",
    showSubmitStatus: false,
    errorMassage: "",
    changeType: true,
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, { expires: 30, path: "/" });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({ errorMassage: errorMsg, showSubmitStatus: true });
  };

  onChangeUserName = (event) => {
    this.setState({ username: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onClickChangeType = () => {
    this.setState((prevState) => ({ changeType: !prevState.changeType }));
  };

  onSubmitLoginDetails = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const userDetails = { username, password };
    const apiUrl = "https://apis.ccbp.in/login";
    const option = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(apiUrl, option);
    const data = await response.json();
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  render() {
    const { username, password, showSubmitStatus, errorMassage, changeType } =
      this.state;

    return (
      <FunctionaliContext.Consumer>
        {(value) => {
          const { lightMode } = value;
          return (
            <div
              className={lightMode ? "login-container" : "login-container-dark"}
            >
              <form
                className="form-container"
                onSubmit={this.onSubmitLoginDetails}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="login-logo"
                  className="login-logo"
                />
                <div className="input-container">
                  <label htmlFor="username" className="username">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    className="username-input"
                    placeholder="Username"
                    id="username"
                    value={username}
                    onChange={this.onChangeUserName}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password" className="password">
                    PASSWORD
                  </label>
                  <input
                    type={changeType ? "password" : "text"}
                    className="password-input"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                </div>
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    id="checkbox"
                    onClick={this.onClickChangeType}
                  />
                  <label htmlFor="checkbox" className="checkbox">
                    Show Password
                  </label>
                </div>

                <button type="submit" className="login-button">
                  Login
                </button>
                {showSubmitStatus && (
                  <p className="submitstatus">*{errorMassage}</p>
                )}
              </form>
            </div>
          );
        }}
      </FunctionaliContext.Consumer>
    );
  }
}
export default Login;
