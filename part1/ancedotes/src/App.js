import { useState } from 'react'

const Button = ({text, callback}) => {
  return (
    <button onClick={callback}>
      {text}
    </button>
  )
}

const ShowAnecdote = ({anecdotes, scores, selected}) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      has {scores[selected]} votes.
      <br />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [scores, setScores] = useState(Array(anecdotes.length).fill(0))

  const randomSelect = () => {
    let random_idx = Math.floor(Math.random() * anecdotes.length)
    if (random_idx === anecdotes.length){
      setSelected(random_idx - 1)
    }
    else{
      setSelected(random_idx)
    }
  }

  const vote = () => {
    const new_scores = [...scores]
    new_scores[selected] += 1
    setScores(new_scores)
    setBestScore(new_scores.indexOf(Math.max(...new_scores)))
  }

  return (
    <div>
      <ShowAnecdote anecdotes={anecdotes} scores={scores} selected={selected} />
      <Button text="vote" callback={vote} />
      <Button text="next anecdote" callback={randomSelect} />
      <ShowAnecdote anecdotes={anecdotes} scores={scores} selected={bestScore} />
    </div>
  )
}

export default App