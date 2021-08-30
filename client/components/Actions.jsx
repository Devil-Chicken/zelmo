import React from 'react';
import { Link } from 'react-router-dom';

const Actions = () => {
    return (
        <div id="actions">
            You can...
            <button>
                <Link to="/deposit">Deposit</Link>
            </button>
            <button>
                <Link to="/transfer">Transfer</Link>
            </button>
            <button>
                <Link to="/withdraw">Withdraw</Link>
            </button>
        </div>        
    )
}

export default Actions;