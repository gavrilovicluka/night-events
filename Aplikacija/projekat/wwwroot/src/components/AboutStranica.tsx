import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import HomePageNavbar from "./HomePageNavbar";

export default function AboutStranica() {
  return (
    <>
      <HomePageNavbar />
      <Container id="1">
        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ margin: "20px" }}
        >
          <Image
            src="/assets/slikaProbaZaAbout.jpg"
            alt="Opis slike"
            fluid
            style={{ border: "2px solid #FFFFFF" }}
          />
        </Container>
        <Container
          style={{
            backgroundColor: "#262626",
            borderRadius: "12px",
            padding: "30px",
          }}
        >
          <p style={{ color: "white" }}>
            NightEvents aplikacija ima nekoliko ključnih i interesantnih
            informacija kao i mogućnosti koje će korisnicima pružiti sve što im
            je potrebno za planiranje noćnog provoda. Neke od tih mogućnosti su:
            <br></br>
            - Detaljni raspored događaja: NightEvents pruža ažurirani raspored
            svih noćnih događaja u odgovarajućem klubu na odgovarajućem
            području. Možete pronaći detaljnije informacije o raznovrsnim
            muzičkim događajima koji se odigravaju na nivou jednog kluba.
            <br></br>
            - Ocenjivanje i recenzije: Korisnici aplikacije mogu ocenjivati i
            ostavljati recenzije za događaje koje su posetili. Ova stavka vam
            omogućava da vidite mišljenja drugih posetitelja i steknete uvid u
            kvalitet i atmosferu događaja pre nego što se odlučite da posetite.
            <br></br>
            - Pregled žanrova i muzičkih izvođača: Ova web aplikacija vam može
            pružiti detaljan pregled različitih muzičkih žanrova i izvođača.
            Korisnici mogu istraživati različite stilove muzike, saznati više o
            njihovim omiljenim izvođačima i dobiti informacije o njihovim
            predstojećim nastupima.
            <br></br>
            - Online rezervacija mesta: Omogućava korisnicima da rezervišu mesto u klubu
            za različite događaje putem aplikacije, uključujući i odabir
            odgovarajućeg tipa stola.
          </p>
        </Container>
        <a href="/" className="text-white-50">
          <Button className="fa-solid mt-3" style={{ fontFamily: "Arial" }}>
            Nazad
          </Button>
        </a>
      </Container>

      <div className="container mb-3">
        
      </div>
    </>
  );
}
