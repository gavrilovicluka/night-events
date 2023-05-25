import DogadjajType from "../types/DogadjajType";

export default function addCard(dogadjaj : DogadjajType) {

    const {naziv, datumIVreme} = dogadjaj;

    return (
        <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">{naziv}</h2>
                            <p className="card-text">{datumIVreme?.toDateString()}</p>
                        </div>
                        <div className="card-footer"><a className="btn btn-primary btn-sm" href="#!">Više informacija</a></div>
                    </div>
                </div>
    );
                
}