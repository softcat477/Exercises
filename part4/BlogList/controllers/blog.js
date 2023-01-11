const router = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", {username:1, name:1, id:1})
  response.json(blogs)
})

// Add a new blog
router.post('/', async (request, response, next) => {
  const body = request.body

  // Find the user
  const user = await User.findById(body.user)

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