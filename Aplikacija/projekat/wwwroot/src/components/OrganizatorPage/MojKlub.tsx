import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ApiConfig } from "../../config/api.config";
import DogadjajType from "../../types/DogadjajType";
import OrganizatorHeader from "./OrganizatorHeader";
import KlubType from "../../types/KlubType";
import OrganizatorType from "../../types/OrganizatorType";
import jwtDecode from "jwt-decode";
import { DecodedTokenOrganizator } from "../../types/DecodedTokenOrganizator";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Figure,
} from "react-bootstrap";
import { DecodedToken } from "../../types/DecodedToken";
import { useNavigate } from "react-router-dom";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import "mapbox-gl/dist/mapbox-gl.css";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZGpvbGxlZSIsImEiOiJjbGlhazVpbDQwNGk0M2xtbDg4bWhyMmRkIn0.ttjjCvdpCQq7STgYTSFvDA";

export default function MojKlub() {
  const [selectedKlub, setselectedKlub] = useState<KlubType>();

  const [isEditing, setIsEditing] = useState(false);

  const [selectedFileSlikaKluba, setSelectedFileSlikaKluba] =
    useState<File | null>(null);
  const [selectedFileMapaKluba, setSelectedFileMapaKluba] =
    useState<File | null>(null);
  const [imageUrlSlikaKluba, setImageUrlSlikaKluba] = useState(null);
  const [imageSlika, setImageSlika] = useState("");
  const [imageMapa, setImageMapa] = useState("");
  const [showModal, setShowModal] = useState(false);

  const geocodingClient = mbxGeocoding({
    accessToken:
      "pk.eyJ1IjoiZGpvbGxlZSIsImEiOiJjbGlhazVpbDQwNGk0M2xtbDg4bWhyMmRkIn0.ttjjCvdpCQq7STgYTSFvDA",
  });
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(21.89541836422051);
  const [lat, setLat] = useState(43.32141888298649);
  const [zoom, setZoom] = useState(13);
  const [address, setAddress] = useState("");

  const [x, setX] = useState(0.0);
  const [y, setY] = useState(0.0);

  // useEffect(() => {
  //   if (!map.current) return; // wait for map to initialize

  //   const handleMove = () => {
  //     if (!map.current) return;

  //     const center = map.current.getCenter();
  //     const zoom = map.current.getZoom();

  //     setLng(parseFloat(center.lng.toFixed(4)));
  //     setLat(parseFloat(center.lat.toFixed(4)));
  //     setZoom(parseFloat(zoom.toFixed(2)));
  //   };

  //   map.current.on('move', handleMove);

  //   return () => {
  //     if (map.current) {
  //       map.current.off('move', handleMove);
  //     }
  //   };
  // }, []);

  const getAddressFromCoordinates = (lngLat: { lng: number; lat: number }) => {
    geocodingClient
      .reverseGeocode({
        query: [lngLat.lng, lngLat.lat],
        types: ["address"],
      })
      .send()
      .then((response: any) => {
        const match = response.body;
        if (match && match.features.length > 0) {
          const { place_name } = match.features[0];
          setAddress(place_name);
        }
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current ?? undefined,
      style: "mapbox://styles/mapbox/streets-v12?attribution=false&copy=false",
      center: [lng, lat],
      zoom: zoom,
      pitchWithRotate: false,
    });
    const marker = new mapboxgl.Marker();

    map.current.on("click", (event) => {
      var coordinates = event.lngLat;
      //console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);
      marker.setLngLat(coordinates);
      if (map.current && !map.current.getLayer("marker")) {
        marker.addTo(map.current);
      }
      setLng(coordinates.lng);
      setLat(coordinates.lat);
      getAddressFromCoordinates(event.lngLat);
    });
  });

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
    if (decodedToken.role !== "Organizator") {
      navigate("/");
      return;
    }
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const token = localStorage.getItem("jwtToken");

    if (token !== null) {
      const decodedToken = jwtDecode(token) as DecodedTokenOrganizator;
      console.log(decodedToken);

      const klubId = decodedToken.idKluba;
      console.log(klubId);

      axios
        .get(ApiConfig.BASE_URL + `/Klub/VratiKlub/${klubId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response: AxiosResponse<KlubType>) => {
          if (response.status === 200) {
            const klubData = response.data;
            console.log(klubData);
            setselectedKlub(klubData);
            getPicture(klubId);
            getMap(klubId);
          } else {
            console.log(
              "Došlo je do greške prilikom dobavljanja podataka o klubu."
            );
          }
        })
        .catch((error) => {
          console.log(
            "Došlo je do greške prilikom slanja zahteva za klub:",
            error
          );
        });

      console.log(imageSlika);
    } else {
      console.log("Token organizatora nije pronađen.");
    }
    console.log(selectedKlub?.slikaKluba);
  };

  const getPicture = async (klubId: number) => {
    try {
      const response = await axios.get(
        ApiConfig.BASE_URL + `/Klub/GetPicture/${klubId}`,
        {
          //responseType: 'blob',
        }
      );

      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      console.log(imageUrl);
      setImageSlika(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMap = async (klubId: number) => {
    try {
      const response = await axios.get(
        ApiConfig.BASE_URL + `/Klub/GetMap/${klubId}`,
        {
          //responseType: 'blob',
        }
      );

      const byteArray = new Uint8Array(response.data);
      const blob = new Blob([byteArray], { type: "image/jpeg" });
      const imageUrl = URL.createObjectURL(blob);
      console.log(imageUrl);
      setImageMapa(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("jwtToken");

    console.log(selectedKlub);

    const formDataSlikaKluba = new FormData();
    if (selectedFileSlikaKluba) {
      formDataSlikaKluba.append("file", selectedFileSlikaKluba);
    }
    //console.log(selectedFileSlikaKluba);
    let imageUrlSlikaKluba;
    if (selectedFileSlikaKluba !== null) {
      const response: AxiosResponse = await axios.post(
        ApiConfig.BASE_URL + `/Klub/UploadImageSlikaKluba/${selectedKlub?.id}`,
        formDataSlikaKluba
      );
      imageUrlSlikaKluba = response.data;
    }

    const formDataMapaKluba = new FormData();
    if (selectedFileMapaKluba) {
      formDataMapaKluba.append("file", selectedFileMapaKluba);
    }
    //console.log(selectedFileSlikaKluba);
    let imageUrlMapaKluba;
    if (selectedFileMapaKluba !== null) {
      const response: AxiosResponse = await axios.post(
        ApiConfig.BASE_URL + `/Klub/UploadImageMapaKluba/${selectedKlub?.id}`,
        formDataMapaKluba
      );
      imageUrlMapaKluba = response.data;
    }

    const updatedKlub = {
      ...selectedKlub,
      lokacija: address,
      brojStolovaBS: selectedKlub?.brojStolovaBS,
      brojStolovaVS: selectedKlub?.brojStolovaVS,
      brojStolovaS: selectedKlub?.brojStolovaS,
      slikaKluba: imageUrlSlikaKluba,
      mapaKluba: imageUrlMapaKluba,
      longitude: lng,
      latitude: lat,
    };

    if (token !== null) {
      const decodedToken = jwtDecode(token) as DecodedTokenOrganizator;
      console.log(decodedToken);

      const klubId = decodedToken.idKluba;
      console.log(klubId);

      const data = {
        slikaKluba: imageUrlSlikaKluba,
        mapaKluba: imageUrlMapaKluba,
      };

      axios
        .put(ApiConfig.BASE_URL + `/Klub/IzmeniKlub`, updatedKlub, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setselectedKlub(updatedKlub);
            setIsEditing(false);
            setShowModal(true);
          } else {
            console.log(
              "Došlo je do greške prilikom ažuriranja podataka o klubu."
            );
          }
        })
        .catch((error) => {
          console.log(
            "Došlo je do greške prilikom slanja zahteva za ažuriranje kluba:",
            error
          );
        });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  function handleImageSlika(e: ChangeEvent<HTMLInputElement>) {
    //console.log("handleImageSlika called");
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // const imageUrl = URL.createObjectURL(selectedFile);
      // console.log(imageUrl);
      setSelectedFileSlikaKluba(e.target.files[0]);
      const formData = new FormData();
      formData.append("file", selectedFile);
      //console.log(formData);
    }
  }

  function handleImageMapa(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      // const imageUrl = URL.createObjectURL(selectedFile);
      // console.log(imageUrl);
      setSelectedFileMapaKluba(e.target.files[0]);
      const formData = new FormData();
      formData.append("file", selectedFile);
      //console.log(formData);
    }
  }

  return (
    <>
      <OrganizatorHeader />
      <Container className="pt-3 pb-3" style={{ width: "600px" }}>
        {selectedKlub && (
          <Row>
            <Col>
              <Card>
                <div className="p-4 d-flex justify-content-center align-items-center">
                  <Card.Img
                    className="w-50"
                    variant="top"
                    src={imageSlika}
                    alt="Slika kluba"
                  />

                  <Card.Img
                    className="w-50"
                    variant="top"
                    src={imageMapa}
                    alt="Mapa kluba"
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-center">
                    {selectedKlub.naziv}
                  </Card.Title>
                  <Form>
                    {/* <Form.Group controlId="lokacija" className="pb-3">
                      <Form.Label>Lokacija</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedKlub.lokacija}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setselectedKlub({
                            ...selectedKlub,
                            lokacija: e.target.value,
                          })
                        }
                      />
                    </Form.Group> */}
                    <Form.Group controlId="brojStolovaBS" className="pb-3">
                      <Form.Label>Broj barskih stolova - BS</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedKlub.brojStolovaBS?.toString()}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setselectedKlub({
                            ...selectedKlub,
                            brojStolovaBS: parseInt(e.target.value),
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="brojStolovaVS" className="pb-3">
                      <Form.Label>Broj stolova visoko sedenje - VS</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedKlub.brojStolovaVS?.toString()}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setselectedKlub({
                            ...selectedKlub,
                            brojStolovaVS: parseInt(e.target.value),
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="brojStolovaS" className="pb-3">
                      <Form.Label>Broj separea - S </Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedKlub.brojStolovaS?.toString()}
                        readOnly={!isEditing}
                        onChange={(e) =>
                          setselectedKlub({
                            ...selectedKlub,
                            brojStolovaS: parseInt(e.target.value),
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="slikaS" className="pb-3">
                      <Form.Label>Slika kluba</Form.Label>
                      <Col>
                        <Form.Control
                          type="file"
                          name="slikaS"
                          onChange={handleImageSlika}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group controlId="slikaM" className="pb-3">
                      <Form.Label>Mapa kluba</Form.Label>
                      <Col>
                        <Form.Control
                          type="file"
                          name="slikaM"
                          onChange={handleImageMapa}
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group controlId="adresa" className="pb-3">
                      <Form.Label>Adresa</Form.Label>
                      <Col>
                        <Form.Control
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
                          readOnly={!isEditing}
                          required
                          aria-describedby="uidnote"
                          placeholder={`Tretnuna adresa je ${selectedKlub.lokacija}`}
                        />
                      </Col>
                    </Form.Group>

                    <div ref={mapContainer} className="map-container" />

                    <Button
                      className="mt-2"
                      variant="primary"
                      onClick={
                        isEditing ? handleSaveChanges : handleButtonClick
                      }
                    >
                      {isEditing ? "Sačuvaj" : "Izmeni"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Uspešna izmena kluba</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Klub je uspešno izmenjen.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zatvori
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
