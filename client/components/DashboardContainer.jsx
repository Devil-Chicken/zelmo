import React from 'react';
import Actions from './Actions';
import Dashboard from './Dashboard';
import Deposit from './Deposit';
import Transfer from './Transfer';
import Withdraw from './Withdraw';


import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const DashboardContainer = () => {
  return (
    <Router>
      <div>
        <Dashboard />
        <Actions />
        <Switch>
          <Route path="/deposit"> <Deposit /> </Route>
          <Route path="/transfer"> <Transfer /> </Route>
          <Route path="/withdraw"> <Withdraw /> </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default DashboardContainer;
