import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
  } from 'mdb-react-ui-kit';
import {  useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';


export default function OrganizatorHeader() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [showNavColorSecond, setShowNavColorSecond] = useState(false);
    
    const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("isLoggedIn");
        navigate("/");       
    }
    
    return (
    
        
        <MDBNavbar expand='lg' dark bgColor='dark'>
            <MDBContainer fluid>
            <MDBNavbarBrand>NightEvents</MDBNavbarBrand>
            <MDBNavbarToggler
                type='button'
                data-target='#navbarColor02'
                aria-controls='navbarColor02'
                aria-expanded='false'
                aria-label='Toggle navigation'
                onClick={() => setShowNavColorSecond(!showNavColorSecond)}
            >
                <MDBIcon icon='bars' fas />
            </MDBNavbarToggler>
            <MDBCollapse show={showNavColorSecond} navbar id='navbarColor02'>
                <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
                

                <MDBNavbarItem>
                    <MDBNavbarLink href={`/organizatorDashboard/mojKlub`}>Moj klub</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink href='/organizatorDashboard/mojiDogadjaji'>Moji događaji</MDBNavbarLink> 
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink href='/organizatorDashboard/dodajDogadjaj'>Dodaj događaj</MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink href={`/organizatorDashboard/pregledIzvodjaca`}>Pregled izvođaca</MDBNavbarLink>
                </MDBNavbarItem>

                </MDBNavbarNav>
                    <MDBNavbarNav className='justify-content-end'>
                        <MDBNavbarItem>
                            <MDBNavbarLink onClick={ (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => logout(e) }>Odjavi se</MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBContainer>
        </MDBNavbar> 
       
     );
}