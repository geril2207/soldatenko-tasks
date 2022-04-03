import React from 'react'
import { Alert } from 'reactstrap'

const CustomAllert = ({ condition, type, message }) => {
  return (
    <>
      {condition && (
        <Alert
          className="message_wrapper"
          color={`${type === 'error' ? 'danger' : 'success'}`}
        >
          {message}
        </Alert>
      )}
    </>
  )
}

export default CustomAllert
