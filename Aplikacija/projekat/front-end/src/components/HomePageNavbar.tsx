import { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import LoginRegisterForm from "./LoginRegisterForm";

export default function HomePageNavbar() {

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };
  
  return (

    <Navbar bg="dark" expand="lg" variant="dark" className='px-5'>
      <Navbar.Brand href="/">NightEvents</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="ms-auto">
          <Nav.Link href="/AboutStranica">About</Nav.Link>
          <Nav.Link href="#!">Contact</Nav.Link>
          <Nav.Link href="/login">Log in</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {showLoginForm && (
        <div className="dfullscreen-overlay">
          <div className="dfullscreen-content">
            <LoginRegisterForm/>
          </div>
        </div>
      )}
    </Navbar>

  )

}