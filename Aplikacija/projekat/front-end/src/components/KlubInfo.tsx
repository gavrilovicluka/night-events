import { useEffect, useState } from "react";
import { Image, Row, Col, Badge, Modal, Button } from "react-bootstrap";
import KlubType from "../types/KlubType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ApiConfig } from "../config/api.config";

const KlubInfo: React.FC<{ klub: KlubType }> = ({ klub }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState(0);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const [show, setShow] = useState(false);

  const averageRating = 4.3;
  //   const averageRating = klub.ocene
  //     ? klub.ocene.reduce(
  //         (sum, ocena) => sum + (ocena.ocena ? ocena.ocena : 0),
  //         0
  //       ) / klub.ocene.length
  //     : 0;

  useEffect(() => {
    setRating(averageRating);
  }, [averageRating]);

  const handleRatingChange = (value: number) => {
    if (isLoggedIn) {      
      setRating(value);
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        axios
          .post(ApiConfig.BASE_URL + `/Klub/DodajOcenu/${klub.id}/${value}`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })
          .then((response) => {
            const averageRating = response.data;
            setRating(averageRating);
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
        <Col md={4}>
          <Image src="../../assets/slikaproba.jpg" alt="Naziv kluba" fluid />{" "}
          {/* <Image src={klub.slikaKluba} alt={klub.naziv} fluid /> */}
        </Col>
        <Col md={8}>
          <h2>Naziv kluba</h2> {/*<h2>{klub.naziv}</h2>*/}
          <p>Lokacija: lokacija kluba</p> {/* <p>{klub.lokacija}</p> */}
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

            <Badge className="bg-light text-dark ml-2">
              Prosečna ocena: {averageRating} {/* klub.ocena */}
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
