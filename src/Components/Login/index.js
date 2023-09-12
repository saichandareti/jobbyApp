import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {nameInput: '', passwordInput: ''}

  OnChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  OnChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  OnLogin = async event => {
    event.preventDefault()

    const {nameInput, passwordInput} = this.state

    const body = {nameInput, passwordInput}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(body),
    }

    const response = await fetch(url, options)
    const jsonData = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(jsonData.jwt_token)
      console.log('OK')
    } else {
      console.log('Not OK')
      this.onSubmitFailure(jsonData.error_msg)
    }

    console.log(jsonData)
  }

  render() {
    const {nameInput, passwordInput} = this.state

    return (
      <form className="login-bg-container" onSubmit={this.OnLogin}>
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
        </div>
      </form>
    )
  }
}
export default Login
