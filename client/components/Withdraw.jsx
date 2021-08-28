import React from 'react';
import { useHistory } from 'react-router-dom';

const Withdraw = () => {
  let history = useHistory();

  const onSubmit = () => {
    history.push('/dash/')
  }

  return (
    <div>
      <form  onSubmit={() => onSubmit()} >
        <label htmlFor="withdraw_request">withdraw amount</label>
        <input type="text" id="withdraw_amount" />
        <label htmlFor="withdraw_memo">withdraw memo</label>
        <input type="text" id="withdraw_description" value="withdraw description" />
        <button id="withdraw_button" type="submit" value="withdraw">Withdraw</button>
      </form>
    </div>
  )
};


export default Withdraw;