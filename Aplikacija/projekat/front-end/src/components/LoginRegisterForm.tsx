import React, { useState, useEffect, useRef } from 'react';
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
  MDBRadio
}
from 'mdb-react-ui-kit';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';

interface LoginRegisterFormProps {
    onClose: () => void;
  }

function LoginRegisterForm({ onClose }: { onClose: () => void }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  

  

  const handleUsernameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Ovde možete dodati logiku za prijavu
    console.log('Prijavljeni ste:', username, password);
    //onClose(); // Zatvaranje forme nakon prijave
  };


  const [activeTab, setActiveTab] = useState<"tab1" | "tab2">("tab1");




  const handleFormClose = () => {
    // Izvršavamo dodatne akcije pre zatvaranja forme ako je potrebno

    // Pozivamo onClose funkciju
    onClose();

    // Možemo takođe ažurirati stanje onClose funkcije koristeći setOnClose, ako je potrebno
  };

  const handleJustifyClick = (value: string) => {
    if (value === activeTab) {
      return;
    }

    

    if (value === 'tab1') {
      setActiveTab('tab1');
    } else if (value === 'tab2') {
      setActiveTab('tab2');
    }
  };

  const [selectedRole, setSelectedRole] = useState('korisnik');

  const handleRadioChange = (role:string) => {
    setSelectedRole(role);
  };

  
 


  return (
    <>
    <MDBContainer className=" p-3 my-5 d-flex flex-column w-50">
      <MDBCard> {/* Obavijanje komponenti s MDBCard */}
        <MDBTabs pills justify className="mb-3 d-flex flex-row justify-content-between">
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={activeTab === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={activeTab === 'tab2'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
        

        <MDBTabsContent>
          <MDBTabsPane show={activeTab === 'tab1'}>
        <MDBValidation className='row g-3' isValidated>
        <Row>
          <Col md={{ span: 6, offset: 3 }} >
            

              <MDBValidationItem feedback='Unesite username.'invalid>
                <MDBInput wrapperClass='mb-4 mt-4'  type='username' value={username} onChange={handleUsernameChange} placeholder='Username' id='validationCustom01'
          required/>
              </MDBValidationItem>
          </Col>
        </Row>   
          
        <Row>
          <Col md={{ span: 6, offset: 3 }} >
              <MDBValidationItem feedback='Unesite lozinku'invalid>
                <MDBInput wrapperClass='mb-4' type='password' value={password} onChange={handlePasswordChange} placeholder='Password' id='validationCustom02'
          required/>
              </MDBValidationItem>
              </Col>
        </Row>
            </MDBValidation>
           

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
          <p className="text-center">
              Not a member?{' '}
              <a href="#!" onClick={() => handleJustifyClick('tab2')}>
                Register
              </a>
          </p>
            {/* Ostatak koda */}
            
          </MDBTabsPane>

          <MDBTabsPane show={activeTab === 'tab2'}>
            <div className="text-center mb-3">
              
              <div className="d-flex justify-content-between mx-auto" style={{ width: '40%' }}>
               
                {/* Ostatak koda */}
              </div>
            </div>
          
        <MDBValidation className='row g-3' isValidated>
          <Row className="justify-content-center">
                <Col md={4} className="mb-2">
                  <MDBValidationItem invalid feedback='' >
                    <MDBRadio label='Korisnik' required id='validationFormCheck2' name='radio-stacked' checked={selectedRole === 'korisnik'} onChange={() => handleRadioChange('korisnik')} />
                  </MDBValidationItem>
                </Col>
                <Col md={4} className="mb-2">
                  <MDBValidationItem invalid feedback=''>
                    <MDBRadio label='Organizator' required id='validationFormCheck3' name='radio-stacked' checked={selectedRole === 'organizator'} onChange={() => handleRadioChange('organizator')}/>
                  </MDBValidationItem>
                </Col>
                <Col md={4} className="mb-2">
                  <MDBValidationItem invalid feedback=''>
                    <MDBRadio label='Muzicki izvodjac' required id='validationFormCheck4' name='radio-stacked' checked={selectedRole === 'muzickiIzvodjac'} onChange={() => handleRadioChange('muzickiIzvodjac')}/>
                  </MDBValidationItem>
                </Col>
          </Row>
          
          {selectedRole === 'korisnik' || selectedRole === 'organizator' ? (
            <>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <MDBValidationItem  feedback='Unesite ime.'invalid >
                <MDBInput wrapperClass='mb-4' id='form1' type='text' placeholder='Name' required  />
              </MDBValidationItem>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <MDBValidationItem  feedback='Unesite prezime.'invalid >
                <MDBInput wrapperClass='mb-4' id='form2' type='text' placeholder='Prezime' required  />
              </MDBValidationItem>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <MDBValidationItem feedback='Unesite username.'invalid >
                <MDBInput wrapperClass='mb-4' id='form3' type='text' placeholder='Username' required  />
              </MDBValidationItem>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <MDBValidationItem  feedback='Unesite email.'invalid >
                <MDBInput wrapperClass='mb-4' id='form4' type='email' placeholder='Email' required  />
              </MDBValidationItem>
            </Col>
          </Row>  
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <MDBValidationItem  feedback='Unesite sifru.'invalid >
                <MDBInput wrapperClass='mb-4' id='form5' type='password' placeholder='Password' required/>
              </MDBValidationItem>
            </Col>
          </Row>
          </>
          

          ) : selectedRole === 'muzickiIzvodjac' ? (
            <>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <MDBValidationItem feedback='Unesite ime izvođača.' invalid>
                    <MDBInput wrapperClass='mb-4' id='form1' type='text' placeholder='Ime izvođača' required />
                  </MDBValidationItem>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <MDBValidationItem feedback='Unesite žanr.' invalid>
                    <MDBInput wrapperClass='mb-4' id='form2' type='text' placeholder='Žanr' required />
                  </MDBValidationItem>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <MDBValidationItem feedback='Unesite broj članova.' invalid>
                    <MDBInput wrapperClass='mb-4' id='form3' type='number' placeholder='Broj članova' required />
                  </MDBValidationItem>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <MDBValidationItem feedback='Unesite username.' invalid>
                    <MDBInput wrapperClass='mb-4' id='form4' type='text' placeholder='Username' required />
                  </MDBValidationItem>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <MDBValidationItem feedback='Unesite email.' invalid>
                    <MDBInput wrapperClass='mb-4' id='form5' type='email' placeholder='Email' required />
                  </MDBValidationItem>
                </Col>
              </Row>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <MDBValidationItem feedback='Unesite šifru.' invalid>
                    <MDBInput wrapperClass='mb-4' id='form6' type='password' placeholder='Password' required />
                  </MDBValidationItem>
                </Col>
              </Row>
            </>
           ) : null}
        </MDBValidation>

            {/* Ostatak koda */}
            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
        <div className="position-relative">
            <Button variant="link" className="close" onClick={handleFormClose}>
              <X />
            </Button>
        </div>
      </MDBCard>

    </MDBContainer>
    </>
  );
}

  
export default LoginRegisterForm;