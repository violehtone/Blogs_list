const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// GET - all blogs 
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs.map(blog => blog.toJSON()))
})

// GET - single blog
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog) {
    response.status(200).json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

// POST - create a new blog
blogsRouter.post('/', async(request, response) => {
  const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog.toJSON())
})

// PUT - update an existing blog
blogsRouter.put('/', async(request, response) => {
  const blog = new Blog(request.body)
  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
  response.status(204).end()
})


// DELETE - delete an existing blog
blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

  
module.exports = blogsRouter