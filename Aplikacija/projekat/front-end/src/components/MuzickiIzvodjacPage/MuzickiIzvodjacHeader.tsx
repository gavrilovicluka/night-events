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


export default function MuzickiIzvodjacHeader() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [showNavColorSecond, setShowNavColorSecond] = useState(false);
    
    const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.removeItem("username");
        navigate("/login");
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
                    <MDBNavbarLink href={`/muzickiIzvodjacDashboard/mojiTermini`}>Moji dogadjaji</MDBNavbarLink> {/*{`/muzickiIzvodjac/${idIzvodjaca}/mojiDogadjaji`}*/}
                </MDBNavbarItem>
                <MDBNavbarItem>
                    <MDBNavbarLink href={`/muzickiIzvodjacDashboard/dodajTermin`}>Dodaj termin</MDBNavbarLink> {/*{`/muzickiIzvodjac/${idIzvodjaca}/dodajTermin`}*/}
                </MDBNavbarItem>
                

                </MDBNavbarNav>
                    <MDBNavbarNav className='justify-content-end'>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/login' onClick={ (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => logout(e) }>Logout</MDBNavbarLink>
                    </MDBNavbarItem>
                </MDBNavbarNav>
            </MDBCollapse>
            </MDBContainer>
        </MDBNavbar> 
       
     );
}