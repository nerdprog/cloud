const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const books = [
  { title: 'Harry Potter', id: 1 },
  { title: 'Twilight', id: 2 },
  { title: 'Lorien Legacies', id: 3 }
];

// GET all books
app.get('/api/books', (req, res) => {
  res.send(books);
});

// GET by id
app.get('/api/books/:id', (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found!');
  res.send(book);
});

// POST (Add new book)
app.post('/api/books', (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const book = {
    id: books.length + 1,
    title: req.body.title
  };
  books.push(book);
  res.send(book);
});

// PUT (Update existing book)
app.put('/api/books/:id', (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found!');

  const schema = Joi.object({
    title: Joi.string().min(3).required()
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  book.title = req.body.title;
  res.send(book);
});

// DELETE
app.delete('/api/books/:id', (req, res) => {
  const book = books.find(c => c.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found!');

  const index = books.indexOf(book);
  books.splice(index, 1);
  res.send(book);
});

app.listen(3000, () => console.log('Server running on port 3000'));
