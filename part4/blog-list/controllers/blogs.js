const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

  
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 } )
  response.json(blogs)
})
  
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    if (blog){
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const userObj = await User.findById(decodedToken.id)

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: userObj,
    likes: body.likes,
  })

  const savedBlog = await blog.save()

  userObj.blogs = userObj.blogs.concat(savedBlog._id)
  await userObj.save()

  response.status(201).json(savedBlog)
})
  
blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const userObj = await User.findById(decodedToken.id)
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() === userObj.id.toString()){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'invalid user' })
  }
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new : true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter