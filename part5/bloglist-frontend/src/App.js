import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import loginService from "./services/login"

import CreateBlog from "./components/CreateBlog"
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [message, setMessage] = useState("")

  useEffect(() => {
    // https://devtrium.com/posts/async-functions-useeffect
    const fetchBlogs = async () => {
      if (user !== null) {
        const blogs = await blogService.getAll(user)
        setBlogs(blogs)
      }
    }

    fetchBlogs().catch(console.error)
  }, [user])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      // login and get the token
      const user = await loginService.login({username: username, pwd: password})
      // Save to window.localStorage
      window.localStorage.setItem(
        "loggedUser", JSON.stringify(user)
      )
      // Set token in blog service
      blogService.setToken(user.token)
      // setUser
      setUser(user)
      // reset username
      setUsername("")
      // reset password
      setPassword("")
    }
    catch (exception) {
      console.error("Wrong Credentials")
      setMessage("Wrong Credential")
      setTimeout(() => {
        setMessage("")
      }, 5000)
    }
  }

  const createBlogOnServer = async (newBlog) => {
    const returnedBlog = await blogService.createBlog(newBlog)
    setBlogs(blogs.concat(returnedBlog))

    setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} is added`)
    setTimeout(() => {
      setMessage("")
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <>

    <h2>blogs</h2>

    <Notification message={message} />

    {user===null && LoginForm(handleLogin,
      username, setUsername,
      password, setPassword)}

    { user !== null && 
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <h3>create new</h3>
        <Togglable buttonLabel="new note">
          <CreateBlog createBlogOnServer={createBlogOnServer} />
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
    
    </>
  )
}

export default App
