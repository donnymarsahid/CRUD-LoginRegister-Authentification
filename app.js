const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// get Database
const dbConnection = require('./lib/database');

app.use(bodyParser());
app.use(express.static('public'));

// Connection To Client
app.use(cors());
app.use(express.json());

// Get Contacts
app.get('/contacts', (req, res) => {
  dbConnection.query('SELECT * FROM contact', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Add Contacts
app.post('/contacts', (req, res) => {
  let form = { name: req.body.name, email: req.body.email };
  dbConnection.query('INSERT INTO contact SET ? ', form, (err, rows) => {
    if (err) throw err;
    res.send('success add');
  });
});

// Edit Contact
app.put('/contacts/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.body.email;
  let sql = 'UPDATE contact SET name = ? , email = ? WHERE id = ? ';
  dbConnection.query(sql, [name, email, id], (err, rows, fields) => {
    if (err) throw err;
    res.send('Success update');
  });
});

// Get Edit Contact
app.get('/contacts/:id', (req, res) => {
  const id = req.params.id;
  dbConnection.query('SELECT * FROM contact WHERE id = ? ', id, (err, rows) => {
    if (err) throw err;
    res.send(rows[0]);
  });
});

// Delete Contact
app.delete('/contacts/:id', function (req, res) {
  const id = req.params.id;
  let sql = `DELETE FROM contact where id = ${id}`;
  dbConnection.query(sql, (err, result) => {
    if (err) throw err;
    res.send('success delete');
  });
});

// Get Detail Contact
app.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  dbConnection.query('SELECT * FROM contact WHERE id = ? ', id, (err, rows) => {
    if (err) throw err;
    res.send(rows[0]);
  });
});

// port
app.listen(3001, (req, res) => {
  console.log('server is ok port 3001');
});
