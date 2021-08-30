import React from 'react';
import { useHistory } from 'react-router-dom';
import fetch from 'node-fetch';
import '../stylesheets/styles.css'

const Login = ({ setUser }) => {
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
      .then(res => {
        console.log(res);
        setUser(res);
        history.push('/dash');
      })
      .catch(err => console.log('ERRRR', err))
  }


  if (window.location.hash) {
    const hash = (new URL(document.location)).hash;
    const access_code = hash.match(/(?<=#access_token=)(.*)(?=&token_type)/)[0];
    console.log('access_code: ', access_code);
    getUserInfo(access_code);
  }

  return (
    <div id="login_container">
      <img id="scrooge" src='./assets/scrooge.png'></img>
      <h1 id="zelmo_title">zelmo</h1>
      <form id="googleLogin" action='/oauth' method='GET'>
        <button id="login_button" type="submit" value="login" ><img id="google_logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />Login with Google</button>
      </form>
    </div>
  )
}

export default Login;