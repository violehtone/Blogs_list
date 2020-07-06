const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { update } = require('../models/blog')

// GET - all blogs 
blogsRouter.get('/', async (request, response) => {
  console.log('calling the GET all blogs route')

  const blogs = await Blog.find({})
  response.status(200).json(blogs.map(blog => blog.toJSON()))
})

// GET - single blog
blogsRouter.get('/:id', async (request, response) => {
  console.log('calling the GET blog by id route')
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
blogsRouter.put('/:id', async(request, response) => {
  console.log('calling the PUT path')
  
  const blog = {
    'title': request.body.title,
    'author': request.body.author,
    'url': request.body.url,
    'likes': request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(204).json(updatedBlog.toJSON())
})


//OLD BUT WORKS
/*
blogsRouter.put('/:id', (request, response) => {
  const blog = {
    'title': request.body.title,
    'author': request.body.author,
    'url': request.body.url,
    'likes': request.body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => {
      console.log(error)
    })
})
*/

/*
blogsRouter.put('/:id', async (request, response) => {
  console.log('Calling the PUT route')
  const blog = new Blog(request.body)
  console.log('Read the request body:', blog)

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  console.log('Blog found and updated successfully!')

  response.status(204)
})
*/

// DELETE - delete an existing blog
blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

  
module.exports = blogsRouter