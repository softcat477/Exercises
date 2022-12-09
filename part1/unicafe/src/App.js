import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button> 
  )
}

const Feedback = ({text, score}) => {
  return (
    <div>
      {text} {score}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickFactory = (state, setState) => {
    return () => {
      setState(state+1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={clickFactory(good, setGood)} text="good" />
      <Button onClick={clickFactory(neutral, setNeutral)} text="neutral" />
      <Button onClick={clickFactory(bad, setBad)} text="bad" />
      <h2>statistics</h2>
      <Feedback text="good" score={good} />
      <Feedback text="neutral" score={neutral} />
      <Feedback text="bad" score={bad} />
    </div>
  )
}

export default App