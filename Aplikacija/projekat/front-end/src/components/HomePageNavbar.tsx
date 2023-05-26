import { Nav, Navbar } from "react-bootstrap";

export default function HomePageNavbar() {

    return(

        <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/">NightEvents</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="ms-auto">
          <Nav.Link href="#!">About</Nav.Link>
          <Nav.Link href="#!">Contact</Nav.Link>
          <Nav.Link href="#!">Log in</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
        // <!-- Responsive navbar-->
        // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        // <div className="container px-5">
        //     <a className="navbar-brand" href="/">NightEvents</a>
        //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        //             <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
        //             <li className="nav-item"><a className="nav-link" href="#!">About</a></li>
        //             <li className="nav-item"><a className="nav-link" href="#!">Contact</a></li>
        //             <li className="nav-item"><a className="nav-link" href="#!">Services</a></li>
        //         </ul>
        //     </div>
        // </div>
        // </nav>

    )
    
}