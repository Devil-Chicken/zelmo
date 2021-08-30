import React from 'react';

const Dashboard = ({ name, email, balance }) => {
    return <div id="dashboard">
        <div id="dashboard_title">Dashboard</div>
        <p>Welcome {name}!</p>
        <p>Balance: {balance}</p>
    </div>
}

export default Dashboard;