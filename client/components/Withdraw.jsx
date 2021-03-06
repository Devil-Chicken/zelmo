import React from 'react';
import { useHistory } from 'react-router-dom';

const Withdraw = ({ userId, setUser, user}) => {
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
        account_id : userId,
        withdraw_amount : document.getElementById('withdraw_amount').value
    }
    console.log('Clicked withdraw button, withdraw amount is: ', body.withdraw_amount)
    fetch('/withdrawAmount', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body)  
    })
      .then(res => res.json())
      .then(res => {
          if (res.err) {
            alert('Insufficient Funds!')
          } else {
            console.log(res)
            setUser({...user, balance: res.balance})
            history.push('/dash')
          }
    })
        .catch(e => {
            console.log(e);
        })
}

  return (
    <div className="form_container">
      <form className="form" onSubmit={(e) => onSubmit(e)} >
        <label htmlFor="withdraw_request">Withdraw</label>
        <input type="text" id="withdraw_amount" placeholder="Enter withdraw amount..." autoComplete="off"/>
        <input type="text" id="withdraw_description" placeholder="Enter memo here..." autoComplete="off"/>
        <button id="withdraw_button" type="submit" placeholder="withdraw">Withdraw</button>
      </form>
    </div>
  )
};


export default Withdraw;