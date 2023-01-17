import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async (user) => {
  const response = await axios.get(baseUrl)
  const ret = response.data.filter(x=>x.user.name === user.name)
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
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

export default { getAll, setToken, createBlog}