import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    id,
    rating,
    title,
  } = jobDetails
  return (
    <div className="job-item-container">
      <div className="logo-container">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div className="role-container">
          <h1 className="role-name">{title}</h1>
          <div className="star-container">
            <BsFillStarFill className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-package-container">
        <div className="location-type-con">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location-name">{location}</p>
          </div>
          <div className="location-container">
            <BsFillBriefcaseFill className="location-icon" />
            <p className="location-name">{employmentType}</p>
          </div>
        </div>
        <p className="package-para">{packagePerAnnum}</p>
      </div>
      <hr className="rule-2" />
      <h1 className="description-heading">Description</h1>
      <p className="description-para">{jobDescription}</p>
    </div>
  )
}
export default JobItem
