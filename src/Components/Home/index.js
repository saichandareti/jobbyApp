import './index.css'
import {Component} from 'react'

import Header from '../Header'

class Home extends Component {
  state = {}

  OnClickJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <div className="home-container">
          <h1 className="find-job-heading">Find The Job That Fits Your Life</h1>
          <p className="find-job-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your your abilities and
            potential.
          </p>
          <button
            type="button"
            className="find-jobs-button"
            onClick={this.OnClickJobs}
          >
            Find Jobs
          </button>
        </div>
      </div>
    )
  }
}
export default Home
