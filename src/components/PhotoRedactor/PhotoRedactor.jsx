import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Input } from 'reactstrap'
import { useDebounceEffect } from '../../hooks/useDebounce'
import { canvasPreview } from './canvasPreview'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { imgPreview } from './imgPreview'
import { useMutation } from 'react-query'
import { PhotoService } from '../../services/photo.service'

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

const PhotoRedactor = () => {
  const [imgSrc, setImgSrc] = useState(
    'http://127.0.0.1:8000/private/1648712641/1648712690.jfif'
  )
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const aspect = undefined

  const { id: imgId } = useParams()

  async function saveHandler() {
    console.log(await imgPreview(imgRef.current, completedCrop))
  }
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
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }
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

  async function sendPhotoHandler() {
    let formData = new FormData()
    // if (imgId) {
    //   formData.append('photo', imageSrc)
    //   console.log(imageSrc)
    //   formData.append('name', titleInput)
    //   console.log(formData.get('name'))
    //   return PhotoService.updatePhoto(formData, imgId)
    // }
    const blob = await imgPreview(imgRef.current, completedCrop)
    console.log(blob)
    formData.append('photo', blob)
    return PhotoService.uploadPhoto(formData)
  }

  const mutation = useMutation(
    imgId ? 'edit photo' : 'add photo',
    sendPhotoHandler
  )

  return (
    <div className="App">
      <div>
        <Input type="file" accept="image/*" onChange={onSelectFile} />
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
      </div>
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
            style={{ transform: `scale(${scale})` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      <div>
        {Boolean(completedCrop) && (
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: completedCrop.width,
              height: completedCrop.height,
              display: 'none',
            }}
          />
        )}
      </div>
      <div>
        <Button onClick={mutation.mutateAsync}>Сохранить</Button>
      </div>
    </div>
  )
}

export default PhotoRedactor
