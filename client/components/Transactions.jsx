import React from 'react';
import '../stylesheets/styles.css';
import fetch from 'node-fetch';

const Transaction = (props) => {
  
  console.log('HELLO I AM PROPS', props); 
  let utcString = new Date(props.date).toDateString();
  return (
    <div className='transaction_box'>
      <ul>
      <li><div> DATE: { utcString} </div></li>
      <li><div> Transaction Type: { props.type } </div></li>
      <li><div> Amount: { props.amount }</div></li>
      <li><div> Memo: { props.memo } </div></li>
      </ul>
    </div>
    )
  };

export default Transaction;