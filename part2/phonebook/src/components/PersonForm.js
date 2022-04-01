import React from 'react'
import personService from '../services/persons'
import Notification from './Notification'

const PersonForm = ({ persons, newName, newNumber, message, setPersons, setNewName, setNewNumber, setMessage, setMessageType }) => {

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  
    const addPerson = (event) => {
      event.preventDefault()
      const personObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
  
      let sameName = false
      let shouldRemove = false
      let removeId = 0
      
  
      for (let i=0; i<persons.length; i++){
        if (persons[i].name === newName && persons[i].number === newNumber){
          window.alert(`${newName} is already added to phonebook`)
          sameName = true
        }
        
        if (persons[i].name === newName && persons[i].number !== newNumber){
          removeId = persons[i].id
          shouldRemove = window.confirm(`${newName} is already in the phone book. Replace the old number with the new one?`)
        }
      }
      
      if (shouldRemove){
        const person = persons.find(p => p.id === removeId)
        const changedPerson = {...person, number: newNumber }

        personService
          .update(removeId, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== removeId ? person : returnedPerson))
          })
          .catch(error => {
            setMessage(`Information of ${newName} has already been removed from the server`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
            }, 50000)
          })
      }          
  
      if (!sameName && !shouldRemove){
        {/*setPersons(persons.concat(personObj))*/}
        personService
          .create(personObj)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('') 
            setMessage(`Added ${returnedPerson.name}`)
            setMessageType('add')
          })
          .catch(error => {
            console.log('error response data', error.response.data)
            setMessage(error.response.data.error)
            setMessageType('error')
          })
            
      }
    }
  
  
    return (
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                value={newName}
                onChange={handleNameChange}/>
        </div>
        <div>
          number: <input
                  value={newNumber}
                  onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        
      </form>
    )
  }

export default PersonForm