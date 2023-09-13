import './index.css'

const ProfileDetails = props => {
  const {data} = props

  return (
    <div className="profile-container">
      <img
        src="https://w7.pngwing.com/pngs/481/915/png-transparent-computer-icons-user-avatar-woman-avatar-computer-business-conversation.png"
        alt="img"
        className="avatar-image"
      />
      <h1 className="profile-name">Rahul Attuluri</h1>
      <p className="profile-para">Lead Software Developer and AI/ML expert.</p>
    </div>
  )
}
export default ProfileDetails
