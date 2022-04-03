import React from 'react'
import { Button, Modal } from 'reactstrap'

const PhotoDeleteModal = ({
  condition,
  title,
  closeHandler,
  deleteHandler,
}) => {
  return (
    <Modal centered={true} isOpen={condition} toggle={() => closeHandler()}>
      <div className="text-center delete_modal_title mt-3">
        Удалить фотографию <br /> <span>{title}</span>
      </div>
      <div className="d-flex flex-column mt-3 delete__modal_btns">
        <Button color="primary" onClick={() => deleteHandler()}>
          Подтвердить
        </Button>
        <Button color="secondary" onClick={() => closeHandler()}>
          Отмена
        </Button>
      </div>
    </Modal>
  )
}

export default PhotoDeleteModal
