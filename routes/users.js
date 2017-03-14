'use strict';

const express = require('express');
const knex = require('../knex.js');
const bcrypt = require('bcrypt-as-promised');
const humps = require('humps');
const ev = require('express-validation');
const validations = require('../validations/users.js');
const app = express();

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/users', ev(validations.post), (req, res) => {
	bcrypt.hash(req.body.password, 1)
	.then((hashed) => {
		const newUser = {
			first_name: req.body.firstName,
			last_name: req.body.lastName,
			email: req.body.email,
			hashed_password: hashed
		}
		return knex('users').insert(newUser, '*');
	})
	.then((users) => {
		const user = users[0];
		delete user.hashed_password;
		delete user.created_at;
		delete user.updated_at;
		res.send(humps.camelizeKeys(user));
	})
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
