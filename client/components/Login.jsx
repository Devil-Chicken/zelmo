import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  let history = useHistory();

  const onSubmit = () => {
    history.push('/dash/')
  }

  return (
  <div>
    <form  onSubmit={() => onSubmit()} >
      <label htmlFor="login_username">Username</label>
      <input id="login_username" type="text" defaultValue="enter username here" />
      <input id="login_password" type="text" defaultValue="enter password here" />
      
      <button id="login_button" type="submit" value="login">login</button>
    </form>
  </div>
  )
}

export default Login;