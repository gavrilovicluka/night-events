import { Button, Col, Container, Image, Row } from "react-bootstrap";
import HomePageNavbar from "./HomePageNavbar";
import { useEffect } from "react";
import DogadjajType from "../types/DogadjajType";


// import {
//     interaction, layer, custom, control,
//     Interactions, Overlays, Controls,
//     Map, Layers, Overlay, Util
//   } from 'react-openlayers';


  

  

const DetaljiDogadjaja: React.FC<{ dogadjaj: DogadjajType }> = ({ dogadjaj }) => {

    

    useEffect(() => {
        const mapIframe = document.getElementById('map') as HTMLIFrameElement;
        if (mapIframe) {
          mapIframe.src = mapIframe.dataset.src || '';
        }
      }, []);


    return (

        <>
        <HomePageNavbar />
                <div className="container silver1 p-4">
                    <div className="row">
                    <div className="col text-center text-md-end">
                    {/* <picture>
                    <source srcset="/images/places/394/logo/d71c00246ec5d84071c7fd96209cbbf2.webp" type="image/webp">
                    <source srcset="/images/places/394/logo/3365943953e0146d3c754810d96b878f.jpg" type="image/jpeg">
                    <img src="/images/places/394/logo/3365943953e0146d3c754810d96b878f.jpg" alt="Stars Night Club" id="place-logo">
                    </picture> */}
                    </div>
                    
                </div>
                </div>
        {/* <div style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
            <div className="text-center">
                <h1 className="text-white">Club2</h1>
                <div className="text-white-50">Obrenovićeva 20, Niš</div>
            </div>
        </div> */}

        
        <Container className="container mt-5 pt-1" style={{ backgroundColor: '#808080' }}>
            <Container>
            <Col className="justify-content-between mb-3">
            <Image className="mb-3" src="../assets/slikaproba1.jpg" alt="Opis slike" fluid />
            </Col>
            </Container>
            <Container className="col text-center text-md-start p-4 p-md-0"></Container>
            <h1 className="text-white">Stars Night Club</h1>
            <Container className="silver1 p-4">
            <Container className="m-0">Adresa: Obrenovićeva 20, Niš</Container>
            <Container className="m-0">
                Dozvoljeno pušenje:
                Da </Container>
                <br />
            <Container className="fs-6 m-3">
            <i className="fa-brands fa-instagram fs-3"></i> <a href="https://www.instagram.com/starsclubnis" target="_blank" rel="external" className="ms-2">@starsclubnis</a>
            </Container>
            </Container>
        </Container>

        {/* <div className="App">
            <Map view={{center:[0,0],zoom:2}} >
                <Layers>
                    <layer.Tile> </layer.Tile>
                </Layers>
            </Map>
        </div> */}

        {/* <div className="container mt-5 pt-1">
      <h2 className="holder-header d-inline-block mb-3">Lokacija:</h2>
      <div className="mb-2">
        <a href="https://www.google.com/maps/dir//43.3200043,21.8950509/@43.3200043,21.8950509,13z" target="_blank" rel="external">
          Vodi me do ove lokacije na Google Maps <i className="fa-solid fa-location-arrow"></i>
        </a>
      </div>
      <iframe
        id="map"
        title="Google Maps"
        data-src="https://maps.google.com/maps?q=43.3200043,21.8950509&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
        
        style={{ border: 'none', margin: 0 }}
        className="lazyload"
        loading="lazy"
        src=""
      ></iframe>
    </div> */}


   {/*link nazad vodi nas do homepage*/}
    <div className="container mb-3">
<a href="/" className="text-white-50">
<Button className="fa-solid">Nazad</Button>
 </a>
</div>
</>
);
}
export default DetaljiDogadjaja;
