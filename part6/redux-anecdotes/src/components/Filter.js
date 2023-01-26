import { addFilterAction } from "../reducers/filterReducer"
import { connect } from "react-redux"

const Filter = (props) => {
  const handleChange = (event) => {
    props.addFilterAction(event.target.value)
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

const mapDispatchToProps = {
  addFilterAction
}

export default connect(null, mapDispatchToProps)(Filter)