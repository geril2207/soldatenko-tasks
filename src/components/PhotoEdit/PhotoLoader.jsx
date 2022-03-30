import { Button, Card, Input } from 'reactstrap'

export default function PhotoOperations(props) {
  function fileSend() {
    fetch('https://bincol.ru/', {
      method: 'POST',
      headers: {
        'Content-Type': 'FormData',
      },
    }).then((data) => console.log(data))
  }

  return (
    <>
      <Input ref={props.fileRef} onChange={props.loadHandler} type="file" />
      <Button onClick={fileSend}>Send</Button>
    </>
  )
}
