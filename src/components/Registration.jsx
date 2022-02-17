import './Registration.css'
import { Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button } from 'reactstrap'


export default function Registration() {


    return (
        <Card className='centredForm'>
            <CardHeader><h5>Регистрация</h5></CardHeader>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="name">Имя</Label>
                        <Input name='name' id='name' bsSize="lg" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Фамилия</Label>
                        <Input name='surname' id='surname' bsSize="lg" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="tel">Номер телефона</Label>
                        <Input name='tel' id='tel' bsSize="lg" type='tel' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Пароль</Label>
                        <Input name='password' id='password' bsSize="lg" type='password' />
                    </FormGroup>
                    <Button color="primary" size="lg">Зарегестрироваться</Button>

                </Form>
            </CardBody>
        </Card>
    )
}