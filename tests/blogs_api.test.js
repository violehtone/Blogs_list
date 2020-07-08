const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)

// Exercise 4.8
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Exercise 4.9
test('blogs contain id field', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id !== undefined)
    expect(blog._id) === undefined
  })

})

// Exercise 4.10
test('a valid blog can be added', async() => {
  const initialBlogs = await api.get('/api/blogs')

  const newBlog = {
    title: 'a new blog',
    author: 'great dude',
    url: 'www.bestblog.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(initialBlogs.length + 1 === response.length)

  const titles = response.body.map(r => r.title)
  expect(titles).toContain('a new blog')

  const createdBlog = response.body.filter(blog => {
    return blog.title = 'a new blog'
  })

  createdBlog.forEach(blog => {
    expect(blog.likes === 10)
  })

})

// Exercise 4.11
test('the likes has default value of 0', async() => {
  const noLikeBlog = {
    title: 'nobody likes this blog',
    author: 'John Smith',
    url: 'www.niceblog.com'
  }

  await api
    .post('/api/blogs')
    .send(noLikeBlog)
    .expect(201)
  
  const response = await api.get('/api/blogs')
  const fetchedBlog = response.body.filter(blog => {
    return blog.title === 'nobody likes this blog'
  })

  expect(fetchedBlog.likes === 0)  
})

// Exercise 4.12
test('returns 400 if title or url are missing', async() => {
  const invalidBlog = {
    author: 'John Smith',
    url: 'www.niceblog.com',
    likes: 10
  }

  const invalidBlog2 = {
    title: 'nobody likes this blog',
    author: 'John Smith',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(500)

  await api
    .post('/api/blogs')
    .send(invalidBlog2)
    .expect(500)
})

// Exercise 4.14
test('a blog can be updated', async () => {

  // Create a new blog
  const newBlog = {
    title: 'test blog for PUT',
    author: 'great dude',
    url: 'www.bestblog.com',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // Fetch the id of the newly created blog
  const response = await api.get('/api/blogs')
  let fetchedBlog = response.body[response.body.length - 1]

  // Update the newly created blog
  const updatedBlog = {
    title: 'updated test blog for PUT',
    author: 'great dude',
    url: 'www.bestblog.com',
    likes: 10
  }

  await api
    .put(`/api/blogs/${fetchedBlog.id}`)
    .send(updatedBlog)
    .expect(204)
  
  // Check that the updated blog exists
  const updatedResponse = await api.get('/api/blogs')

  const titles = updatedResponse.body.map(r => r.title)
  expect(titles).toContain('updated test blog for PUT')
})


// Exercise 4.13
test('delete all created blogs during the tests', async() => {
  const initialBlogs = await api.get('/api/blogs')

  const toBeDeletedBlogs = initialBlogs.body.filter(blog => {
    return (blog.title === 'nobody likes this blog' ||
           blog.title === 'a new blog' ||
           blog.title === 'test blog for PUT' ||
           blog.title === 'updated test blog for PUT')
  })

  for(const blog of toBeDeletedBlogs) {
    await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(204)
  }

  console.log('deleted blogs successfully')

  const blogsInTheEnd = await api.get('/api/blogs')

  console.log('#of blogs at start and in the end: ', initialBlogs.body.length, blogsInTheEnd.body.length)
  expect(initialBlogs.body.length > blogsInTheEnd.body.length)
})


afterAll(() => {
  mongoose.connection.close()
})