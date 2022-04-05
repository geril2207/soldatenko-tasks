import React from 'react'
import { Button, Card, CardBody, Modal } from 'reactstrap'

const PhotoDeleteModal = ({
  condition,
  title,
  closeHandler,
  deleteHandler,
}) => {
  return (
    <Modal centered={true} isOpen={condition} toggle={() => closeHandler()}>
      <Card className="p-3">
        <CardBody>
          <div className="text-center delete_modal_title ">
            Удалить фотографию <br /> <span>{title}</span>
          </div>
          <div className="d-flex flex-column mt-3 delete__modal_btns">
            <Button color="primary" onClick={() => deleteHandler()}>
              Подтвердить
            </Button>
            <Button
              className="mt-2"
              color="secondary"
              onClick={() => closeHandler()}
            >
              Отмена
            </Button>
          </div>
        </CardBody>
      </Card>
    </Modal>
  )
}

export default PhotoDeleteModal
