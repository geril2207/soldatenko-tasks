import React, { useEffect, useRef, useState } from 'react'
import { Col, Input, Row } from 'reactstrap'
import { useDebounceEffect } from '../../../../hooks/useDebounceEffect'
import { canvasPreview } from './canvasPreview'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const PhotoEdit = React.forwardRef(({ imgSrc }, ref) => {
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [scale, setScale] = useState(1)
  const imgRef = useRef(null)

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        ref.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, ref.current, completedCrop, scale)
      }
    },
    100,
    [completedCrop, scale]
  )
  function onImageLoad(e) {
    const { width, height } = e.currentTarget

    // if (!completedCrop) {
    setCompletedCrop({
      width: width / scale,
      height: height / scale,
      unit: 'px',
      x: 0,
      y: 0,
    })
    // }
  }

  return (
    <>
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
                  ref={ref}
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
  )
})

export default PhotoEdit
