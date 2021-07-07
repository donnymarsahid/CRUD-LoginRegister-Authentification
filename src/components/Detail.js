import React, { Component } from 'react';
import api from '../api/contacts';

export default class Detail extends Component {
  // menampung isi contact
  state = {
    id: '',
    name: '',
    email: '',
  };
  // get data details
  async componentDidMount() {
    const id = this.props.match.params.id;
    const response = await api.get(`/detail/${id}`);
    this.setState({
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
    });
  }
  render() {
    return (
      <div>
        <div className>
          <div class="container mt-5">
            <div class="card">
              <h3>Detail Contact</h3>
              <p>Name : {this.state.name} </p>
              <p>Email : {this.state.email} </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
