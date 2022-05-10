const Notification = ({ message, messageType }) => {
  if (message === null){
    return null
  }

  if (messageType === 'error'){
    return (
      <div className="error">
        {message}
      </div>
    )
  }

  if (messageType === 'add'){
    return (
      <div className="add">
        {message}
      </div>
    )
  }

  return null
  
}

export default Notification