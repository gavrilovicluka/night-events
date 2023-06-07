import { useEffect, useState } from "react";
import { Button, Modal, Nav, Navbar } from "react-bootstrap";
import LoginRegisterForm from "./LoginRegisterForm";
import { useNavigate } from "react-router-dom";

export default function HomePageNavbar() {

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn) {
      setIsLoggedIn(true);
    }
    
  });

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isLoggedIn");
    window.location.reload();
  };
  
  return (
    
    <Navbar bg="dark" expand="lg" variant="dark" className='px-5'>
      <Navbar.Brand href="/">NightEvents</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="ms-auto">
          <Nav.Link href="/AboutStranica">O nama</Nav.Link>
          <Nav.Link href="#!">Kontakt</Nav.Link>
          { !isLoggedIn ? <Nav.Link onClick={handleLoginClick}>Prijava</Nav.Link> : <Nav.Link onClick={ (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => handleLogoutClick(e) }>Odjavi se</Nav.Link> }
          
        </Nav>
      </Navbar.Collapse>
      {showLoginForm && (
            <div className="overlay">
              <LoginRegisterForm onClose={closeLoginForm} />
            </div>
          )}
    </Navbar>
    
  )

}