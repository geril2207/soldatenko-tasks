import { useState } from "react"
import { Card } from "reactstrap"
import PhotoLoader from './PhotoLoader'
import PhotoRedactor from "./PhotoRedactor"
import './PhotoOperations.css'

export default function PhotoOperations(props){
    const [step, setStep] = useState('Load')
    const [imageSrc, setImageSrc] = useState(false)

    let reader = new FileReader();

    function loadHandler(e){
        reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = ((e)=>{
        setImageSrc(e.target.result)
    })


    return(
        <Card className="centredCard">
        {step == 'Load' && <PhotoLoader loadHandler={loadHandler} />}
        {imageSrc && <PhotoRedactor imageSrc={imageSrc}/>}
        </Card>
    )
}