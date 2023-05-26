import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Figure, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HomePageNavbar from './HomePageNavbar';
import HomePageOneEvent from './HomePageOneEvent';
import DogadjajType from '../types/DogadjajType';
import axios from 'axios';
import { ApiConfig } from '../config/api.config';
import { format } from 'date-fns';

function HomePage() {

  const [selectedDate, setSelectedDate] = useState('');
  const [dateOptions, setDateOptions] = useState<Array<{ value: string; label: string; }>>([]);
  const [eventsList, setEventsList] = useState<Array<DogadjajType>>([]);
  const [selectedDateForAPI, setSelectedDateForAPI] = useState<Date>(new Date());
  const [dateOptionsForAPI, setDateOptionsforAPI] = useState<Array<Date>>([]);


  useEffect(() => {
    const today = new Date();
    const options: Array<{ value: string; label: string; }> = [];
    const optionsForAPI: Array<Date> = [];

    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      const displayDate = `${getDayOfWeek(date)}, ${date.getDate()} ${getMonthName(date)}`;

      optionsForAPI.push(date);
      options.push({ value: formattedDate, label: displayDate });
    }

    setDateOptionsforAPI(optionsForAPI);
    setSelectedDateForAPI(optionsForAPI[0]);

    setDateOptions(options);
    setSelectedDate(options[0].value);

    //getEventsData(selectedDateForAPI);
  }, []);

  const getDayOfWeek = (date: Date) => {
    const days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
    return days[date.getDay()];
  };

  const getMonthName = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
    return months[date.getMonth()];
  };

  useEffect(() => {
    getEventsData();
  }, [])

  const getEventsData = () => {

      //const formattedDate = format(date, 'yyyy-MM-dd');
      //const formattedDate = date.toISOString().split('T')[0];
      const dat = {
        datum: new Date("2023-05-25").toISOString()
      }
      
      axios.get(ApiConfig.BASE_URL + "/Dogadjaj/VratiDogadjajeDatuma", {
        params: {datum: "2023-05-26" },
      })
            .then((response) => {
              if (response.status === 200) {             
                console.log("Dogadjaji su uspesno vraceni.");
                //window.location.reload();
              }
            })
            .catch((error) => {
              console.log('Greska prilikom preuzimanja dogadjaja:', error);
            });         
  }

  const scrollToTarget = () => {
    const targetDiv = document.getElementById('date');
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HomePageNavbar />

      <Container className="px-4 px-lg-5" id="datum">
      <Row className="gx-4 gx-lg-5 align-items-center my-5">
        <Col lg={7}>
          <Figure>
            <Figure.Image className="img-fluid rounded mb-4 mb-lg-0" src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg" alt="..." />
          </Figure>
        </Col>
        <Col lg={5}>
          <h1 className="font-weight-light">Business Name or Tagline</h1>
          <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
          <Button className="btn-primary"onClick={scrollToTarget}>Pregledaj</Button>
        </Col>
      </Row>
      <Card className="text-white bg-secondary my-5 py-4 text-center">
        <Container className="mb-5">
          <Form method="get" id="searchForm">
            <Row>
              <Col sm={6} md={3} className="mt-1 p-1 ps-2 ps-sm-2 ps-md-1">
                <Form.Select id="date" name="date" className="form-control bg-dark text-light" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                  {dateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col sm={6} md={3} className="mt-1 p-1 ps-2 ps-sm-2 ps-md-1">
                <Form.Control type="text" id="place_name" name="place_name" placeholder="Ime kluba..." className="form-control bg-dark text-light" />
              </Col>
              <Col sm={6} md={3} className="mt-1 p-1 ps-2 ps-sm-2 ps-md-1">
                <Form.Select id="type_id" name="type_id" className="form-control bg-dark text-light">
                  <option value="">Sva muzika</option>
                  <option value="1">Narodna / Pop / Folk</option>
                  <option value="2">Kafanska / Starogradska</option>
                  <option value="3">Hip Hop / Rap / Trap / RnB</option>
                  <option value="4">House / Electro / Techno</option>
                  <option value="11">Pop</option>
                  <option value="7">Rock / Punk</option>
                  <option value="8">Jazz</option>
                  <option value="9">Metal</option>
                  <option value="10">Latino</option>
                  <option value="undefined">Nedefinisano</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Container>
      </Card>
      <Row className="gx-4 gx-lg-5">
        <HomePageOneEvent dogadjaj={new DogadjajType} />
        <HomePageOneEvent dogadjaj={new DogadjajType} />
        <HomePageOneEvent dogadjaj={new DogadjajType} />

        {/* druga kartica default ko sto je bila */}

        {/* <Col md={4} mb={5}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Card Two</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button className="btn-primary btn-sm" href="/DetaljiDogadjaja">More Info</Button>
            </Card.Footer>
          </Card>
        </Col> */}

        {/* treca kartica default ko sto je bila */}

        {/* <Col md={4} mb={5}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Card Three</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button className="btn-primary btn-sm">More Info</Button>
            </Card.Footer>
          </Card>
        </Col>*/}
      </Row> 
    </Container>

    </>

  );

}

export default HomePage;

// const TopBar = () => {
//   return (
//     <section id="topbar" className="d-flex align-items-center">
//       <div className="container d-flex justify-content-center justify-content-md-between">
//         <div className="contact-info d-flex align-items-center">
//           <i className="bi bi-envelope d-flex align-items-center">
//             <a href="mailto:contact@example.com">contact@example.com</a>
//           </i>
//           <i className="bi bi-phone d-flex align-items-center ms-4">
//             <span>+1 5589 55488 55</span>
//           </i>
//         </div>
//         <div className="social-links d-none d-md-flex align-items-center">
//           <a href="#" className="twitter">
//             <i className="bi bi-twitter"></i>
//           </a>
//           <a href="#" className="facebook">
//             <i className="bi bi-facebook"></i>
//           </a>
//           <a href="#" className="instagram">
//             <i className="bi bi-instagram"></i>
//           </a>
//           <a href="#" className="linkedin">
//             <i className="bi bi-linkedin"></i>
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// const Header = () =>  {
//   return (
//     <header id="header" className="d-flex align-items-center">
//       <div className="container d-flex justify-content-between align-items-center">

//         <div className="logo">
//           <h1><a href="index.html">Eterna</a></h1>
//         </div>

//         <nav id="navbar" className="navbar">
//           <ul>
//             <li><a className="active" href="index.html">Home</a></li>
//             <li><a href="about.html">About</a></li>
//             <li><a href="services.html">Services</a></li>
//             <li><a href="portfolio.html">Portfolio</a></li>
//             <li><a href="team.html">Team</a></li>
//             <li><a href="pricing.html">Pricing</a></li>
//             <li><a href="blog.html">Blog</a></li>
//             <li className="dropdown"><a href="#"><span>Drop Down</span> <i className="bi bi-chevron-down"></i></a>
//               <ul>
//                 <li><a href="#">Drop Down 1</a></li>
//                 <li className="dropdown"><a href="#"><span>Deep Drop Down</span> <i className="bi bi-chevron-right"></i></a>
//                   <ul>
//                     <li><a href="#">Deep Drop Down 1</a></li>
//                     <li><a href="#">Deep Drop Down 2</a></li>
//                     <li><a href="#">Deep Drop Down 3</a></li>
//                     <li><a href="#">Deep Drop Down 4</a></li>
//                     <li><a href="#">Deep Drop Down 5</a></li>
//                   </ul>
//                 </li>
//                 <li><a href="#">Drop Down 2</a></li>
//                 <li><a href="#">Drop Down 3</a></li>
//                 <li><a href="#">Drop Down 4</a></li>
//               </ul>
//             </li>
//             <li><a href="contact.html">Contact</a></li>
//           </ul>
//           <i className="bi bi-list mobile-nav-toggle"></i>
//         </nav>

//       </div>
//     </header>
//   );
// }



