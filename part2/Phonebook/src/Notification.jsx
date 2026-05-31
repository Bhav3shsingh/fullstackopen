const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div style={{border:'2px solid darkgreen'},{color:'darkgreen'},{backgroundColor:'lightGreen'}} className="error">
      {message}
    </div>
  )
}

export default Notification
