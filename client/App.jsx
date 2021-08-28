import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Login from './components/Login';
import DashboardContainer from './components/DashboardContainer';

// import Dashboard from './components/Dashboard';
// import Actions from './components/Actions';

const App = () => {
  return (
    <Router>
      <div> 
          <Switch>
            <Route exact path="/" > <Login /> </Route>
            <Route exact path="/dash" > <DashboardContainer /> </Route>
          </Switch>
      </div>
    </Router>
  )
}

export default App;