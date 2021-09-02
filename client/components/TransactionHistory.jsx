import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'node-fetch';
import '../stylesheets/styles.css';
import Transaction from './Transactions';

const TransactionHistory = ({ userId, setUser, user}) => {
  const [transactions, setTransactions] = useState([])
  const history = useHistory();

  const returnToDash = (e) => {
    e.preventDefault();
    console.log('button pushed')
    history.push('/dash');
  }
  
  var captureState = []
  // const getTransactions 
  useEffect(() => {
    console.log('invoking getTransactions');
    fetch('/transactionHistory', {
      method: 'GET',
      headers: { userId: userId }
    })
    .then(res => res.json())
    .then(res => {
      setTransactions(res);
      // console.log('THIS IS TRANSACTION HISTORY: ', res)
     captureState = res;
        
      })
      .catch(err => console.log('error in the fetch!', err))
    }, []);
    
    // setTransactions(captureState);
    console.log('WE HAVE TRANSACTIONS 2.0: ', transactions)
    var transactionsArray = [];
    for (let i = 0; i < transactions.length; i++) {
        transactionsArray.push(<Transaction key={i} date={transactions[i].date} type={transactions[i].type} memo={transactions[i].memo} sender={transactions[i].sender_id} recipient={transactions[i].recipient_id} amount={transactions[i].amount}></Transaction>);
  }
// show information onload 5 most recent transactions?
// we need to query the database and return date, trasnaction type, amount, users involved, and memo
// get request to query the database, return the info and json it and then destructure
 


  return (
    <div className='transaction_container'>
      {transactionsArray}
      <button id='return_to_dash' onClick={(e) => returnToDash(e)}>Hide Transactions</button>
      {/* <button id='return to dash' onClick = {() => viewTransactions()}></button> */}
    </div>

  )


};

export default TransactionHistory;