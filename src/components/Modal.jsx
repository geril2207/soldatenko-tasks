import { Button, Input, Modal } from "reactstrap";
export default function InputModal({text, onClose, onSubmit}){

    return (<Modal>
        <h3>{text}</h3>
        <Input></Input>
        <Button type="succes">OK</Button>
        <Button>Close</Button>
    </Modal>)
} 