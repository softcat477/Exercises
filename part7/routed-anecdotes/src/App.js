import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link, useParams, useMatch, useNavigate} from "react-router-dom"
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  // return (
  //   <div>
  //     <a href='#' style={padding}>anecdotes</a>
  //     <a href='#' style={padding}>create new</a>
  //     <a href='#' style={padding}>about</a>
  //   </div>
  // )
  return (
    <div>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/create-new">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} > <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link> </li>)}
    </ul>
  </div>
)

const Anecdote = ({anecdote}) => {
  return (
    <>
    <h3>
    {anecdote.content}
    </h3>
    by {anecdote.author} has {anecdote.votes} votes.
    </>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Notification = ({message}) => {
  if (message === ""){
    return null
  }
  else{
    return (
      <h4>{message}</h4>
    )
  }
}

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const content = useField('text', 'content')
  const author = useField('text', 'author')
  const info = useField('text', 'info')

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/anecdotes')
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    props.setNotification(`Create ${content.value} by ${author.value}`)
    setTimeout(() => {
      props.setNotification('')
    }, 2500)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const Home = () => {
  return (
    <>
      <h2>Hoi!</h2>
    </>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(n => n.id === Number(match.params.id)) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />

      <Notification message={notification} />

      <Routes>
        <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/create-new" element={<CreateNew addNew={addNew} setNotification={setNotification}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Home />} />
      </Routes>
      
      <Footer />
    </div>
  )
}

export default App