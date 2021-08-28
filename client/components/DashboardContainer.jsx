import React from 'react';
import Actions from './Actions';
import Dashboard from './Dashboard';
import Deposit from './Deposit';
import Transfer from './Transfer';
import Withdraw from './Withdraw';

const DashboardContainer = () => {
  return <div>
    <Dashboard />
    <Actions />
    <Deposit />
    <Transfer />
    <Withdraw />
  </div>
}

export default DashboardContainer;
