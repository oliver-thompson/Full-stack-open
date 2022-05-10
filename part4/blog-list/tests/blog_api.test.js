const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const blog = require('../models/blog')
const { del } = require('express/lib/application')


beforeEach( async () => { 
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('likes default to zero if missing', async () => {
  const newBlog = {
    title: "no likes?",
    author: "megamind",
    url: "https://www.google.com/",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length-1].likes).toBe(0)
})

test('blog is not created if title or url are missing', async () => {
  const newBlog = {
    author: "Jimmy Neutron",
    title: "blog",
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('successfully deletes a blog post', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  const deletedId = blogToDelete.id

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const blogIds = blogsAtEnd.map(b => b.id)
  expect(blogIds).not.toContain(deletedId)
})

test('successfully creates a new blog post', async () => {
  const newBlog = {
    title: "new blog!",
    author: "Jimmy Neutron",
    url: "https://www.youtube.com/",
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const blogTitles = blogsAtEnd.map(blog => blog.title)
  expect(blogTitles).toContain('new blog!')  
})

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
  expect(resultBlog.body).toEqual(processedBlogToView)
})

test('put request works to update a blog', async () => {
  const blogs = await api.get('/api/blogs')
  const blogToUpdate = blogs.body[0]

  const newBlog = {
    ...blogToUpdate,
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(blogToUpdate)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlog = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(updatedBlog.body.likes).toBe(10)  

})

afterAll(() => {
  mongoose.connection.close()
})