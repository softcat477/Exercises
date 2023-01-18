import axios from "axios"
const baseUrl = "/api/blogs"

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async (user) => {
  const response = await axios.get(baseUrl)
  const ret = response.data.filter(x => x.user.name === user.name)
  return ret
}

const createBlog = async (newBlog) => {
  /*
    Params:
      newBlog.title
      newBlog.author
      newBlog.url
  */
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const likeBlog = async (blog, blog_id) => {
  /*
    Params:
      blog.title: str
      blog.author: str
      blog.url: str
      blog.likes: Update this term
      blog.user: userid
  */
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${blog_id}`, blog, config)
  return response.data
}

const deleteBlog = async (blog_id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blog_id}`, config)
  return response.data
}

export default { getAll, setToken, createBlog, likeBlog, deleteBlog }