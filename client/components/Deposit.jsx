import React from 'react';

const Deposit = () => {
    return <div>
        <input id="deposit_amount" type="text" value="how much $?"/>
        <input id="deposit_note" type="text" value="enter a message here" />
        <button id="submit_deposit">deposit</button>
    </div>
}

export default Deposit;