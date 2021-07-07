import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/contacts';

export default class Add extends Component {
  // Menampung isi Contacts
  state = {
    name: '',
    email: '',
  };

  // Event untuk merubah/menambah state
  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Event submit dan memasukkan data ke database server
  handlerSubmit = async (e) => {
    e.preventDefault();
    await api.post('/contacts', this.state);
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div class="container">
          <div class="card">
            <nav class="nav p-3 shadow-sm">
              <Link to="/">
                <button class="nav-link ms-auto" aria-current="page">
                  back
                </button>
              </Link>
            </nav>
            <form onSubmit={this.handlerSubmit}>
              <div class="mb-3">
                <label for="name" class="form-label">
                  Name :
                </label>
                <input type="text" class="form-control" id="name" name="name" onChange={this.handlerChange} />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email :
                </label>
                <input type="email" class="form-control" id="email" name="email" onChange={this.handlerChange} />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
