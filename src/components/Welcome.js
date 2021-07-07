import React from 'react';
import { Link, Redirect } from 'react-router-dom';

function Welcome() {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Redirect to="/login" message={'add token'} />;
  }

  function logout() {
    return localStorage.clear();
  }
  return (
    <div>
      <div class="container mt-5">
        <div class="card mt-5">
          <div class="text-center">
            <h3>Welcome Guys</h3>
            <Link to="/">
              <h5>Back</h5>
            </Link>
            <Link to="/login" onClick={logout}>
              <h5>logout</h5>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
