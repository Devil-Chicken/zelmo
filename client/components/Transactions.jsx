import React from 'react';
import '../stylesheets/styles.css';
import fetch from 'node-fetch';

const Transaction = (props) => {
  
  console.log('HELLO I AM PROPS', props); 
  let utcString = new Date(props.date).toDateString();
  return (
    <div className='transaction_box'>
      <div> DATE: { utcString} </div>
      <div> Transaction Type: { props.type } </div>
      <div> Amount: { props.amount }</div>
      <div> Memo: { props.memo } </div>
    </div>
    )
  };

export default Transaction;