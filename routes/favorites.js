'use strict';

const express = require('express');
const knex = require('../knex.js');
const bcrypt = require('bcrypt-as-promised');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const humps = require('humps');
const ev = require('express-validation');
const validations = require('../validations/users');
// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/favorites", (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
  if (err) {
    res.set('Content-Type', 'text/plain');
    res.status(401).send('Unauthorized');
  } else {
    knex('favorites')
      .select('favorites.id', 'book_id', 'user_id', 'books.created_at', 'books.updated_at', 'title', 'author', 'genre', 'description', 'cover_url')
      .join('books', 'books.id', '=', 'favorites.book_id')
      .join('users', 'users.id', '=', 'favorites.user_id' )
      .where('users.id', '=', payload.userId)
      .then(result => {
        res.set('Content-Type', 'application/json');
        res.status(200).json(humps.camelizeKeys(result));
      })
    }
  })
});

router.get("/favorites/check", (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'text/plain');
      res.status(401).send('Unauthorized');
    } else {
      knex('favorites')
      .where('id', req.query.bookId)
      .then(result => {
        if (result.length > 0){
          res.set('Content-Type', 'application/json');
          res.status(200).send(true);
        } else {
          res.set('Content-Type', 'application/json');
          res.status(200).send(false);
        }
      })
    }
  })
});

router.post("/favorites", (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'text/plain');
      res.status(401).send('Unauthorized');
    } else {
      knex('books')
        .select('id', 'created_at', 'updated_at')
        .where('id', req.body.bookId)
        .then(result => {
          return knex('favorites')
            .insert({
              book_id: req.body.bookId,
              user_id: payload.userId,
              created_at: result.created_at,
              updated_at: result.updated_at
            })
        })
        .then(inserted => {
            return knex('favorites')
                .where('book_id', req.body.bookId)
        })
        .then(favoriteBook => {
            const favBook = favoriteBook[0];
            delete favBook.created_at;
            delete favBook.updated_at;
            res.set('Content-Type', 'application/json');
            res.status(200).json(humps.camelizeKeys(favBook));
        })
    }
  })
});

router.delete("/favorites", (req, res) => {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      res.set('Content-Type', 'text/plain');
      res.status(401).send('Unauthorized');
    } else {
      knex('favorites')
        .where('id', req.body.bookId)
        .then(result => {
          return result[0];
        }).then(deleted => {
          delete deleted.created_at;
          delete deleted.updated_at;
          delete deleted.id;
          res.set('Content-Type', 'application/json');
          res.status(200).json(humps.camelizeKeys(deleted));
        }).then(delResult => {
          return knex('favorites')
          .where('id', req.body.bookId)
          .delete()
        })
    }
  })
});


module.exports = router;
