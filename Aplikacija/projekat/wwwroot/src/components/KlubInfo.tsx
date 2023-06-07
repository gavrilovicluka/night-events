import { useEffect, useState } from "react";
import { Image, Row, Col, Badge, Modal, Button } from "react-bootstrap";
import KlubType from "../types/KlubType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ApiConfig } from "../config/api.config";

const KlubInfo: React.FC<{ klub: KlubType }> = ({ klub}) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState(0);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [show, setShow] = useState(false);
  const [imageSlikaKluba, setImageSlikaKluba] = useState("");

  let averageRating = 0;
  if(klub && klub?.ocene) {
    averageRating = klub.ocene
      ? klub.ocene.reduce(
          (sum, ocena) => sum + (ocena.ocena ? ocena.ocena : 0),
          0
        ) / klub.ocene.length
      : 0;
  }

  useEffect(() => {
    if (klub?.naziv != null) {
      const storedImage = localStorage.getItem(klub.naziv);
      if (storedImage) {
        setImageSlikaKluba(storedImage);
      }
    }
    
    setRating(averageRating);
  }, [averageRating]);


  const handleRatingChange = (value: number) => {
    if (isLoggedIn) {      
      setRating(value);
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        axios({
          method: "post",
          url: `${ApiConfig.BASE_URL}/Klub/OceniKlub/${klub.id}/${value}`,
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${storedToken}`,
          },
        })
          .then((response) => {
            const averageRating = response.data;
            setRating(averageRating);
            window.location.reload();
          })
          .catch((error) => {
            console.error("Greška pri ocenjivanju kluba:", error);
          });
      }
    } else {
      setShow(true);
    }
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <>
      <Row>
        <Col md={6} sm={5} xs={5}>
          <Image src={imageSlikaKluba} alt={klub?.naziv} fluid />
        </Col>
        <Col md={6} sm={7} xs={7}>
          <h2>{klub?.naziv}</h2>
          <p> <strong> Lokacija: </strong> {klub?.lokacija}</p>
          <div>
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    className="d-none"
                    value={String(ratingValue)}
                    onClick={() => handleRatingChange(ratingValue)}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    key={index}
                    className="star"
                    color={
                      ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  />
                </label>
              );
            })}
            <br/>
            <Badge className="bg-light text-dark ml-2">
              Prosečna ocena: { typeof averageRating === "number" ? averageRating.toFixed(2) : 0.0} 
            </Badge>
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ne mozete postaviti ocenu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Morate biti prijavljeni na svoj nalog da biste postavili ocenu!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>{" "}
    </>
  );
};

export default KlubInfo;
