import { useState } from 'react'

export const useForm = (initState) => {
  const [formState, setFormState] = useState(initState)
  function setFormStateHandler(e) {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  return [formState, setFormStateHandler]
}
