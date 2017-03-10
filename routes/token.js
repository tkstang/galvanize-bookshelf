'use strict';

const express = require('express');
const knex = require('../knex.js');
const bcrypt = require('bcrypt-as-promised');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const humps = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();



router.get("/token", (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
		if (err) {
			res.set('Content-Type', 'application/json');
			res.status(200).send(false);
		} else {
			res.set('Content-Type', 'application/json');
			res.status(200).send(true);
		}
	})
})

router.post("/token", (req, res) => {
	knex("users")
	.select('hashed_password')
	.where('email', req.body.email)
	.then(selected => {
		if (selected.length === 0){
			res.set('Content-Type', 'text/plain');
			return res.status(400).send('Bad email or password');
		} else {
			const password = selected[0].hashed_password;
			bcrypt.compare(req.body.password, password)
			.then(result => {
						knex("users")
						.select('id', 'first_name', 'last_name', 'email')
						.where('email', req.body.email)
						.then(result => {
							const user = humps.camelizeKeys(result[0]);
							if (user.email !== req.body.email){
								res.set('Content-Type', 'text/plain');
								res.status(400).send('Bad email or password');

							} else {
								const claim = { userId: req.body.email };
								const token = jwt.sign(claim, process.env.JWT_KEY, {
									expiresIn: '7 days',
								});
								console.log(token, claim);
								res.cookie('token', token, {
									httpOnly: true
								});
								res.set('Content-Type', 'application/json');
								res.status(200).send(user);
							}
						})
				})
				.catch(err => {
				res.set('Content-Type', 'text/plain');
				res.status(400).send('Bad email or password');
		  	});
			}
		})
})

router.delete("/token", (req, res) => {
	const claim = { userId: req.body.email };
	const token = jwt.sign(claim, process.env.JWT_KEY, {
		expiresIn: '7 days',
	});
	res.cookie('token', '', {
		httpOnly: true
	});
	res.set('Content-Type', 'application/json');
	res.status(200).send(false);
})



module.exports = router;
