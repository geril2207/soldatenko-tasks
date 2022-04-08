import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Label } from 'reactstrap'
import { STORAGE_URL } from '../../utils/api_helper'

const PhotoListItem = ({ item, deleteHandler, selectHandler, shareActive }) => {
  return (
    <div
      className={`list_item ${
        shareActive && 'list_item_select'
      } d-flex justify-content-center w-100`}
    >
      <Label className="w-100 h-100" for={`list_item_${item.id}`}>
        {shareActive && (
          <Input
            className="list_item_select_check"
            type="checkbox"
            id={`list_item_${item.id}`}
            onClick={() => selectHandler('selectedPhotos', item.id)}
          />
        )}
        <div className="w-100">
          <img
            className="list__item_img"
            src={`${STORAGE_URL}${item.url}`}
            alt="Картинка"
          />
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
      </Label>
    </div>
  )
}

export default PhotoListItem
// "list_item list_item_select"
