import React from 'react'
import { Button } from 'reactstrap'

const PhotoList = () => {
  
  return (
    <div className="container">
      <div className="head d-flex justify-content-between mt-5">
        <div>
          <h4>Список фотографий</h4>
        </div>
        <div>
          <Button color="primary">Добавить фотографию</Button>
        </div>
      </div>
    </div>
  )
}

export default PhotoList
