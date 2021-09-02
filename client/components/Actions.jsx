import React from 'react';
import { Link } from 'react-router-dom';

const Actions = () => {
    return (
        <div id="actions">
            You can...
            <button >
                <Link className="actionButton" to="/deposit">Deposit</Link>
            </button>
            <button >
                <Link className="actionButton" to="/transfer">Transfer</Link>
            </button>
            <button >
                <Link className="actionButton" to="/withdraw">Withdraw</Link>
            </button>
            {/* adding button for transfer history */}
            <button>
                <Link className="actionButton" to="/transactionHistory">Transactions</Link>
            </button>
        </div>        
    )
}

export default Actions;