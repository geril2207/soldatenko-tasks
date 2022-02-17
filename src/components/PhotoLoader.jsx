import { Card, Input } from "reactstrap";

export default function PhotoOperations(props){

    return(
  
            <Input onChange={props.loadHandler} type="file"/>
   
    )
}