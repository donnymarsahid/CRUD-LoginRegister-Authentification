import React, { Fragment, useState } from 'react';
import api from '../api/contacts';
import { Link, Redirect } from 'react-router-dom';

function Login() {
  // get/add data Register
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');

  //   Redirect next Login
  const [redirect, setRedirect] = useState(false);

  // get/add data Login
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // status login
  const [status, setStatus] = useState('');
  const [statusReg, setStatusReg] = useState('');

  //post Register
  const register = async (e) => {
    e.preventDefault();
    const response = await api.post('/register', { username: regUsername, password: regPassword });
    if (response) {
      setStatusReg(response.data.message);
      setTimeout(() => {
        setStatusReg('');
      }, 3000);
    }
  };

  //post Login
  const login = async (e) => {
    e.preventDefault();
    const response = await api.post('/login', { username: username, password: password });
    if (response.data.message) {
      setStatus(response.data.message);
      setTimeout(() => {
        setStatus('');
      }, 3000);
    } else {
      console.log(response);
      localStorage.setItem('token', response.data.token);
      setRedirect(true);
    }
  };

  return (
    <Fragment>
      {redirect && <Redirect to="/welcome" />}
      <div>
        <div class="container mt-5" style={{ marginBottom: '500px' }}>
          <div class="card mt-5">
            <div class="login">
              <form onSubmit={login}>
                <div class="mb-3 text-center">
                  <h1>Admin Login</h1>
                  <Link to="/">
                    <p>BACK TO CONTACTS</p>
                  </Link>
                </div>
                <div class="message">
                  {status && (
                    <div class="alert alert-success" role="alert">
                      {status}
                    </div>
                  )}
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
            <div class="Register">
              <form onSubmit={register}>
                <div class="mb-3 text-center">
                  <h1>Register</h1>
                </div>
                <div class="message">
                  {statusReg && (
                    <div class="alert alert-success" role="alert">
                      {statusReg}
                    </div>
                  )}
                </div>
                <div class="mb-3">
                  <label for="username" class="form-label">
                    Regist Username
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="username"
                    name="username"
                    onChange={(e) => {
                      setRegUsername(e.target.value);
                    }}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">
                    Regist Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    onChange={(e) => {
                      setRegPassword(e.target.value);
                    }}
                    required
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
