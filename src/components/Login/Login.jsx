import './Login.css'
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useMutation } from 'react-query'
import { UserService } from '../../services/user.service'
import { useMessageCondition } from '../../hooks/useMessageCondition'
import { useState } from 'react'

export default function Login() {
  const [form, setFormState] = useForm({
    phone: '',
    password: '',
  })
  const [messageCondition, setMessageCondition] = useMessageCondition()

  const [messageState, setMessageState] = useState({
    type: '',
    message: '',
  })

  const mutation = useMutation(
    'create user',
    (user) => UserService.login(user),
    {
      onSuccess(response) {
        localStorage.setItem('token', response.data.data.token)
        return (window.location = '/photoList')
      },
      onError(error) {
        setMessageState({ type: 'error', message: error.data.message })
        setMessageCondition(true)
      },
    }
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    mutation.mutateAsync(form)
  }
  return (
    <div className="center__wrapper">
      {messageCondition && (
        <Alert
          className="message_wrapper"
          color={`${messageState.type === 'error' ? 'danger' : 'success'}`}
        >
          {messageState.message}
        </Alert>
      )}
      <Card className="centredForm">
        <CardHeader>
          <h5>Авторизация</h5>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Label for="phone">Номер телефона</Label>
            <Input
              name="phone"
              id="phone"
              bsSize="lg"
              type="tel"
              value={form.phone}
              onChange={setFormState}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Пароль</Label>
            <Input
              name="password"
              id="password"
              bsSize="lg"
              type="password"
              value={form.password}
              onChange={setFormState}
            />
          </FormGroup>
          <FormGroup>
            Нету аккаунта? <Link to={'/signup'}>Зарегистрироваться</Link>
          </FormGroup>
          <Button color="primary" size="lg" onClick={handleSubmit}>
            Войти
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
