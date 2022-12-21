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

router.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const updated_blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true, contect: "query" })
  response.status(201).json(updated_blog)

  //const body = request.body
  //const note = {
  //    content:body.content,
  //    important: body.important
  //}

  //Note.findByIdAndUpdate(request.params.id, note, { new: true, runValidators: true, contect: "query" } )
  //    .then(updatedNote => {
  //        response.json(updatedNote)
  //    })
  //    .catch(error => next(error))

})

module.exports = router