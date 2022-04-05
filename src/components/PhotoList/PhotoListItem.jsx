import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from 'reactstrap'
import { STORAGE_URL } from '../../utils/api_helper'

const PhotoListItem = ({ item, deleteHandler, selectHandler, shareActive }) => {
  return (
    <div
      className={`list_item ${
        shareActive && 'list_item_select'
      } d-flex justify-content-center`}
    >
      {shareActive && (
        <Input
          className="list_item_select_check"
          type="checkbox"
          onClick={() => selectHandler('selectedPhotos', item.id)}
        />
      )}
      <div>
        <img src={`${STORAGE_URL}${item.url}`} alt="Картинка" />
        <div className="list_item_btns">
          <div>
            Фотография <br />
            <span>{item.img_name}</span>
          </div>
          <Link to={`/photo/${item.id}`}>
            <Button color="primary">Редактировать</Button>
          </Link>
          <Button
            color="danger"
            onClick={() => deleteHandler(true, item.id, item.img_name)}
          >
            Удалить
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PhotoListItem
// "list_item list_item_select"
