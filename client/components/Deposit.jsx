import React from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'node-fetch';

const Deposit = ({ userId, setUser, user}) => {
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        const body = {
            account_id : userId,
            deposit_amount : document.getElementById('deposit_amount').value
        }
        console.log('Clicked deposit button, deposit amount is: ', body.deposit_amount)
        fetch('/depositAmount', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)  
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setUser({...user, balance: res.balance})
                history.push('/dash')
        })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div>
            <form onSubmit={(e) => onSubmit(e)}>
                <label htmlFor="deposit_amount">Deposit Amount:</label>
                <input id="deposit_amount" type="text" placeholder="Enter deposit amount..." autocomplete="off"/>
                <label htmlFor="deposit_note">Description:</label>
                <input id="deposit_note" type="text" placeholder="Enter memo here..." autocomplete="off"/>
                <button id="submit_deposit" type="submit">deposit</button>
            </form>
        </div>
    )
}

export default Deposit;