import React from 'react';

const Dashboard = ({ name, email, balance }) => {
    return <div>
        <h1>Dashboard</h1>
        <p>Welcome {name} !</p>
        <p>Balance: {balance}</p>
    </div>
}

export default Dashboard;