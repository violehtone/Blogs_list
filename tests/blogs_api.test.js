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
    author: 'great duded',
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
})

afterAll(() => {
  mongoose.connection.close()
})

/*Test that the unique identifier property of blogs is
  named 'id' (by default it is '_id')
*/