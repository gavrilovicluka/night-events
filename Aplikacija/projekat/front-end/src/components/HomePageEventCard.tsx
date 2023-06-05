import Meta from "antd/es/card/Meta";
import DogadjajType from "../types/DogadjajType";
import { Card } from "antd";

import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
} from "mdb-react-ui-kit";
import { Button, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function HomePageEventCard({
  dogadjaji,
}: {
  dogadjaji: DogadjajType[];
}) {
  const navigate = useNavigate();

  const handleButtonClick = (id: number | undefined) => {
    if (id === undefined) {
      alert("ID dogadjaja je undefined");
    }
    navigate(`/detaljiDogadjaja/${id}`);
  };

  return (
    <>
      {dogadjaji.map((value, index) => (
        <Col lg={3} md={4} col={6} p={1} className="mb-4" key={index}>
          <MDBCard>
              <MDBCardImage
                src="https://mdbootstrap.com/img/new/standard/nature/111.webp"
                fluid
                alt={value.naziv}
              />
              <a>
                <div
                  className="mask"
                  style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                ></div>
              </a>
            <MDBCardBody>
              <MDBCardTitle className="text-center">{value.naziv}</MDBCardTitle>
              <MDBCardText>
                <p>
                  <strong> Klub: </strong> {value?.klub?.naziv}
                </p>
                <p>
                  <strong> Datum: </strong>{" "}
                  {value?.datum &&
                    new Date(value?.datum).toLocaleDateString("sr-RS")}
                </p>
                <p>
                  <strong> Vreme: </strong> {value?.vreme}
                </p>
                <p>
                  <strong> Muzički izvođač: </strong>{" "}
                  {value?.izvodjac?.imeIzvodjaca}
                </p>
                <p>
                  <strong> Žanr: </strong> {value?.izvodjac?.zanr}
                </p>
              </MDBCardText>
              <div className="text-center">
                <Button  className="hover-scale-up" onClick={() => handleButtonClick(value.id)}>
                  Pregled dogadjaja
                </Button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </Col>
      ))}
    </>
  );
}
