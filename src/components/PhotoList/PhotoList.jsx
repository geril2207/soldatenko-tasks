import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { PhotoService } from '../../services/photo.service'
import { API_URL, STORAGE_URL } from '../../utils/api_helper'

const PhotoList = () => {
  const {
    data: response,
    isError,
    isLoading,
  } = useQuery('get photos', () => PhotoService.getPhotos())
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
        {isLoading && <div className="lds-dual-ring"></div>}
        {response?.data?.self_photos.length === 0 &&
          !isLoading &&
          'Список фотографий пуст'}
        {response?.data?.self_photos &&
          response?.data?.self_photos.map((item, index) => (
            <div className="list_item" key={`${item.url}_${index}`}>
              <img src={`${STORAGE_URL}${item.url}`} alt="Картинка" />
              <div className="list_item_btns">
                <Link to={`/photo/${item.id}`}>
                  <Button color="primary">Редактировать</Button>
                </Link>
                <Button color="danger">Удалить</Button>
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
                <img src={`${STORAGE_URL}${item.url}`} />
                <div className="list_item_btns">
                  <Button color="primary">Редактировать</Button>
                  <Button color="danger">Удалить</Button>
                </div>
              </div>
            ))}
        </div>
      </div>
      {isError && <div>Ошибка загрузки</div>}
    </div>
  )
}

export default PhotoList
