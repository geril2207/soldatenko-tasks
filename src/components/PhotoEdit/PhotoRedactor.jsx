import { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Card, Input, Label } from 'reactstrap'
import InputModal from '../Modal/Modal'
import './PhotoRedactor.css'
import crop from '../../utils/crop'

export default function PhotoRedactor(props) {
  const canvasRef = useRef(null)
  const imgRef = useRef(null)

  const [isAlreadyCroup, setIsAlreadyCrop] = useState(false)
  const [isCrop, setIsCrop] = useState(false)

  const [isOpenMoadl, setIsOpenMoadl] = useState(false)

  const [cropWidth, setCropWidth] = useState()
  const [cropHeight, setCropHeight] = useState()

  const [maxHeight, setMaxHeight] = useState()
  const [maxWidth, setMaxWidth] = useState()

  function setCrop() {
    setIsAlreadyCrop(true)
    crop(props.imageSrc, canvasRef, cropWidth, cropHeight)
  }

  function onChangeRange(e) {
    switch (e.target.name) {
      case 'width':
        setCropWidth(e.target.value)
        break
      case 'height':
        setCropHeight(e.target.value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    setMaxWidth(imgRef.current.clientWidth)
    setMaxHeight(imgRef.current.clientHeight)
    setCropHeight(imgRef.current.clientHeight)
    setCropWidth(imgRef.current.clientWidth)
  }, [])

  return (
    <>
      <Card>
        <div className="redactorSpace">
          {isAlreadyCroup && (
            <canvas className="photoPrevie" ref={canvasRef}></canvas>
          )}
          {!isAlreadyCroup && <img ref={imgRef} src={props.imageSrc} alt="" />}
          {isCrop && (
            <div className="vuel">
              <div
                style={{ width: cropWidth + 'px', height: cropHeight + 'px' }}
                className="crop"
              ></div>
            </div>
          )}
        </div>
        <ButtonGroup>
          <Button>Add</Button>
          <Button>Rename</Button>
          <Button
            onClick={
              isCrop
                ? () => {
                    setCrop()
                    setIsCrop(false)
                  }
                : () => setIsCrop(true)
            }
          >
            Crop
          </Button>
        </ButtonGroup>
        {isCrop && (
          <div>
            <Label for="width">Ширина</Label>
            <Input
              id="width"
              name="width"
              type="range"
              onChange={onChangeRange}
              value={cropWidth}
              max={maxWidth}
            />
            <Label for="height">Высота</Label>
            <Input
              id="height"
              name="height"
              type="range"
              onChange={onChangeRange}
              value={cropHeight}
              max={maxHeight}
            />
          </div>
        )}
        {isOpenMoadl && <InputModal text="Переименовать" />}
      </Card>
    </>
  )
}
