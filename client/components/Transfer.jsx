import React from 'react';
import { useHistory } from 'react-router-dom';

const Transfer = ({ userId, setUser, user }) => {
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    const body = {
      account_id: userId,
      transfer_amount: document.getElementById('transfer_amount').value,
      recipient_email: document.getElementById('transfer_recipient').value
    }

    if (body.transfer_amount == '') {
      alert('Amount required for trasfer!')
    } else {
      console.log('Clicked transfer button, transfer amount is: ', body.transfer_amount, ' to email: ', body.recipient_email);
      fetch('/send', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(res => {
          if (res.err) {
            // console.log(res)
            alert(res.err)
          } else {
            console.log('response from fetch: ', res)
            setUser({ ...user, balance: res })
            alert('Sent Successfully!')
            history.push('/dash')
          }
        })
        .catch(e => {
          console.log(e);
        })
    }




    //
    //history.push('/dash/')
  }

  return (
    <div className="form_container">
      <form className="form" onSubmit={(e) => onSubmit(e)} >
        <label htmlFor="transfer_recipient">Transfer</label>
        <input id="transfer_recipient" type="text" placeholder="Recipient..." autoComplete="off"/>
        <input id="transfer_amount" type="text" placeholder="Transfer amount..." autoComplete="off"/>
        <input id="transfer_description" type="text" placeholder="Enter memo here..." autoComplete="off"/>
        <button type="submit">Transfer</button>
      </form>
    </div>
  )
}

export default Transfer;
