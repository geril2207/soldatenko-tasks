import { useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Card, Input, Label } from "reactstrap";
import './PhotoRedactor.css'
import crop from "../utils/crop";

export default function PhotoRedactor(props) {
    const canvasRef = useRef(null)
    const cropRef = useRef(null)
    const vuelRef = useRef(null)

    const [imageSrc, setImageSrc] = useState(props.imageSrc)
    const [isCrop, setIsCrop] = useState(false)
    const [cropWidth, setCropWidth] = useState(100)
    const [cropHeight, setCropHeight] = useState(100)

    const [maxHeight, setMaxHeight] = useState(100)
    const [maxWidth, setMaxWidth] = useState(100)

    function setCrop(cropCof = cropWidth / cropHeight){
        console.log(cropCof)
        crop(imageSrc, canvasRef, cropWidth, cropHeight).then((data) => {
            setMaxWidth(canvasRef.current.width)
            setMaxHeight(canvasRef.current.height)
            setCropHeight(canvasRef.current.height)
            setCropWidth(canvasRef.current.width)
        })
    }

    function onChangeRange(e) {
        switch (e.target.name) {
            case 'width':
                setCropWidth(e.target.value)
                break;
            case 'height':
                setCropHeight(e.target.value)
                break;
            default:
                break;
        }
    }



    useEffect(() => {
        setCrop(1)
    }, [])

    return (
        <>
            <Card>
                <div className="redactorSpace">
                    <canvas className="photoPrevie" ref={canvasRef}></canvas>
                    {isCrop && <div className="vuel" ref={vuelRef}>
                        <div ref={cropRef} style={{ width: cropWidth + 'px', height: cropHeight + 'px' }} className="crop"></div>
                    </div>}
                </div>

                <ButtonGroup>

                    <Button>Add</Button>
                    <Button>Remove</Button>
                    <Button onClick={isCrop ? () =>{setCrop();setIsCrop(false)} : () => setIsCrop(true)}>Crop</Button>

                </ButtonGroup>
                {isCrop && <div>
                    <Label for="width">
                        Ширина
                    </Label>
                    <Input
                        id="width"
                        name="width"
                        type="range"
                        onChange={onChangeRange}
                        value={cropWidth}
                        max={maxWidth}
                    />
                    <Label for="height">
                        Высота
                    </Label>
                    <Input
                        id="height"
                        name="height"
                        type="range"
                        onChange={onChangeRange}
                        value={cropHeight}
                        max={maxHeight}
                    />
                </div>}
            </Card>
        </>
    )
}

