import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function ContactStranica (){

    const navigate = useNavigate();
    
    const handleButtonClick = () => {
        navigate("/");
      };
    

    return (
        <> <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
         <Container className="flex-grow-1 d-flex justify-content-center align-items-center">
           <div className="text-center bg-secondary text-light rounded p-4">
             <h1>Kontakt</h1>
             <p>Ukoliko imate nekih pitanja možete nas kontaktirati na e-mail:</p>
             <p>nightevents@gmail.com</p>
             <Button variant="primary" onClick={handleButtonClick}>Go Back</Button>
           </div>
         </Container>
       </div>
        </>
       );
}