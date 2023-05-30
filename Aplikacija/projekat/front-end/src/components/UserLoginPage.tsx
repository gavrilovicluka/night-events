import React, { useState } from "react";
import { Container, Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ApiConfig } from "../config/api.config";
import jwtDecode from "jwt-decode";
import { DecodedTokenOrganizator } from "../types/DecodedTokenOrganizator";

interface UserLoginState {
  username: string;
  password: string;
  isLoggedIn: boolean;

}

const UserLoginPage: React.FC = () => {
  const [state, setState] = useState<UserLoginState>({
    username: "",
    password: "",
    isLoggedIn: false,
  });

  const navigate = useNavigate();

  const formInputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  const setLogginState = (isLoggedIn: boolean) => {
    setState((prevState) => ({ ...prevState, isLoggedIn }));
  };

  const doLogin = () => {
    const data = {
      username: state.username,
      password: state.password,
    };

    axios
      .post(ApiConfig.BASE_URL + "/Auth/PrijaviSe", data)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        const decodedToken = jwtDecode(token) as DecodedTokenOrganizator;
        console.log(decodedToken);

        switch (decodedToken.role) {
          case "Admin":
            navigate("/administratorDashboard");
            break;
          case "Organizator":
            navigate("/organizatorDashboard");
            break;
          case "Muzicar":
            navigate("/muzickiIzvodjacDashboard");
            break;
          default:
            navigate("/");
            break;
        }

        setLogginState(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (state.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Col md={{ span: 6, offset: 3 }}>
        <Card>
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faSignInAlt} />
              Prijava Korisnika
            </Card.Title>
            <Card.Text>
              <Form>
                <Form.Group>
                  <Form.Label htmlFor="username">Username:</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    value={state.username}
                    onChange={formInputChanged}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="password">Password:</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    value={state.password}
                    onChange={formInputChanged}
                  />
                </Form.Group>
                <Form.Group>
                  <Button variant="primary" onClick={doLogin}>
                    Log In
                  </Button>
                </Form.Group>
              </Form>
              <Form />
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default UserLoginPage;
