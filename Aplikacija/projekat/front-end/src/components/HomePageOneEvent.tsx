import Meta from "antd/es/card/Meta";
import DogadjajType from "../types/DogadjajType";
import { Container } from "react-bootstrap";
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const HomePageOneEvent: React.FC<{ dogadjaj: DogadjajType }> = ({ dogadjaj }) => {
  const { naziv, datumIVreme } = dogadjaj;

  return (
    <Container className="col-md-4 mb-5">
    <Card className="h-100">
        <Card.Body>
            <Card.Title>{naziv}</Card.Title>
            <Card.Text>{datumIVreme?.toDateString()}</Card.Text>
        </Card.Body>
        <Card.Footer>
            {/* <Link className="btn btn-primary btn-sm" to={`/dogadjaji/${id}`}> */}
            <Link className="btn btn-primary btn-sm" to={`/DetaljiDogadjaja`}>
                Više informacija
            </Link>
        </Card.Footer>
    </Card>
</Container>
  );
}


        
    
                

export default HomePageOneEvent;