import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"

import LoginForm from "./components/LoginForm"
import loginService from "./services/login"

import CreateBlog from "./components/CreateBlog"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"

import BlogDetail from "./components/BlogDetail"

import { useDispatch } from "react-redux"
import { setNotificationAction, clearNotificationAction } from "./reducers/notificationReducer"

const App = () => {
  const dispatch = useDispatch()
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const updateBlogs = (blogs) => {
    let sort_blogs = [...blogs]
    sort_blogs = sort_blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sort_blogs)
  }

  useEffect(() => {
    // https://devtrium.com/posts/async-functions-useeffect
    const fetchBlogs = async () => {
      if (user !== null) {
        const blogs = await blogService.getAll(user)
        updateBlogs(blogs)
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
      const user = await loginService.login({ username: username, pwd: password })
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
      dispatch(setNotificationAction("Wrong Credential"))
      setTimeout(() => {
        dispatch(clearNotificationAction())
      }, 5000)
    }
  }

  const createBlogOnServer = async (newBlog) => {
    const returnedBlog = await blogService.createBlog(newBlog)
    updateBlogs(blogs.concat(returnedBlog))

    dispatch(setNotificationAction(`a new blog ${returnedBlog.title} by ${returnedBlog.author} is added`))
    setTimeout(() => {
      dispatch(clearNotificationAction())
    }, 5000)
  }

  const likeBlog = async (blog) => {
    // send PUT to server
    await blogService.likeBlog({
      title:blog.title,
      author:blog.author,
      url:blog.url,
      likes:blog.likes+1,
      user:blog.user.id
    }, blog.id)

    // Update likes
    let tmp = [...blogs]
    tmp.find(x => x.id===blog.id).likes=blog.likes+1
    updateBlogs(tmp)
  }

  const deleteBlog = async (blog) => {
    if (window.confirm (`Remove blog ${blog.title} by ${blog.author}`)) {
      // send DELETE to server
      await blogService.deleteBlog(blog.id)

      // Update blogs
      let tmp = blogs.filter(x => x.id !== blog.id)
      updateBlogs(tmp)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <>

      <h2>blogs</h2>

      <Notification key="notification" />

      {user===null && LoginForm(handleLogin,
        username, setUsername,
        password, setPassword)}

      { user !== null &&
          <div>
            <p>
              {user.name} logged in <button onClick={handleLogout} id="logout-button">logout</button>
            </p>

            <h3>create new</h3>
            <Togglable key="tg-createBlog" buttonLabel="new note">
              <CreateBlog key="createBlog" createBlogOnServer={createBlogOnServer} />
            </Togglable>

            {blogs.map(blog => {
              return (
                <div key={`div-${blog.id}`}>
                  <Blog key={blog.id} blog={blog} />
                  <Togglable key={`tg-${blog.id}`} buttonLabel="view">
                    <BlogDetail key={`bd-${blog.id}`} title={blog.title}
                      author={blog.author}
                      likes={blog.likes}
                      url={blog.url}
                      blog={blog}
                      likeBlog={likeBlog}
                      deleteBlog={deleteBlog}/>
                  </Togglable>
                </div>
              )}
            )}
          </div>
      }

    </>
  )
}

export default App
