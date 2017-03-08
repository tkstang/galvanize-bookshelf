'use strict';

const express = require('express');
const app = express();

// eslint-disable-next-line new-cap
const router = express.Router();

const env = process.env.node_env || 'development';
const config = require('../knexfile.js')[env];
const knex = require('knex')(config);

router.get("/books", (req, res) => {
  knex("books").orderBy('title', 'asc')
  .then(books => {
    res.set('Content-Type', 'application/json');
    res.status(200).json(books);
  }).catch(err => {
    console.log(err);
  });
})

router.get("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  knex("books")
  .where('id', bookId)
  .then(books => {
    const bookItem = books[0];
    res.set('Content-Type', 'application/json');
    res.status(200).json(bookItem);
  }).catch(err => {
    console.log(err);
  });
})

router.post('/books', (req, res) => {
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.cover_url,
    created_at: new Date(),
    updated_at: new Date()
  }
  knex('books').insert(newBook)
    .then((result) => {
      knex('books')
      .where('title', newBook.title)
      .then((b) => {
        let bookItem = b[0];
        res.status(200).json(bookItem);
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.patch('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookUpdate = req.body;
  knex('books')
  .where('id', bookId)
  .update(bookUpdate)
  .then((result) => {
    knex('books')
    .where('id', bookId)
    .then((updated) => {
      let book = updated[0];
      res.status(200).json(book);
    })
  })
  .catch((err) => {
    console.log(err)
  })
})

router.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = req.body;
  knex('books')
  .where('id', bookId)
  .then((b) => {
    let deletedBook = b[0]
    knex('books')
    .where('id', bookId)
    .del()
    .then((result) => {
      res.status(200).json(deletedBook);
    })
  })
  // .then((result) => {
  //   knex('books')
  //   .where('id', bookId)
  //   .then((updated) => {
  //     let book = updated[0];
  //     res.status(200).json(book);
  //   })
  // })
  .catch((err) => {
    console.log(err)
  })
})


module.exports = router;
