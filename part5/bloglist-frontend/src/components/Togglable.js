import { useState } from "react"

const Togglable = (props) => {
  /*
  Params:
    props.buttonLabel: text to show
  */
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible? "none": "" }
  const showWhenVisible = { display: visible? "": "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={ toggleVisibility } id="toggle-show">{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="togglable">
        {props.children}
        <button onClick={ toggleVisibility } id="toggle-hide">cancel</button>
      </div>
    </>
  )
}

export default Togglable