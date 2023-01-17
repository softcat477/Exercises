import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import LoginForm from './components/LoginForm'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <>

    <h2>blogs</h2>

    {user===null && LoginForm(handleLogin,
      username, setUsername,
      password, setPassword)}
    
    { user !== null && 
      <div>
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
    
    </>
  )
}

export default App
