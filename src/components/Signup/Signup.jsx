import React, { useEffect, useState } from 'react'
import './Signup.css'
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
import { API_URL, axiosApi } from '../../utils/api_helper'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useMutation } from 'react-query'
import { UserService } from '../../services/user.service'
import { useMessageCondition } from '../../hooks/useMessageCondition'

export default function Signup() {
  const [form, setFormState] = useForm({
    phone: '',
    password: '',
    firstname: '',
    surname: '',
  })

  const [messageCondition, setMessageCondition] = useMessageCondition()

  const [messageState, setMessageState] = useState({
    type: '',
    message: '',
  })

  const mutation = useMutation(
    'create user',
    (user) => UserService.addUser(user),
    {
      onSuccess(response) {
        setMessageCondition(true)
        setMessageState({
          type: 'success',
          message: 'Пользователь успешно создан',
        })
      },
      onError(error) {
        console.log(error)
        setMessageCondition(true)
        setMessageState({
          type: 'error',
          message: 'Ошибка создания пользователя, попробуйте еще раз',
        })
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
          <h5>Регистрация</h5>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Label for="firstname">Имя</Label>
            <Input
              name="firstname"
              id="firstname"
              bsSize="lg"
              value={form.firstname}
              onChange={setFormState}
            />
          </FormGroup>
          <FormGroup>
            <Label for="surname">Фамилия</Label>
            <Input
              name="surname"
              id="surname"
              bsSize="lg"
              value={form.surname}
              onChange={setFormState}
            />
          </FormGroup>
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
            Есть аккаунт? <Link to={'/login'}>Войти</Link>
          </FormGroup>
          <Button color="primary" size="lg" onClick={handleSubmit}>
            Зарегестрироваться
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}
