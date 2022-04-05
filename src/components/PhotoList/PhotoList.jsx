import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { useMessageCondition } from '../../hooks/useMessageCondition'
import { PhotoService } from '../../services/photo.service'
import { API_URL, STORAGE_URL } from '../../utils/api_helper'
import PhotoDeleteModal from './PhotoDeleteModal'
import PhotoListItem from './PhotoListItem'
import PhotoSearchUserModal from './PhotoSearchUserModal'

const PhotoList = () => {
  const [messageCondition, setMessageCondition] = useMessageCondition()

  const [messageState, setMessageState] = useState({
    type: '',
    message: '',
  })

  const [selectPhoto, setSelectPhoto] = useState({
    isSelect: false,
    selectedPhotos: [],
    selectedUser: '',
  })

  const mutation = useMutation('share photos', sharePhotosHandler, {
    onSuccess() {
      alert('Успех')
    },
    onError() {
      alert('Ошибка')
    },
  })

  const selectAllHandler = (type, value = !selectPhoto.isSelect) => {
    if (type === 'isSelect') {
      if (selectPhoto.isSelect) {
        return setSelectPhoto((prevState) => ({
          ...prevState,
          selectedPhotos: [],
          isSelect: value,
        }))
      }
      return setSelectPhoto((prevState) => ({ ...prevState, isSelect: value }))
    }
    if (type === 'selectedPhotos') {
      const elementIndex = selectPhoto.selectedPhotos.indexOf(value)
      if (elementIndex === -1) {
        return setSelectPhoto((prevState) => {
          const newItems = [...prevState.selectedPhotos]
          newItems.push(value)
          return { ...prevState, selectedPhotos: newItems }
        })
      }
      return setSelectPhoto((prevState) => {
        let newItems = [...prevState.selectedPhotos]
        newItems = newItems.filter((item) => item !== value)
        return { ...prevState, selectedPhotos: newItems }
      })
    }
  }

  function sharePhotosHandler(userId) {
    return PhotoService.sharePhoto(userId, selectPhoto.selectedPhotos)
  }

  const [deleteModal, setDeleteModal] = useState({
    condition: false,
    title: null,
    id: -1,
  })
  const [userModal, setUserModal] = useState(false)
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
        <div className="d-flex align-items-stretch">
          <Button
            color={`${selectPhoto.isSelect ? 'danger' : 'primary'}`}
            className="d-flex justify-content-center align-items-center text-white me-3"
            onClick={() => selectAllHandler('isSelect')}
          >
            {selectPhoto.isSelect ? (
              'Отмена'
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"></path>
              </svg>
            )}
          </Button>
          {selectPhoto.isSelect && (
            <Button
              className="me-3"
              color="success"
              onClick={() => setUserModal(true)}
            >
              Поделиться
            </Button>
          )}

          <Link to={'/photo/'}>
            <Button color="primary">Добавить фотографию</Button>
          </Link>
        </div>
      </div>
      <div className="list__grid mt-3 justify-content-between">
        {(isLoading || isRefetching) && <div className="lds-dual-ring"></div>}
        {response?.data?.self_photos.length === 0 &&
          !isLoading &&
          'Список фотографий пуст'}
        {!isRefetching &&
          response?.data?.self_photos &&
          response?.data?.self_photos.map((item, index) => (
            <PhotoListItem
              key={`${item.url}_${index}`}
              item={item}
              shareActive={selectPhoto.isSelect}
              deleteHandler={selectDeleteHandler}
              selectHandler={selectAllHandler}
            />
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
      <PhotoSearchUserModal
        active={userModal}
        submitHandler={mutation.mutateAsync}
        closeHandler={() => setUserModal(false)}
      />
    </div>
  )
}

export default withRouter(PhotoList)
