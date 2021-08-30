import React, { useState } from 'react';
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
  const [ user, setUser ] = useState({})
  return (
    <Router>
      <div> 
          <Switch>
            <Route exact path="/" > <Login 
            setUser={setUser}/> </Route>
            <Route exact path="/dash" > <DashboardContainer
            user={user} 
            setUser={setUser} /> </Route>
          </Switch>
      </div>
    </Router>
  )
}

export default App;