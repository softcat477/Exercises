const router = require("express").Router()
const Blog = require("../models/blog")

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

router.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  const result =  await blog.save()
  response.status(201).json(result)
})

router.delete('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

module.exports = router