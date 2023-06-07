import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
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
      lokacija: selectedKlub?.lokacija,
      brojStolovaBS: selectedKlub?.brojStolovaBS,
      brojStolovaVS: selectedKlub?.brojStolovaVS,
      brojStolovaS: selectedKlub?.brojStolovaS,
      slikaKluba: imageUrlSlikaKluba,
      mapaKluba: imageUrlMapaKluba,
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
      <Container className="pt-3">
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
                  <Card.Title className="text-center">{selectedKlub.naziv}</Card.Title>
                  <Form>
                    <Form.Group controlId="lokacija" className="pb-3">
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
                    </Form.Group>
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
                    <Button
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
