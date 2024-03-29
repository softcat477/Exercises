import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button> 
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const avg = () => {
    if (good+bad+neutral === 0){
      return 0.0
    }
    return (good-bad)/(good+bad+neutral)
  }

  const positive = () => {
    if (good+bad+neutral === 0){
      return "0 %"
    }
    return ((good) / (good+bad+neutral) * 100).toString() + " %"
  }

  if (good+bad+neutral === 0){
    return (
      <>
        <h4>No feedback given</h4>
      </>
    )
  }

  return (
    <table>
      <tbody>
        <tr>
           <StatisticLine text="good" value={good} />
        </tr>
        <tr>
           <StatisticLine text="neutral" value={neutral} />
        </tr>
        <tr>
           <StatisticLine text="bad" value={bad} />
        </tr>
        <tr>
           <StatisticLine text="all" value={good+bad+neutral} />
        </tr>
        <tr>
           <StatisticLine text="average" value={avg()} />
        </tr>
        <tr>
           <StatisticLine text="positive" value={positive()} />
        </tr>
      </tbody>
    </table>
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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App