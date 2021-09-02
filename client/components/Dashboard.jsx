import React from 'react';
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
const Dashboard = ({ name, email, balance }) => {
    return <div id="dashboard">
        <div id="dashboard_title">zelmo</div>
        <p>Welcome back {name}!</p>
        <p>Balance: <span>{formatter.format(balance)}</span></p>
    </div>
}

export default Dashboard;