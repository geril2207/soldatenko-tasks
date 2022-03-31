import { useEffect, useRef, useState } from 'react'
import { Button, Card, Input, Label } from 'reactstrap'
import PhotoLoader from './PhotoLoader'
import PhotoRedactor from './PhotoRedactor'
import './PhotoOperations.css'
import { useMutation, useQueryClient } from 'react-query'
import { PhotoService } from '../../services/photo.service'
import { useParams } from 'react-router-dom'
import { usePhotoById } from '../../hooks/usePhotoById'
import { STORAGE_URL } from '../../utils/api_helper'

export default function PhotoOperations(props) {
  const [step, setStep] = useState('Load')
  const [imageSrc, setImageSrc] = useState('')
  const fileRef = useRef(null)
  const [imgFile, setImgFile] = useState(null)
  const [titleInput, setTitleInput] = useState('')
  const { id: imgId } = useParams()

  const { data: response, isLoading } = usePhotoById(imgId)
  console.log(response)
  useEffect(() => {
    if (response && !imageSrc) {
      setImageSrc(`${STORAGE_URL}${response.data.data.url}`)
      setTitleInput(response.data.data.img_name)
    }
  }, [response])

  let reader = new FileReader()

  function loadHandler(e) {
    setImgFile(e.target.files[0])
    reader.readAsDataURL(e.target.files[0])
  }
  reader.onload = (e) => {
    setImageSrc(e.target.result)
  }

  function sendPhotoHandler() {
    let formData = new FormData()
    if (imgId) {
      formData.append('photo', imageSrc)
      console.log(imageSrc)
      formData.append('name', titleInput)
      console.log(formData.get('name'))
      return PhotoService.updatePhoto(formData, imgId)
    }
    formData.append('photo', imgFile)
    return PhotoService.uploadPhoto(formData)
  }

  const mutation = useMutation(
    imgId ? 'edit photo' : 'add photo',
    sendPhotoHandler
  )

  console.log(imageSrc)

  return (
    <Card className="centredCard mt-4">
      <h4 className="mt-4">{imgId ? 'Изменение' : 'Добавление'} фотографии</h4>
      {step == 'Load' && !imgId && (
        <PhotoLoader fileRef={fileRef} loadHandler={loadHandler} />
      )}
      {imgId && (
        <div>
          <Label>Название картинки</Label>
          <Input
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </div>
      )}
      {isLoading && <div className="lds-dual-ring"></div>}
      {imageSrc && (
        <PhotoRedactor
          imageSrc={imageSrc}
          setImageSrc={setImageSrc}
          submitHandler={mutation.mutateAsync}
        />
      )}
    </Card>
  )
}
