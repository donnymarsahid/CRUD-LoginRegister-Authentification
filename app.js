const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

// add token
const jwt = require('jsonwebtoken');

// protect Password / Hashing
const saltRounds = 10;

// get Database
const dbConnection = require('./lib/database');

// get data file in folder public
app.use(express.static('public'));

// Connection To Client
app.use(express.json());
app.use(cors());

//  Register
app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    dbConnection.query('INSERT INTO admin (username, password) VALUES (?,?) ', [username, hash], (err, rows) => {
      if (err) throw err;
      res.send({ message: 'success register' });
    });
  });
});

//  Login
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  dbConnection.query('SELECT * FROM admin WHERE username = ? ', username, (err, rows) => {
    if (err) {
      res.send({ err: err });
    } else {
      if (rows.length > 0) {
        bcrypt.compare(password, rows[0].password, (err, response) => {
          if (response) {
            // add token
            let data = rows[0].id;
            const token = jwt.sign({ data }, 'jwtSecret', {
              expiresIn: 300,
            });
            res.json({ token: token });
          } else {
            res.send({ message: 'username / password is wrong!' });
          }
        });
      } else {
        res.send({ message: 'username / password is wrong!' });
      }
    }
  });
});

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
