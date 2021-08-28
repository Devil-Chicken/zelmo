import React from 'react';

const Transfer = () => {
  return <div>
    <form>
      <input id="transfer_recipient" type="text" value="who you're sending money to"/>
      <input id="transfer_amount" type="text" value="transfer amount" />
      <input id="transfer_description" type="text" value="description of transfer"/>
      <button type="submit">Transfer</button>
    </form>
  </div>
}

export default Transfer;
