import { Button, Card, Input } from 'reactstrap'

export default function PhotoOperations(props) {
  return (
    <>
      <Input
        ref={props.fileRef}
        onChange={props.loadHandler}
        type="file"
        className="mt-3"
      />
    </>
  )
}
