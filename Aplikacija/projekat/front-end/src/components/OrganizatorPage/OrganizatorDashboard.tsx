import { MDBFooter } from 'mdb-react-ui-kit';
import OrganizatorHeader from './OrganizatorHeader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { DecodedToken } from '../../types/DecodedToken';

export default function OrganizatorDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    const token = localStorage.getItem("jwtToken");
    if (token === null || token === undefined) {
      navigate("/");
      return;
    }

    const decodedToken = jwtDecode(token) as DecodedToken;
    if (decodedToken.role !== "Organizator") {
      navigate("/");
      return;
    }
  });
    
    return(
        <OrganizatorHeader />
    )
}




