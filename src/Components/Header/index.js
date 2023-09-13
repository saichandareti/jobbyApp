import './index.css'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.replace('/login')
      Cookies.remove('jwt_token')
    }
  }

  return (
    <div className="header-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
        alt="website logo"
        className="logo-image"
      />
      <div className="header-home-con">
        <p className="header-home">Home</p>
        <p className="header-home">Jobs</p>
      </div>
      <button type="button" className="logout-button" onClick={onClickLogout}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
