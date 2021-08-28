import React from 'react';
import { Link } from 'react-router-dom';

const Actions = () => {
    return (
        <ul>
            <li>
                <Link to="/deposit">Deposit</Link>
            </li>
            <li>
                <Link to="/transfer">Transfer</Link>
            </li>
            <li>
                <Link to="/withdraw">Withdraw</Link>
            </li>
        </ul>        
    )
}

export default Actions;