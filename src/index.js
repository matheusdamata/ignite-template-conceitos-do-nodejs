const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(req, res, next) {
  // Complete aqui
  const { username } = req.headers

  const user = users.find(user => user.username === username)

  if (!user) return res.status(400).json({
    error: 'User not exists!'
  })

  req.user = user

  return next()
}

function checksExistsTodo(req, res, next) {
  const { id } = req.params
  const { user } = req

  const todo = user.todos.find(todo => todo.id === id)

  if (!todo) {
    return res.status(400).json({
      error: 'Todo not exists!'
    })
  }
  
  req.todo = todo

  return next()
}

app.post('/users', (req, res) => {
  // Complete aqui
  const { name, username } = req.body

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user)

  return res.status(201).json(user)
});

app.get('/todos', checksExistsUserAccount, (req, res) => {
  // Complete aqui
  const { user } = req
  return res.json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (req, res) => {
  // Complete aqui
  const { user } = req
  const { title, deadline } = req.body

  user.todos.push({
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  })

  return res.status(201).send()
});

app.put('/todos/:id', checksExistsUserAccount, checksExistsTodo, (req, res) => {
  // Complete aqui
  const { todo } = req
  const { title, deadline } = req.body

  
  todo.title = title
  todo.deadline = deadline

  return res.status(201).send()
});

app.patch('/todos/:id/done', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (req, res) => {
  // Complete aqui
});

module.exports = app;