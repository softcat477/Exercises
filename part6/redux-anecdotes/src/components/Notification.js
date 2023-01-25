import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { clearNotificationAction } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearNotificationAction())
    }, 5000)
  }, [notification])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 11
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification