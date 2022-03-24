import React from 'react'

const Filter = ({ persons, searchName, setSearchName }) => {
    const handleSearchChange = (event) => {
      for (let i=0; i<persons.length; i++){
        if (persons[i].name.toLowerCase().includes(event.target.value)){
          console.log('match!')
          setSearchName(event.target.value)
        }
      }
    }
  
    return(
      <form>
        <div>
            filter shown with <input onChange={handleSearchChange}/>
        </div>
      </form>
    )
  }

export default Filter