import React from 'react';
import { Link } from 'react-router-dom';
import api from '../api/contacts';

// Parameter pada "Card Contacts" yang berupa "object" adalah property yg dikirimkan dari "Home"
// Jika ingin memake propertynya masukan kedalam Parameter

const CardContacts = ({ contact, refresh }) => {
  // Fungsi Delete
  async function deleted() {
    await api.delete(`/contacts/${contact.id}`);
    return refresh();
  }
  return (
    <div className="col-md-4">
      <div className="card" width="18rem">
        <div className="card-body">
          <p className="card-text">Name : {contact.name} </p>
          <p className="card-text">Email : {contact.email} </p>
          <Link to={`/detail/${contact.id}`}>
            <button class="nav-link ms-auto" aria-current="page">
              Detail
            </button>
          </Link>
          <Link to={`/edit/${contact.id}`}>
            <button class="nav-link ms-auto" aria-current="page">
              Edit
            </button>
          </Link>
          <button class="nav-link ms-auto" aria-current="page" onClick={deleted}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardContacts;
