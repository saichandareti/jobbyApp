import {Route, Switch} from 'react-router-dom'

import './App.css'
import Login from './Components/Login'
import Home from './Components/Home'
import Jobs from './Components/Jobs'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/jobs" component={Jobs} />
  </Switch>
)

export default App
