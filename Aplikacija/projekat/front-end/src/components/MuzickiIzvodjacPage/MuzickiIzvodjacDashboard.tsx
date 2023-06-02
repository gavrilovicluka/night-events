import { useEffect } from "react";
import MuzickiIzvodjacHeader from "./MuzickiIzvodjacHeader";
import { useNavigate } from "react-router-dom";
import { DecodedToken } from "../../types/DecodedToken";
import jwtDecode from "jwt-decode";

export default function MuzickiIzvodjacDashboard() {
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
    if (decodedToken.role !== "Muzicar") {
      navigate("/");
      return;
    }
  });

  return <MuzickiIzvodjacHeader />;
}
