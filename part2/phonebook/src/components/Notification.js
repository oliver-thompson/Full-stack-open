import React from 'react'

const Notification = ({ message, messageType }) => {
    if (message === null) {
      return null
    }

    if (messageType === 'add'){
        return (
            <div className='addMessage'>
                {message}
            </div>
        ) 
    }

    if (messageType === 'error'){
        return (
            <div className='error'>
                {message}
            </div>
        )
    }

    return null
    
  
  }

  export default Notification