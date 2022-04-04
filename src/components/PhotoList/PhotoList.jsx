import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { useMessageCondition } from '../../hooks/useMessageCondition'
import { PhotoService } from '../../services/photo.service'
import { API_URL, STORAGE_URL } from '../../utils/api_helper'
import PhotoDeleteModal from './PhotoDeleteModal'

const PhotoList = () => {
  const [messageCondition, setMessageCondition] = useMessageCondition()

  const [messageState, setMessageState] = useState({
    type: '',
    message: '',
  })
  const [deleteModal, setDeleteModal] = useState({
    condition: false,
    title: null,
    id: -1,
  })
  const queryClient = useQueryClient()
  const {
    data: response,
    isError,
    isLoading,
    isRefetching,
  } = useQuery('photos', () => PhotoService.getPhotos())
  const { mutateAsync } = useMutation(
    'delete photo',
    () => PhotoService.deletePhoto(deleteModal.id),
    {
      onSuccess() {
        selectDeleteHandler()
        queryClient.invalidateQueries('photos')
      },
    }
  )

  useEffect(() => {
    if (response?.data.self_photos.length !== 0) {
      response?.data.self_photos.forEach((item) => {
        queryClient.setQueryData(['photo', item.id], item)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response?.data?.self_photos])
  function selectDeleteHandler(condition = false, id = -1, title = null) {
    setDeleteModal({
      title,
      id,
      condition,
    })
  }

  if (isLoading || isRefetching) {
    return <div className="lds-dual-ring loader"></div>
  }

  return (
    <div className="container">
      <div className="head d-flex justify-content-between mt-5">
        <div>
          <h4>Список фотографий</h4>
        </div>
        <Link to={'/photo/'}>
          <Button color="primary">Добавить фотографию</Button>
        </Link>
      </div>
      <div className="list__grid mt-3">
        {(isLoading || isRefetching) && <div className="lds-dual-ring"></div>}
        {response?.data?.self_photos.length === 0 &&
          !isLoading &&
          'Список фотографий пуст'}
        {!isRefetching &&
          response?.data?.self_photos &&
          response?.data?.self_photos.map((item, index) => (
            <div className="list_item" key={`${item.url}_${index}`}>
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
                  onClick={() =>
                    selectDeleteHandler(true, item.id, item.img_name)
                  }
                >
                  Удалить
                </Button>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4">
        <h4 className="text-start">С вами поделились</h4>
        <div className="list__grid mt-3">
          {response?.data?.shared_photos.length === 0 &&
            !isLoading &&
            'Пока что с вами никто не поделился фотографиями'}
          {response?.data?.shared_photos &&
            response?.data?.shared_photos.map((item, index) => (
              <div className="list_item" key={`${item.url}_${index}`}>
                <img src={`${STORAGE_URL}${item.url}`} alt="Картинка" />
                <div className="list_item_btns">
                  <Button color="primary">Редактировать</Button>
                  <Button color="danger">Удалить</Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isError && <div>Ошибка загрузки</div>}
      <PhotoDeleteModal
        condition={deleteModal.condition}
        title={deleteModal.title}
        closeHandler={selectDeleteHandler}
        deleteHandler={mutateAsync}
      />
    </div>
  )
}

export default withRouter(PhotoList)
