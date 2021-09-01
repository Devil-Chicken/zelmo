import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'node-fetch';
import '../stylesheets/styles.css';
import Transaction from './Transactions';

const TransactionHistory = ({ userId, setUser, user}) => {
  const history = useHistory();

  const returnToDash = (e) => {
    e.preventDefault();
    console.log('button pushed')
    history.push('/dash');
  }

  // const getTransactions 
  useEffect((userId) => {
    console.log('invoking getTransactions');
    fetch('/transactionHistory', {
      method: 'GET',
      headers: { userId: userId }
    })
    .then(res => res.json())
    .then(res => {
      console.log('THIS IS TRANSACTION HISTORY: ', res)
    })
    .catch(err => console.log('error in the fetch!', err))
  })

// show information onload 5 most recent transactions?
// we need to query the database and return date, trasnaction type, amount, users involved, and memo
// get request to query the database, return the info and json it and then destructure

  return (
    <div className='transaction_container'>
      < Transaction />
      <button id='return_to_dash' onClick={(e) => returnToDash(e)}>Return to Dashboard</button>
    </div>

  )


};

export default TransactionHistory;