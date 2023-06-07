import React, { useState, useEffect, useRef } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBCard,
  MDBValidation,
  MDBValidationItem,
  MDBRadio,
} from "mdb-react-ui-kit";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiConfig } from "../config/api.config";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../types/DecodedToken";

interface LoginRegisterFormProps {
  onClose: () => void;
}

interface UserLoginState {
  usernameLogin: string;
  passwordLogin: string;
  isLoggedIn: boolean;
}

function LoginRegisterForm({ onClose }: { onClose: () => void }) {
  const [state, setState] = useState<UserLoginState>({
    usernameLogin: "",
    passwordLogin: "",
    isLoggedIn: false,
  });

  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");
  const [selectedRole, setSelectedRole] = useState("korisnik");

  const formRef = useRef<HTMLDivElement>(null);

  const [userAndOrganizerFormData, setUserAndOrganizerFormData] = useState({
    username: "",
    email: "",
    ime: "",
    prezime: "",
    password: "",
  });
  const [musicianFormData, setMusicianFormData] = useState({
    username: "",
    email: "",
    imeIzvodjaca: "",
    zanr: "",
    brClanova: 0,
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isRegistrationComplete, setRegistrationComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const userAndOrganizerRegistrationFormInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    setUserAndOrganizerFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const musicianRegistrationFormInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    setMusicianFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  // const handleSubmit = (values) => {
  //   console.log(values);
  //   doRegister();
  // };

  const loginFormInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { id, value } = event.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
  };

  const setLogginState = (isLoggedIn: boolean) => {
    setState((prevState) => ({ ...prevState, isLoggedIn }));
  };

  const closeComponent = () => {
    setIsOpen(false);
  };

  const doLogin = () => {
    const data = {
      username: state.usernameLogin,
      password: state.passwordLogin,
    };

    axios
      .post(ApiConfig.BASE_URL + "/Auth/PrijaviSe", data)
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        // const decodedToken = jwtDecode(token) as DecodedToken;
        // console.log(decodedToken);
        setLogginState(true);
        localStorage.setItem('isLoggedIn','true');

        switch (response.data.role) {
          case "Admin":
            navigate("/administratorDashboard/klubovi");
            break;
          case "Organizator":
            navigate("/organizatorDashboard/mojKlub");
            break;
          case "Muzicar":
            navigate("/muzickiIzvodjacDashboard/mojiTermini");
            break;
          default:
            //navigate("/");
            onClose();
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const doRegister = () => {
    let data = {};
    if (selectedRole === "organizator" || selectedRole === "korisnik") {
      data = {
        username: userAndOrganizerFormData.username,
        email: userAndOrganizerFormData.email,
        ime: userAndOrganizerFormData.ime,
        prezime: userAndOrganizerFormData.prezime,
        password: userAndOrganizerFormData.password,
      };
    } else {
      data = {
        username: musicianFormData.username,
        email: musicianFormData.email,
        imeIzvodjaca: musicianFormData.imeIzvodjaca,
        zanr: musicianFormData.zanr,
        brClanova: musicianFormData.brClanova,
        password: musicianFormData.password,
      };
    }

    let url = "";
    if (selectedRole === "korisnik") {
      url = "/Korisnik/RegistrujKorisnika";
    } else if (selectedRole === "organizator") {
      url = "/Organizator/RegistrujOrganizatora";
    } else if (selectedRole === "muzickiIzvodjac") {
      url = "/MuzickiIzvodjac/RegistrujMuzickogIzvodjaca";
    }

    axios
      .post(ApiConfig.BASE_URL + url, data)
      .then((response) => {
        console.log(response);
        // registrationComplete();
        setRegistrationComplete(true);
        navigate("/loginRegister");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const registrationComplete = () => {
    setRegistrationComplete(true);
  };

  const handleFormClose = () => {
    onClose();
  };

  const handleJustifyClick = (value: string) => {
    if (value === activeTab) {
      return;
    }

    if (value === "tab1") {
      setActiveTab("tab1");
    } else if (value === "tab2") {
      setActiveTab("tab2");
    }
  };

  const handleRadioChange = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <> { isOpen && 
      <MDBContainer className=" p-3 my-5 d-flex flex-column w-50" ref={formRef}>
        <MDBCard>
          <MDBTabs
            pills
            justify
            className="mb-3 d-flex flex-row justify-content-between p-3"
          >
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab1")}
                active={activeTab === "tab1"}
                style={{ border: "1px solid #1E90FF" }}
              >
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink
                onClick={() => handleJustifyClick("tab2")}
                active={activeTab === "tab2"}
                style={{ border: "1px solid #1E90FF" }}
              >
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent>
            <MDBTabsPane show={activeTab === "tab1"}>
              <MDBValidation className="row g-3" isValidated>
                <Row>
                  <Col md={{ span: 6, offset: 3 }}>
                    <MDBValidationItem feedback="Unesite username." invalid>
                      <MDBInput
                        wrapperClass="mb-4 mt-4"
                        type="username"
                        value={state.usernameLogin}
                        onChange={loginFormInputChanged}
                        placeholder="Username"
                        id="usernameLogin"
                        required
                      />
                    </MDBValidationItem>
                  </Col>
                </Row>

                <Row>
                  <Col md={{ span: 6, offset: 3 }}>
                    <MDBValidationItem feedback="Unesite lozinku" invalid>
                      <MDBInput
                        wrapperClass="mb-4"
                        type="password"
                        value={state.passwordLogin}
                        onChange={loginFormInputChanged}
                        placeholder="Password"
                        id="passwordLogin"
                        required
                      />
                    </MDBValidationItem>
                  </Col>
                </Row>
              </MDBValidation>

              {/* <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div> */}

              <Button className="px-3 mb-4 w-100" onClick={doLogin}>
                Sign in
              </Button>
              <p className="text-center">
                Not a member?{" "}
                <a href="#!" onClick={() => handleJustifyClick("tab2")}>
                  Register
                </a>
              </p>
            </MDBTabsPane>

            <MDBTabsPane show={activeTab === "tab2"}>
              <div className="text-center mb-3">
                <div
                  className="d-flex justify-content-between mx-auto"
                  style={{ width: "40%" }}
                ></div>
              </div>

              <MDBValidation className="row g-3" isValidated>
                <Row className="d-flex justify-content-evenly">
                  <Col md={4} className="mb-2 ps-5">
                    <MDBValidationItem invalid feedback="">
                      <MDBRadio
                        label="Korisnik"
                        required
                        id="validationFormCheck2"
                        name="radio-stacked"
                        checked={selectedRole === "korisnik"}
                        onChange={() => handleRadioChange("korisnik")}
                      />
                    </MDBValidationItem>
                  </Col>
                  <Col md={4} className="mb-2">
                    <MDBValidationItem invalid feedback="">
                      <MDBRadio
                        label="Organizator"
                        required
                        id="validationFormCheck3"
                        name="radio-stacked"
                        checked={selectedRole === "organizator"}
                        onChange={() => handleRadioChange("organizator")}
                      />
                    </MDBValidationItem>
                  </Col>
                  <Col md={4} className="mb-2 pe-3">
                    <MDBValidationItem invalid feedback="">
                      <MDBRadio
                        label="Muzicki izvodjac"
                        required
                        id="validationFormCheck4"
                        name="radio-stacked"
                        checked={selectedRole === "muzickiIzvodjac"}
                        onChange={() => handleRadioChange("muzickiIzvodjac")}
                      />
                    </MDBValidationItem>
                  </Col>
                </Row>

                {selectedRole === "korisnik" ||
                selectedRole === "organizator" ? (
                  <>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem feedback="Unesite ime." invalid>
                          <MDBInput
                            wrapperClass="mb-4"
                            id="ime"
                            type="text"
                            placeholder="Name"
                            required
                            onChange={
                              userAndOrganizerRegistrationFormInputChanged
                            }
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem feedback="Unesite prezime." invalid>
                          <MDBInput
                            wrapperClass="mb-4"
                            id="prezime"
                            type="text"
                            placeholder="Prezime"
                            required
                            onChange={
                              userAndOrganizerRegistrationFormInputChanged
                            }
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem feedback="Unesite username." invalid>
                          <MDBInput
                            wrapperClass="mb-4"
                            id="username"
                            type="text"
                            placeholder="Username"
                            required
                            onChange={
                              userAndOrganizerRegistrationFormInputChanged
                            }
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem feedback="Unesite email." invalid>
                          <MDBInput
                            wrapperClass="mb-4"
                            id="email"
                            type="email"
                            placeholder="Email"
                            required
                            onChange={
                              userAndOrganizerRegistrationFormInputChanged
                            }
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem feedback="Unesite sifru." invalid>
                          <MDBInput
                            wrapperClass="mb-4"
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={
                              userAndOrganizerRegistrationFormInputChanged
                            }
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                  </>
                ) : selectedRole === "muzickiIzvodjac" ? (
                  <>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem
                          feedback="Unesite ime izvođača."
                          invalid
                        >
                          <MDBInput
                            wrapperClass="mb-4"
                            id="imeIzvodjaca"
                            type="text"
                            placeholder="Ime izvođača"
                            required
                            onChange={musicianRegistrationFormInputChanged}
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem feedback="Unesite žanr." invalid>
                          <MDBInput
                            wrapperClass="mb-4"
                            id="zanr"
                            type="text"
                            placeholder="Žanr"
                            required
                            onChange={musicianRegistrationFormInputChanged}
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem
                          feedback="Unesite broj članova."
                          invalid
                        >
                          <MDBInput
                            wrapperClass="mb-4"
                            id="brClanova"
                            type="number"
                            placeholder="Broj članova"
                            required
                            onChange={musicianRegistrationFormInputChanged}
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem feedback="Unesite username." invalid>
                          <MDBInput
                            wrapperClass="mb-4"
                            id="username"
                            type="text"
                            placeholder="Username"
                            required
                            onChange={musicianRegistrationFormInputChanged}
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem feedback="Unesite email." invalid>
                          <MDBInput
                            wrapperClass="mb-4"
                            id="email"
                            type="email"
                            placeholder="Email"
                            required
                            onChange={musicianRegistrationFormInputChanged}
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={{ span: 6, offset: 3 }}>
                        <MDBValidationItem feedback="Unesite šifru." invalid>
                          <MDBInput
                            wrapperClass="mb-4"
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={musicianRegistrationFormInputChanged}
                          />
                        </MDBValidationItem>
                      </Col>
                    </Row>
                  </>
                ) : null}
              </MDBValidation>

              <Button className="mb-4 w-100" onClick={doRegister}>
                Sign up
              </Button>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCard>
      </MDBContainer> }

      {isRegistrationComplete && (
        <Alert
          variant="success"
          onClose={() => setRegistrationComplete(false)}
          dismissible
        >
          Uspešno ste se registrovali!
        </Alert>
      )}
    </>
  );
}

export default LoginRegisterForm;
