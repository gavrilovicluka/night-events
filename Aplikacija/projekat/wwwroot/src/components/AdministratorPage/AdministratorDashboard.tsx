import { useNavigate } from "react-router-dom";
import AdministratorHeader from "./AdministratorHeader";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "../../types/DecodedToken";
import { ArrowReturnLeft } from "react-bootstrap-icons";

export default function AdministratorDashboard() {
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
    if (decodedToken.role !== "Admin") {
      navigate("/");
      return;
    }
  });

  return <AdministratorHeader />;
}
