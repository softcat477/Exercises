const router = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", {username:1, name:1, id:1})
  response.json(blogs)
})

// Add a new blog
router.post('/', async (request, response, next) => {
  const body = request.body

  // Find the user
  const user = await User.findById(request.userId)

  // Create a new blog and link to the userId
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  // Save blog
  const result =  await blog.save()

  // Update user's blog list
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

router.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  if (blog === null){
    return response.status(404).json({error: "id not found"})
  }

  // This is not a matched token, reject it
  if (blog.user.toString() !== request.userId) {
    return response.status(401).json({error: "token missing or invalid"})
  }

  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

router.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const blog = await Blog.findById(id)

  if (blog === null){
    return response.status(404).json({error: "id not found"})
  }

  // This is not a matched token, reject it
  if (blog.user.toString() !== request.userId) {
    return response.status(401).json({error: "token not matched"})
  }

  const updated_blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true, contect: "query" })
  response.status(201).json(updated_blog)
})

module.exports = router