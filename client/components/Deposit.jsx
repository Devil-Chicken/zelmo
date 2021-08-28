import React from 'react';
import { useHistory } from 'react-router-dom'

const Deposit = () => {
    const history = useHistory();

    const onSubmit = () => {
        history.push("/dash")
    }


    return (
        <div>
            <form onSubmit={() => onSubmit()}>
                <label htmlFor="deposit_amount">Deposit Amount:</label>
                <input id="deposit_amount" type="text" value="how much $?"/>
                <label htmlFor="deposit_note">Description:</label>
                <input id="deposit_note" type="text" value="enter a message here" />
                <button id="submit_deposit" type="submit">deposit</button>
            </form>
        </div>
    )
}

export default Deposit;