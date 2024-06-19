var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const mysql = require('mysql');
const {connection, query} = require('../db');

router.post('/add' , (req, res) => {
  console.log(req.body);
  query(`INSERT INTO renginiai (miesto_id, title, date, category ) VALUES ('${req.body.vieta}', '${req.body.pavadinimas}', '${req.body.laikas}', '${req.body.category}')`, (err, result) => {
    
    if (err) {
      res.status(500).send({ message: err });
      console.log(err);
    } else {
      res.status(200).send({ message: result });
      console.log(result);
    }
  })
})
router.post('/deletion', (req, res) => {
  console.log(req.body);
  query(`DELETE FROM renginiai WHERE id = '${req.body.id}'`, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      console.error(err);
    } else {
      res.status(200).send({ message: result });
      console.log(result);
    }
  });
});
router.post('/rate' , (req, res) => {
  console.log(req.body);
  query(`SELECT id FROM vartotojai WHERE email = '${req.body.email}'`, (err, result) => {
    if (err) {
      res.status(500).send({ message: err });
      console.log(err);
    } else {
      query(`INSERT INTO vertinimai (user, renginys_id, rating) VALUES ('${result[0].id}', '${req.body.id}', '${req.body.rating}')`, (err, result) => {
        if (err) {
          res.status(500).send({ message: err });
          console.log(err);
        } else {
          res.status(200).send({ message: result });
          console.log(result);
        }
      })
      console.log(result);
    }
    })
  // query(`UPDATE renginiai SET rating = '${req.body.rating}' WHERE id = '${req.body.id}'`, (err, result) => {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     console.error(err);
  //   } else {
  //     res.status(200).send({ message: result });
  //     console.log(result);
  //   }
  // })
})

router.get('/renginiai', async (req, res) => {
  try {
    const result = await new Promise((resolve, reject) => {
      query(`SELECT * FROM renginiai`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    res.status(200).send({ message: result });
    console.log(result);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post('/renginiai/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    let vieta = '';

    // First query to get the miesto_id
    const result1 = await new Promise((resolve, reject) => {
      query(`SELECT * FROM miestai WHERE name = '${req.params.id}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result1.length > 0) {
      vieta = result1[0].id;
    } else {
    }

    // Second query to get events based on miesto_id
    const result2 = await new Promise((resolve, reject) => {
      query(`SELECT * FROM renginiai WHERE miesto_id = '${vieta}'`, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    res.status(200).send({ message: result2 });
    console.log(result2);
  } catch (err) {
    res.status(500).send({ message: err.message });
    console.log(err);
  }
});



/* GET home page. */


module.exports = router;
