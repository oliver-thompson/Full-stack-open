import React from 'react'
import personService from '../services/persons'


const Person = ({ person }) => {

    const handleRemove = (event) => {
      const confirmRemove = window.confirm(`Delete ${person.name}?`)
      console.log(confirmRemove)
      if (confirmRemove){
        personService
        .remove(person.id)
        .then(window.location.reload(true))
      }
      
    }

    return (
      <div>{person.name} {person.number} 
          <button onClick={handleRemove}>delete</button>
      </div>
      
    )
}

const Persons = ({ personsToShow }) => {
    return (
      <div>
          {personsToShow.map(person => 
            <Person key={person.id} person={person} />
          )}
      </div>
    )
}

export default Persons