import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ value, text, unit }) => {
  return(
    <div>
      {text} {value}{unit}
    </div>
  )
}

const Statistics = (props) => {
  if (props.allClicks == 0){
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <h1>statistics</h1>

      <table>
        <tbody>
        <tr>
          <td><StatisticLine text='good'/></td>
          <td><StatisticLine value={props.good}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='neutral'/></td>
          <td><StatisticLine value={props.neutral}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='bad'/></td>
          <td><StatisticLine value={props.bad}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='all'/></td>
          <td><StatisticLine value={props.allClicks}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='average'/></td>
          <td><StatisticLine value={(props.good - props.bad) / props.allClicks}/></td>
        </tr>
        <tr>
          <td><StatisticLine text='positive'/></td>
          <td><StatisticLine value={props.good / props.allClicks * 100} unit='%'/></td>
        </tr>
        </tbody>
      </table>

      

    </div>

    

    
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)


  const handleGood = () => {
    setGood(good + 1)
    setAll(allClicks + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(allClicks + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(allClicks + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGood} text='good'/>
      <Button handleClick={handleNeutral} text='neutral'/>
      <Button handleClick={handleBad} text='bad'/>

      <Statistics allClicks={allClicks} good={good} neutral={neutral} bad={bad}/>


    </div>
  )
}

export default App
