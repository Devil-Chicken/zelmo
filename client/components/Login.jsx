import React from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'node-fetch';


const Login = () => {
  let history = useHistory();

  // const onSubmit = () => {
  //   fetch('/oauth')

  //   // // history.push('/dash/')
  // }
  const getUserInfo = (access_code) => {
    console.log('invoking getUserInfo');
    fetch('/google', {
      method: 'GET',
      headers: { access_code: access_code }
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => console.log('ERRRR', err))
  }


  if (window.location.hash) {
    const hash = (new URL(document.location)).hash;
    const access_code = hash.match(/(?<=#access_token=)(.*)(?=&token_type)/)[0];
    console.log('access_code: ', access_code);
    getUserInfo(access_code);
  }

  return (
    <div>
      {/* <form onSubmit={() => onSubmit()} > */}
      <form id="googleLogin" action='/oauth' method='GET'>
        <label htmlFor="login_username">Username</label>
        <input id="login_username" type="text" defaultValue="enter username here" />
        <input id="login_password" type="text" defaultValue="enter password here" />

        <button id="login_button" type="submit" value="login">login</button>
      </form>
    </div>
  )
}

export default Login;