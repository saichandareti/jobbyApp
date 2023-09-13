import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    nameInput: '',
    passwordInput: '',
    errorOccured: false,
    errorDetails: '',
  }

  OnChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  OnChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  OnSubmitSuccess = jwtToken => {
    this.setState({nameInput: '', passwordInput: ''})
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    console.log(jwtToken)
    const {history} = this.props
    history.replace('/')
  }

  OnSubmitFailure = errorMsg => {
    this.setState({errorOccured: true, errorDetails: errorMsg})
  }

  LoginCreds = async event => {
    event.preventDefault()

    const {nameInput, passwordInput} = this.state

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: nameInput, password: passwordInput}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const jsonData = await response.json()

    if (response.ok === true) {
      this.OnSubmitSuccess(jsonData.jwt_token)
    } else {
      this.OnSubmitFailure(jsonData.error_msg)
    }
  }

  render() {
    const {nameInput, passwordInput, errorDetails, errorOccured} = this.state

    const displayErrorMessage = errorOccured ? (
      <p className="error-msg">*{errorDetails}</p>
    ) : (
      <p className="error-msg"> </p>
    )

    return (
      <form className="login-bg-container" onSubmit={this.LoginCreds}>
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container-1">
            <label className="label" htmlFor="name-input">
              USERNAME
            </label>
            <input
              type="text"
              className="name-input"
              id="name-input"
              placeholder="Username"
              onChange={this.OnChangeNameInput}
              value={nameInput}
            />
          </div>
          <div className="input-container-2">
            <label className="label" htmlFor="password-input">
              PASSWORD
            </label>
            <input
              type="password"
              className="name-input"
              id="password-input"
              placeholder="Password"
              onChange={this.OnChangePasswordInput}
              value={passwordInput}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {displayErrorMessage}
        </div>
      </form>
    )
  }
}
export default Login
