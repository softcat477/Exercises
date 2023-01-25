import { useDispatch } from "react-redux"
import { addFilterAction } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(addFilterAction(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div stype={style}>
      filter: <input onChange={handleChange} />
    </div>
  )
}

export default Filter