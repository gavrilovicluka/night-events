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
import { Col, Container } from "react-bootstrap";

const HomePageEventCard = ({ dogadjaji }: { dogadjaji: DogadjajType[] }) => {
  return (
    <>
      {dogadjaji.map((value, index) => (
        <Col lg={3} md={4} col={6} p={1} className="mb-4">
          <MDBCard>
            <MDBRipple
              rippleColor="light"
              rippleTag="div"
              className="bg-image hover-overlay"
            >
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
            </MDBRipple>
            <MDBCardBody>
              <MDBCardTitle className="text-center">{value.naziv}</MDBCardTitle>
              <MDBCardText>
                Ovde stoje informacije o klubu {value.klub?.naziv} za dogadjaj koji ima naziv {value.naziv}             
              </MDBCardText>
              <MDBBtn href="#">Pregled dogadjaja</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </Col>
      ))}
    </>
  );
};

export default HomePageEventCard;
