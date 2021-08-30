import React from 'react';
import Actions from './Actions';
import Dashboard from './Dashboard';
import Deposit from './Deposit';
import Transfer from './Transfer';
import Withdraw from './Withdraw';



import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const DashboardContainer = ({ user, setUser }) => {
  console.log('MADE IT TO DASHBOARD, USER IS: ', user);
  return (
    <Router>
      <div id="dashboard_container">
        <Dashboard name={ user.name } email={ user.email } balance={ user.balance }/>
        <Actions />
        <Switch>
          <Route path="/deposit"> <Deposit userId={user.account_id} setUser={setUser} user={user} /> </Route>
          <Route path="/transfer"> <Transfer userId={user.account_id} setUser={setUser} user={user} /> </Route>
          <Route path="/withdraw"> <Withdraw userId={user.account_id} setUser={setUser} user={user} /> </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default DashboardContainer;
