import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Col, Input, Row } from 'reactstrap'
import { useDebounceEffect } from '../../hooks/useDebounce'
import { canvasPreview } from './components/PhotoEdit/canvasPreview'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PhotoService } from '../../services/photo.service'
import { STORAGE_URL } from '../../utils/api_helper'
import { withRouter } from 'react-router-dom'
import PhotoEdit from './components/PhotoEdit/PhotoEdit'

// const PhotoRedactor = () => {
//   const [imgFile, setImgFile] = useState(null)
//   console.log(imgFile)
//   const { id: imgId } = useParams()
//   return (
//     <div className="photo_editor mt-4">
//       <h3>{`${imgId ? 'Изменение' : 'Добавление'} фотографии`}</h3>
//       <Input type="file" onChange={(e) => setImgFile(e.target.files[0])} />
//     </div>
//   )
// }

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

const PhotoRedactor = ({ history }) => {
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef(null)
  const [imgTitle, setImgTitle] = useState('')
  const { id: imgId } = useParams()
  const queryClient = useQueryClient()
  const {
    data: response,
    isLoading,
    isError,
    isRefetching,
  } = useQuery(['photo', +imgId], () => PhotoService.getPhotoById(imgId), {
    enabled: !!imgId,
  })
  const mutation = useMutation(
    imgId ? 'edit photo' : 'add photo',
    sendPhotoHandler,
    {
      onSuccess: (newPhoto) => {
        queryClient.setQueryData(['photo', +imgId], newPhoto)
        queryClient.invalidateQueries('get photos')
        return history.push('/photoList')
      },
    }
  )

  useEffect(() => {
    if (response?.data?.data && imgId) {
      setImgSrc(`${STORAGE_URL}${response.data.data.url}`)
      setImgTitle(response.data.data.img_name)
    }
  }, [imgId, response])

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || '')
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  async function sendPhotoHandler() {
    let formData = new FormData()
    const blob = await new Promise((resolve) =>
      previewCanvasRef.current.toBlob((blob) => resolve(blob))
    ).then((blob) => blob)

    if (imgId) {
      formData.append('photo', blob)
      formData.append('name', imgTitle)
      return PhotoService.updatePhoto(formData, imgId)
    }
    formData.append('photo', blob)
    return PhotoService.uploadPhoto(formData)
  }

  if (isLoading || isRefetching) {
    return (
      <div className="photored">
        <h2>{imgId ? 'Редактирование' : 'Загрузка'} изображения</h2>
        <div className="lds-dual-ring loader mt-4"></div>
      </div>
    )
  }
  return (
    <div className="photored">
      <h2>{imgId ? 'Редактирование' : 'Загрузка'} изображения</h2>

      {isError && <div>Ошибка загрузки. Попробуйте перезагрузить страницу</div>}
      {!imgId && (
        <Input
          className="mt-3"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
        />
      )}
      {!isLoading && (
        <>
          {imgId && (
            <div className="photored__img_title_wrap">
              <div className="photored__img_title">Название изображения</div>
              <Input
                type="text"
                value={imgTitle}
                onChange={(e) => setImgTitle(e.target.value)}
              />
            </div>
          )}

          <PhotoEdit imgSrc={imgSrc} ref={previewCanvasRef} />
        </>
      )}
      <div>
        <Button
          className="photored__btn"
          color="primary"
          disabled={!imgSrc}
          onClick={mutation.mutateAsync}
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default withRouter(PhotoRedactor)
