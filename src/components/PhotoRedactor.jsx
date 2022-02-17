import { Card } from "reactstrap";

export default function PhotoRedactor(props){
    
    return(
        <Card>
            <img className="photoPrevie" src={props.imageSrc}/>
        </Card>
    )
}