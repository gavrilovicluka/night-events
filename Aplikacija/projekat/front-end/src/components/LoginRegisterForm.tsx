import React, { useState } from 'react';
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
  MDBCheckbox
}
from 'mdb-react-ui-kit';

interface LoginRegisterFormProps {
    onClose: () => void;
  }

function LoginRegisterForm() {

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


  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleFormClose = () => {
    // Izvršavamo dodatne akcije pre zatvaranja forme ako je potrebno

    // Pozivamo onClose funkciju
    //onClose();

    // Možemo takođe ažurirati stanje onClose funkcije koristeći setOnClose, ako je potrebno
  };

  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    // <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

    //   <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
    //     <MDBTabsItem>
    //       <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
    //         Login
    //       </MDBTabsLink>
    //     </MDBTabsItem>
    //     <MDBTabsItem>
    //       <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
    //         Register
    //       </MDBTabsLink>
    //     </MDBTabsItem>
    //   </MDBTabs>

    //   <MDBTabsContent>

    //     <MDBTabsPane show={justifyActive === 'tab1'}>

    //       <div className="text-center mb-3">
    //         <p>Sign in with:</p>

    //         <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
    //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //             <MDBIcon fab icon='facebook-f' size="sm"/>
    //           </MDBBtn>

    //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //             <MDBIcon fab icon='twitter' size="sm"/>
    //           </MDBBtn>

    //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //             <MDBIcon fab icon='google' size="sm"/>
    //           </MDBBtn>

    //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //             <MDBIcon fab icon='github' size="sm"/>
    //           </MDBBtn>
    //         </div>

    //         <p className="text-center mt-3">or:</p>
    //       </div>

    //       <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
    //       <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

    //       <div className="d-flex justify-content-between mx-4 mb-4">
    //         <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
    //         <a href="!#">Forgot password?</a>
    //       </div>

    //       <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
    //       <p className="text-center">Not a member? <a href="#!">Register</a></p>

    //     </MDBTabsPane>

    //     <MDBTabsPane show={justifyActive === 'tab2'}>

    //       <div className="text-center mb-3">
    //         <p>Sign un with:</p>

    //         <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
    //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //             <MDBIcon fab icon='facebook-f' size="sm"/>
    //           </MDBBtn>

    //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //             <MDBIcon fab icon='twitter' size="sm"/>
    //           </MDBBtn>

    //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //             <MDBIcon fab icon='google' size="sm"/>
    //           </MDBBtn>

    //           <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
    //             <MDBIcon fab icon='github' size="sm"/>
    //           </MDBBtn>
    //         </div>

    //         <p className="text-center mt-3">or:</p>
    //       </div>

    //       <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
    //       <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'/>
    //       <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
    //       <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>

    //       <div className='d-flex justify-content-center mb-4'>
    //         <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
    //       </div>

    //       <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>

    //     </MDBTabsPane>

    //   </MDBTabsContent>

    // </MDBContainer>

    <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
  );
}

export default LoginRegisterForm;