import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import ProfileDetails from '../ProfileDetails'
import JobItem from '../JobItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    isLoading: false,
    searchInput: '',
    typeList: [],
    salaryRange: '',
    jobsData: [],
    isProfileSuccess: '',
  }

  componentDidMount() {
    this.GetProfileDetails()
    this.GetJobs()
  }

  OnProfileSuccess = snakeCaseData => (
    <ProfileDetails>{snakeCaseData}</ProfileDetails>
  )

  OnProfileFailure = () => (
    <div className="profile-failure">
      <button
        type="button"
        className="retry-button"
        onClick={this.GetProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  GetProfileDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const url = 'https://apis.ccbp.in/profile'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      const profileData = await response.json()
      const snakeCaseData = profileData.profile_details

      if (response.ok === true) {
        this.OnProfileSuccess(snakeCaseData)
        this.setState({isProfileSuccess: true})
      } else if (response.ok !== true) {
        this.OnProfileFailure()
        this.setState({isProfileSuccess: false})
      }
    }
  }

  OnSelectType = event => {
    const {typeList} = this.state
    if (event.target.checked === true) {
      typeList.push(event.target.value)
    } else if (typeList.includes(event.target.value)) {
      const index = typeList.indexOf(event.target.value)
      typeList.splice(index, 1)
    }
    this.setState({typeList}, this.GetJobs)
  }

  OnSelectRange = event => {
    this.setState({salaryRange: event.target.value}, this.GetJobs)
  }

  OnChangeInput = event => {
    if (event.key === 'Enter') {
      this.setState({searchInput: event.target.value}, this.GetJobs)
    }
  }

  OnJobSearchSuccess = jsonData => {
    const updatesData = jsonData.jobs.map(each => ({
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      id: each.id,
      jobDescription: each.job_description,
      location: each.location,
      packagePerAnnum: each.package_per_annum,
      rating: each.rating,
      title: each.title,
    }))

    this.setState({jobsData: updatesData})
  }

  GetJobs = async event => {
    const {searchInput, salaryRange, typeList} = this.state
    const typeString = typeList.join(',')

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      const url = `https://apis.ccbp.in/jobs?employment_type=${typeString}&minimum_package=${salaryRange}&search=${searchInput}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      const jsonData = await response.json()

      if (response.ok === true) {
        this.OnJobSearchSuccess(jsonData)
      } else if (response.ok !== true) {
        this.OnJobSearchFailure()
      }
    }
  }

  render() {
    const {isProfileSuccess, jobsData} = this.state
    return (
      <div className="jobs-bg-container">
        <Header />
        <div className="jobs-container">
          <div className="jobs-left-container">
            {isProfileSuccess
              ? this.OnProfileSuccess()
              : this.OnProfileFailure()}
            <hr className="rule" />
            <h1 className="employment-types">Type of Employment</h1>
            <ul className="employment-types-list">
              {employmentTypesList.map(each => (
                <li className="types-list-item" key={each.employmentTypeId}>
                  <input
                    type="checkbox"
                    className="type-input"
                    id={each.employmentTypeId}
                    value={each.employmentTypeId}
                    onChange={this.OnSelectType}
                  />
                  <label
                    className="types-label"
                    htmlFor={each.employmentTypeId}
                  >
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="rule" />
            <h1 className="employment-types">Salary Range</h1>
            <ul className="employment-types-list">
              {salaryRangesList.map(each => (
                <li className="types-list-item" key={each.salaryRangeId}>
                  <input
                    type="radio"
                    className="type-input"
                    id={each.salaryRangeId}
                    value={each.salaryRangeId}
                    onChange={this.OnSelectRange}
                    name="range"
                  />
                  <label className="types-label" htmlFor={each.salaryRangeId}>
                    {each.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-right-container">
            <div className="search-input-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.OnChangeInput}
                onKeyDown={this.OnChangeInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {jobsData.map(each => (
              <JobItem jobDetails={each} key={each.id} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default Jobs
