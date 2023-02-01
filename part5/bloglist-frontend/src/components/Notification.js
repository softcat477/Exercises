import { useSelector } from "react-redux"
const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === ""){
    return null
  }

  return (
    <div>
      <h3>{notification}</h3>
    </div>
  )
}

export default Notification