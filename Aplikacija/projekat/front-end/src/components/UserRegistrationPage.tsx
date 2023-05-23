import React from 'react';
import { Container, Col, Card, Form, Button, Alert, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
//import api, { ApiResponse } from '../../api/api';
//import RoledMainMenu from '../RoledMainMenu/RoledMainMenu';
import { Formik } from 'formik';
//import { validationSchema } from '../User/user.registration.dto';
import axios from 'axios';
import { validationSchema } from '../dtos/User/user.registration.dto';

export {};

interface UserRegistrationPageState {
    formData: {
        username: string;
        email: string;
        ime: string;
        prezime: string;
        password: string;
    };

    message?: string;

    isRegistrationComplete: boolean;
}

export class UserRegistrationPage extends React.Component {
    state: UserRegistrationPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isRegistrationComplete: false,
            formData: {
                username: '',
                email: '',
                ime: '',
                prezime: '',
                password: '',
                
            },
        };
    }

    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newFormData = Object.assign(this.state.formData, {
            [ event.target.id ]: event.target.value,
        });

        const newState = Object.assign(this.state, {
            formData: newFormData,
        });

        this.setState(newState);
    }

    render() {
        return (
            <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                ime: '',
                prezime: '',
            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                // Ovde možete izvršiti akciju sa vrednostima forme nakon uspešne validacije
                console.log(values);
            }}>
            <Container>
                {/* <RoledMainMenu role="visitor" /> */}

                <Col md={ { span: 8, offset: 2 } }>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <FontAwesomeIcon icon={ faUserPlus } /> User Registration
                            </Card.Title>
                            {
                                (this.state.isRegistrationComplete === false) ?
                                this.renderForm() : 
                                this.renderRegistrationCompleteMessage()
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
            </Formik>
        );
    }

    private renderForm() {
        return (
            <>
                <Form>
                    <Row>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="username">Username:</Form.Label>
                                <Form.Control type="username" id="username"
                                            value={ this.state.formData.username }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>

                        <Col md="6">
                            <Form.Group>
                            <Form.Label htmlFor="email">E-mail:</Form.Label>
                                <Form.Control type="email" id="email"
                                            value={ this.state.formData.email }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="ime">Forename:</Form.Label>
                                <Form.Control type="text" id="ime"
                                            value={ this.state.formData.ime }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>

                        <Col md="6">
                            <Form.Group>
                                <Form.Label htmlFor="prezime">Surname:</Form.Label>
                                <Form.Control type="text" id="prezime"
                                            value={ this.state.formData.prezime }
                                            onChange={ event => this.formInputChanged(event as any) } />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group>
                        <Form.Label htmlFor="Password">Password:</Form.Label>
                        <Form.Control type="password" id="password"
                                      value={ this.state.formData.password }
                                      onChange={ event => this.formInputChanged(event as any) } />
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary"
                                onClick={ () => this.doRegister() }>
                            Register
                        </Button>
                    </Form.Group>
                </Form>
                <Alert variant="danger"
                        className={ this.state.message ? '' : 'd-none' }>
                    { this.state.message }
                </Alert>
            </>
        );
    }

    private renderRegistrationCompleteMessage() {
        return (
            <p>
                The account has been registered.<br />
                <Link to="/user/login">Click here </Link>to go to the login page.
            </p>
        );
    }

    private doRegister() {
        const data = {
            username: this.state.formData?.username,
            email: this.state.formData?.email,
            ime: this.state.formData?.ime,
            prezime: this.state.formData?.prezime,
            password: this.state.formData?.password,
        };


        axios.post("https://localhost:7037/Korisnik/RegistrujKorisnika", data)
             .then(response => {
                console.log(response);
                this.registrationComplete();
             })
             .catch(error => {
                console.log(error);
             })   
    }

    // private setErrorMessage(message: string) {
    //     const newState = Object.assign(this.state, {
    //         message: message,
    //     });

    //     this.setState(newState);
    // }

    // private handleErrors(data: any) {
    //     let message = '';

    //     switch (data.statusCode) {
    //         case -6001: message = 'This account already exists!'; break;
    //     }

    //     this.setErrorMessage(message);
    // }

    private registrationComplete() {
        const newState = Object.assign(this.state, {
            isRegistrationComplete: true,
        });

        this.setState(newState);
    }
}