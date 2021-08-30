import React from 'react';

const Dashboard = ({ name, email, balance }) => {
    return <div id="dashboard">
        <div id="dashboard_title">zelmo</div>
        <p>Welcome back {name}!</p>
        <p>Balance: <span>{balance.toLocaleString('us-US', { style: 'currency', currency: 'USD' })
}</span></p>
    </div>
}

export default Dashboard;