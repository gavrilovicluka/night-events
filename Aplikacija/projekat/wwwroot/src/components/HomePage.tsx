import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Figure,
  Form,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import HomePageNavbar from "./HomePageNavbar";
import DogadjajType from "../types/DogadjajType";
import axios from "axios";
import { ApiConfig } from "../config/api.config";
import { format } from "date-fns";
import HomePageEventCard from "./HomePageEventCard";

function HomePage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [dateOptions, setDateOptions] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [eventsList, setEventsList] = useState<Array<DogadjajType>>([]);
  const [search, setSearch] = useState("");
  const [searchZanr, setSearchZanr] = useState("");

  useEffect(() => {
    const today = new Date();
    const options: Array<{ value: string; label: string }> = [];

    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      const displayDate = `${getDayOfWeek(
        date
      )}, ${date.getDate()} ${getMonthName(date)}`;

      options.push({ value: formattedDate, label: displayDate });
    }

    setDateOptions(options);
    setSelectedDate(options[0].value);
  }, []);

  const getDayOfWeek = (date: Date) => {
    const days = [
      "Nedelja",
      "Ponedeljak",
      "Utorak",
      "Sreda",
      "Četvrtak",
      "Petak",
      "Subota",
    ];
    return days[date.getDay()];
  };

  const getMonthName = (date: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Maj",
      "Jun",
      "Jul",
      "Avg",
      "Sep",
      "Okt",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  };

  useEffect(() => {
    getEventsData(selectedDate);
  }, [selectedDate]);

  const getEventsData = (datum: string) => {
    console.log(datum);
    axios
      .get(ApiConfig.BASE_URL + "/Dogadjaj/VratiDogadjajeDatuma", {
        params: { datum: /*"2023-05-31"*/ datum },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Dogadjaji su uspesno vraceni.");
          console.log(response.data);
          setEventsList(response.data);

          const imagePromises = response.data.map((dogadjaj: DogadjajType) =>
            axios
              .get(ApiConfig.BASE_URL + `/Klub/GetPicture/${dogadjaj.klub?.id}`)
              .then((response) => {
                console.log(dogadjaj.klub?.naziv);
                if (dogadjaj.klub?.naziv) {
                  localStorage.setItem(dogadjaj.klub?.naziv, response.data);
                }
              })
          );

          Promise.all(imagePromises)
            .then(() => {
              console.log("Slike klubova su uspesno smestene u local storage.");
            })
            .catch((error) => {
              console.log("Greska pri preuzimanju slika klubova:", error);
            });
        }
      })
      .catch((error) => {
        console.log("Greska prilikom preuzimanja dogadjaja:", error);
      });
  };

  const scrollToTarget = () => {
    const targetDiv = document.getElementById("searchForm");
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
    {/* <Container className="bg-image"> */}
      <HomePageNavbar />
      <div className="bg-image">
      <Container className="px-4 px-lg-5 d-md-block d-lg-block" style={{ borderRadius: "12px" }}>
        <Row className="gx-6 gx-lg-10 align-items-center justify-content-center" style={{ paddingTop: "40px" }}>
          <Carousel
            className="multi-carousel md-5"
            style={{ maxWidth: "35rem" }}
            interval={1000}
          >
            <Carousel.Item style={{ borderRadius: "12px" }}>
              <img
                src="../assets/klub.jpg"
                alt="slika1"
                style={{ objectFit: "cover", height: "350px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="../assets/slikaProbaZaAbout.jpg"
                alt="slika2"
                style={{ objectFit: "cover", height: "350px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="../assets/logoNEpozadina2.jpg"
                alt="slika3"
                style={{ objectFit: "cover", height: "350px" }}
              />
            </Carousel.Item>
          </Carousel>

          <Col lg={5} className="bg-secondary rounded p-4 ms-md-5 d-md-block d-lg-block">
            <h1 className="font-weight-light">
              Dobrodošli na sajt NightEvents!
            </h1>
            <p>
              NightEvents je aplikacija koja je osmišljena kako bi vam pružila
              najnovije informacije o noćnim događajima u gradu. Ako ste
              ljubitelj noćnog života, muzike, umetnosti ili samo tražite nešto
              novo i uzbudljivo nakon zalaska sunca, NightEvents je
              vaš idealni saputnik.
            </p>
            <Button
              className="btn-primary"
              onClick={() => {
                scrollToTarget();
              }}
            >
              Pregledaj događaje!
            </Button>
          </Col>
        </Row>
      </Container>
      <Card className="text-white bg-secondary my-5 py-4 text-center">
        <Container>
          <Form method="get" id="searchForm">
            <Row>
              <Col sm={12} md={4} className="mt-1 p-1 ps-2 ps-sm-2 ps-md-1">
                <Form.Select
                  id="date"
                  name="date"
                  className="form-control bg-dark text-light"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  {dateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col sm={12} md={4} className="mt-1 p-1 ps-2 ps-sm-2 ps-md-1">
                <Form.Control
                  type="text"
                  id="place_name"
                  name="place_name"
                  placeholder="Ime kluba..."
                  className="form-control bg-dark text-light"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col sm={12} md={4} className="mt-1 p-1 ps-2 ps-sm-2 ps-md-1">
                <Form.Control
                  type="text"
                  id="zanr"
                  name="zanr"
                  placeholder="Vrsta muzike..."
                  className="form-control bg-dark text-light"
                  onChange={(e) => setSearchZanr(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </Card>
      <Row className="gx-4 gx-lg-5 ps-5 pe-5">
        {eventsList.length != 0 ? (
          <HomePageEventCard
            dogadjaji={eventsList.filter((item) => {
              return (
                (search.toLowerCase() === ""
                  ? item
                  : item.klub?.naziv?.toLowerCase().includes(search)) &&
                (searchZanr.toLowerCase() === ""
                  ? item
                  : item.izvodjac?.zanr?.toLowerCase().includes(searchZanr))
              );
            })}
          />
        ) : (
          <p className="text-center text-white">
            {" "}
            Nema dogadjaja za danasnji datum{" "}
          </p>
        )}
      </Row>
      </div>
      {/* </Container> */}
    </>
  );
}

export default HomePage;
