const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET - all blogs
blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// POST
blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch((error) => {
      console.log(error.message)
    })
})


module.exports = blogsRouter