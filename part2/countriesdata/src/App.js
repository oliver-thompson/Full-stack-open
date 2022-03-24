import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'

const Language = ({ language }) => {
  return (
    <li>{language}</li>
  )
}

const Languages = ({ country }) => {

  const languagesToShow = Object.values(country.languages)

  return (
    <div>
        {languagesToShow.map(language =>
          <Language key={language} language={language}/>)}
    </div>
  )
}

const Country = ({ country }) => {
    return (
      <div>
        {country.name.common}
        <button>
          show
        </button>
      </div>
      
    )
}

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length > 10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  
  if (countriesToShow.length === 1){

    let flag = countriesToShow[0].flags.png

    return(
      <div>

        <h2>
          <Country country={countriesToShow[0]}/>
        </h2>

        <div>capital {countriesToShow[0].capital}</div>
        <div>area {countriesToShow[0].area}</div>

        <h4>languages: </h4>
        <ul>
          <Languages country={countriesToShow[0]}/>
        </ul>

        <img src={flag} alt="flag" ></img>

      </div>
    )
  } 

  return (
      <div>
        {countriesToShow.map(country =>
          <Country key={country.name.official} country={country}/>
          )}
      </div>
    )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  const hook = () =>{
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(search))

  const handleSearchChange = (event) => {
    for (let i=0; i<countries.length; i++){
      if (countries[i].name.common.toLowerCase().includes(event.target.value)){
        console.log('match!')
        setSearch(event.target.value)
      }
    }
  }

  return (
    <div>

      <form>
        <div>
          find countries <input value={search} onChange={handleSearchChange}/>
        </div>
      </form>


      <div>
        <Countries countriesToShow={countriesToShow}/>
      </div>

    </div>    
  )
}

export default App;
