var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const mysql = require('mysql');
const {connection, query} = require('../db');
var bcrypt = require('bcryptjs');


/* GET users listing. */
router.post('/register', function(req, res, next) {
  console.log("register", req.body);
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 8);
  const name = req.body.name;
  const surname = req.body.surname;
try {
  query(`INSERT INTO vartotojai (email, password, name, surname) VALUES ('${email}', '${password}', '${name}', '${surname}')`, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      console.log(err);
    } else {
      res.status(200).send({ message: result });
      console.log(result);
    }
  });
} catch (error) {
  console.log(error);
} 

})

router.post('/login', function(req, res, next) {
  console.log("login", req.body);
  const email = req.body.email;
  const password = req.body.password;
  try {
    query(`SELECT * FROM vartotojai WHERE email = '${email}'`, (err, result) => {
      if (err) {
        res.status(500).send({ message: err });
        console.log(err);
      } else {
        if (result.length > 0) {
          if (bcrypt.compareSync(password, result[0].password)) {
            console.log("Logged in");
            res.status(200).send({ message: result[0] });
            console.log(result);
          } else {
            console.log("Wrong password");
            res.status(500).send({ message: "Wrong password" });
          }
        } else {
          console.log("User not found");
          res.status(500).send({ message: "User not found" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
