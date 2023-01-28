import { useState } from "react"

const useField = (type, name) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }
  const onClear = () => {
    setValue("")
  }

  return {
    type,
    value,
    onChange,
    onClear,
    name
  }
}


export { useField }