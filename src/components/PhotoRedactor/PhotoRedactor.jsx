import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Col, Input, Row } from 'reactstrap'
import { useDebounceEffect } from '../../hooks/useDebounce'
import { canvasPreview } from './canvasPreview'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PhotoService } from '../../services/photo.service'
import { STORAGE_URL } from '../../utils/api_helper'
import { withRouter } from 'react-router-dom'

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
  const [imgSrc, setImgSrc] = useState(
    ''
    // 'http://127.0.0.1:8000/private/1648712641/1648712690.jfif'
  )
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const [imgTitle, setImgTitle] = useState('')
  const aspect = undefined
  const { id: imgId } = useParams()
  const queryClient = useQueryClient()
  const {
    data: response,
    isLoading,
    isError,
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
    if (response?.data?.data) {
      setImgSrc(`${STORAGE_URL}${response.data.data.url}`)
      setImgTitle(response.data.data.img_name)
    }
  }, [response])
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale
        )
      }
    },
    100,
    [completedCrop, scale]
  )

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result.toString() || '')
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e) {
    const { width, height } = e.currentTarget
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect))
    }
    if (!completedCrop) {
      setCompletedCrop({
        width: width / scale,
        height: height / scale,
        unit: 'px',
        x: 0,
        y: 0,
      })
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

  return (
    <div className="photored">
      <h2>Загрузка изображения на сервер</h2>
      {isLoading && <div className="lds-dual-ring"></div>}
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
          <div className="mt-3">
            <label htmlFor="scale-input">Масштаб: </label>
            <Input
              id="scale-input"
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={scale}
              disabled={!imgSrc}
              onChange={(e) => setScale(Number(e.target.value))}
            />
          </div>
          <div className="mt-4">
            <Row>
              <Col>
                <h3>Редактирование</h3>
              </Col>
              <Col>
                <h3>Предпросмотр</h3>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col>
                {Boolean(imgSrc) && (
                  <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                  >
                    <img
                      ref={imgRef}
                      crossOrigin="anonymous"
                      alt="Crop me"
                      src={imgSrc}
                      style={{
                        transform: `scale(${scale})`,
                        marginTop: '15px',
                      }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                )}
              </Col>
              <Col>
                <div className="">
                  {Boolean(completedCrop) && (
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        border: '1px solid black',
                        objectFit: 'contain',
                        marginTop: '15px',
                        width: completedCrop.width,
                        height: completedCrop.height,
                        // display: 'none',
                      }}
                    />
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </>
      )}
      <div>
        <Button
          className="photored__btn"
          color="primary"
          onClick={mutation.mutateAsync}
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default withRouter(PhotoRedactor)
