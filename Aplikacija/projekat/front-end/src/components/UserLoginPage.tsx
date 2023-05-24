import React from 'react';
import {Container, Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import axios from 'axios';
import { Navigate} from 'react-router-dom';

interface UserLoginState {
 
    email: string;
    password: string;
    isLoggedIn: boolean;

    // message?: string; 
}

export default class UserLoginPage extends React.Component {
    state: UserLoginState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoggedIn: false,
        }
    
    }

    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
      const newState = Object.assign(this.state, {
        [ event.target.id]: event.target.value,
      });
      this.setState(newState);
    }

    //  private setErrorMessage(message: string)
    // {
    //     const newState= Object.assign(this.state,{
    //         errorMessage: message,
    //     });
    //     this.setState(newState);
    // }

    private setLogginState(isLoggedIn: boolean){
        const newState = Object.assign(this.state, {
            isLoggedIn: isLoggedIn,
        });
        this.setState(newState);
    }

    private doLogin() 
    {
        const data = {
            email: this.state.email,
            password: this.state.password,

        };

        axios.post("https://localhost:7037/Auth/PrijaviSe", data)
             .then(response => {
                console.log(response);
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                this.setLogginState(true);
             })
             .catch(error => {
                console.log(error);
             })
     
    }
    

    render() {
        if(this.state.isLoggedIn === true){
            return(
                <Navigate to="/" />
            );
        }
    
        
        return (
            <Container>
                <Col md= { {span : 6, offset: 3}}>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faSignInAlt}/>Prijava Korisnika
                        </Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="email">E-mail:</Form.Label>
                                    <Form.Control type="email" id="email"
                                                    value={ this.state.email}
                                                    onChange={ event => this.formInputChanged(event as any)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Password:</Form.Label>
                                    <Form.Control type="password" id="password" 
                                                    value={ this.state.password}
                                                    onChange={ event => this.formInputChanged(event as any)}/>
                                                    
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary"
                                            onClick={()=> this.doLogin()}>
                                        Log In
                                    </Button>
                                </Form.Group>
                                </Form>
                                <Form/>
                        </Card.Text>
                    </Card.Body>
                </Card>

                </Col>
            </Container>
        )
    }
}


