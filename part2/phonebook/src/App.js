import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])
  

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchName))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} messageType={messageType}/>

      <Filter searchName={searchName} 
              setSearchName={setSearchName} 
              persons={persons}
      />

      <h2>add a new</h2>

      <PersonForm persons={persons} 
                  newName={newName} 
                  newNumber={newNumber} 
                  message={message}
                  messageType={messageType}
                  setPersons={setPersons} 
                  setNewName={setNewName} 
                  setNewNumber={setNewNumber}
                  setMessage={setMessage}
                  setMessageType={setMessageType}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
      
    </div>
  )
}

export default App