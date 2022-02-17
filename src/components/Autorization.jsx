import './Registration.css'
import { Card, CardBody, CardHeader, Form, FormGroup, Input, Label, Button } from 'reactstrap'


export default function Autorization() {


    return (
        <Card className='centredForm'>
            <CardHeader><h5>Авторизация</h5></CardHeader>
            <CardBody>
                <Form>
                    <FormGroup>
                        <Label for="tel">Номер телефона</Label>
                        <Input name='tel' id='tel' bsSize="lg" type='tel' />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Пароль</Label>
                        <Input name='password' id='password' bsSize="lg" type='password' />
                    </FormGroup>
                    <Button color="primary" size="lg">Войти</Button>

                </Form>
            </CardBody>
        </Card>
    )
}