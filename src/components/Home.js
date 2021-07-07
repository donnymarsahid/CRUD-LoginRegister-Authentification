import React, { Component } from 'react';
import api from '../api/contacts';
import CardContacts from './CardContacts';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  // menampung isi contacts
  state = {
    contacts: [],
  };

  // ambil data contacts yang akan dimasukan ke state
  componentDidMount = async () => {
    const response = await api.get('/contacts', this.state);
    this.setState({
      contacts: response.data,
    });
  };

  render() {
    const renderContacts = this.state.contacts.map((contact) => {
      return <CardContacts contact={contact} key={contact.id} refresh={this.componentDidMount} />;
    });

    return (
      <div className="container">
        <div class="card">
          <nav class="nav p-3 shadow-sm">
            <a class="nav-link active" aria-current="page" href="#">
              Donny
            </a>
            <Link to="/add">
              <button class="nav-link ms-auto" aria-current="page">
                Sign In
              </button>
            </Link>
            <Link to="/login">
              <button class="nav-link ms-auto" aria-current="page">
                Login & Register
              </button>
            </Link>
          </nav>
        </div>
        <div class="row">{renderContacts}</div>
      </div>
    );
  }
}
