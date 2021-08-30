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
<<<<<<< HEAD
      <div id="dashboard_container">
        <Dashboard name={ user.name } email={ user.email } balance={ user.balance }/>
=======
      <div>
        <Dashboard name={user.name} email={user.email} balance={user.balance} />
>>>>>>> 0b50dcad57c091090a93bd63024a82618ec6f8a9
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
