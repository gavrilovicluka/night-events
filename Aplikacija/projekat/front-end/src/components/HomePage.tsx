import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import HomePageNavbar from './HomePageNavbar';
import HomePageOneEvent from './HomePageOneEvent';
import DogadjajType from '../types/DogadjajType';

function HomePage() {

  const [selectedDate, setSelectedDate] = useState('');
  const [dateOptions, setDateOptions] = useState<Array<{ value: string; label: string; }>>([]);

  useEffect(() => {
    const today = new Date();
    const options: Array<{ value: string; label: string; }> = [];

    for (let i = 0; i < 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
      const displayDate = `${getDayOfWeek(date)}, ${date.getDate()} ${getMonthName(date)}`;

      options.push({ value: formattedDate, label: displayDate });
    }

    setDateOptions(options);
    setSelectedDate(options[0].value);
  }, []);

  const getDayOfWeek = (date: Date) => {
    const days = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
    return days[date.getDay()];
  };

  const getMonthName = (date: Date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Avg', 'Sep', 'Okt', 'Nov', 'Dec'];
    return months[date.getMonth()];
  };

  const scrollToTarget = () => {
    const targetDiv = document.getElementById('datum');
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <>
      <HomePageNavbar />

      {/* <!-- Page Content--> */}
        <div className="container px-4 px-lg-5">
            {/* <!-- Heading Row--> */}
            <div className="row gx-4 gx-lg-5 align-items-center my-5">
                <div className="col-lg-7"><img className="img-fluid rounded mb-4 mb-lg-0" src="https://dummyimage.com/900x400/dee2e6/6c757d.jpg" alt="..." /></div>
                <div className="col-lg-5">
                    <h1 className="font-weight-light">Business Name or Tagline</h1>
                    <p>This is a template that is great for small businesses. It doesn't have too much fancy flare to it, but it makes a great use of the standard Bootstrap core components. Feel free to use this template for any project you want!</p>
                    <button className="btn btn-primary" onClick={scrollToTarget}>Prikaži događaje</button>
                    {/* <a className="btn btn-primary" href="#datum111">START</a> */}

                </div>
            </div>
            {/* <!-- Call to Action--> */}
            <div className="card text-white bg-secondary my-5 py-4 text-center" id="datum">
               
            {/* datum danasnji vracanje i naredni */}
                <div className="container mb-5">
              <form method="get" id="searchForm">
              <div className="row">             
              <div className="col-6 col-sm-6 col-md-3 mt-1 p-1 ps-2 ps-sm-2 ps-md-1">
              <select id="date" name="date" className="form-control bg-dark text-light" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                {dateOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              </div>
              <div className="col-6 col-sm-6 col-md-3 mt-1 p-1 ps-2 ps-sm-2 ps-md-1">
              <input type="text" id="place_name " name="place_name" placeholder="Ime kluba..."  className="form-control bg-dark text-light" />
              </div>
              <div className="col-6 col-sm-6 col-md-3 mt-1 p-1 ps-2 ps-sm-2 ps-md-1">
              <select id="type_id" name="type_id"  className="form-control bg-dark text-light"><option value="">Sva muzika</option><option value="1">Narodna / Pop / Folk</option><option value="2">Kafanska / Starogradska</option><option value="3">Hip Hop / Rap / Trap / RnB</option><option value="4">House / Electro / Techno</option><option value="11">Pop</option><option value="7">Rock / Punk</option><option value="8">Jazz</option><option value="9">Metal</option><option value="10">Latino</option><option value="undefined">Nedefinisano</option></select>
              </div>
              </div>
              </form>
              </div>
            
            </div>
            {/* <!-- Content Row--> */}
            <div className="row gx-4 gx-lg-5">
              <HomePageOneEvent dogadjaj={new DogadjajType} />
                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Card Two</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tenetur ex natus at dolorem enim! Nesciunt pariatur voluptatem sunt quam eaque, vel, non in id dolore voluptates quos eligendi labore.</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                    </div>
                </div>
                <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">Card Three</h2>
                            <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem magni quas ex numquam, maxime minus quam molestias corporis quod, ea minima accusamus.</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">More Info</a></div>
                    </div>
                </div>
            </div>
        </div>

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



