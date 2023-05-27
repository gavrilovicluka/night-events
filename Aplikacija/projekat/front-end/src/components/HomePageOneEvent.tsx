import Meta from "antd/es/card/Meta";
import DogadjajType from "../types/DogadjajType";
import { Card } from 'antd';
import { Link } from "react-router-dom";

const HomePageOneEvent: React.FC<{ dogadjaj: DogadjajType }> = ({ dogadjaj }) => {
  const { naziv, datumIVreme } = dogadjaj;

  return (

    <div className="col-md-4 mb-5">
                    <div className="card h-100">
                        <div className="card-body">
                            <h2 className="card-title">{naziv}</h2>
                            <p className="card-text">{datumIVreme?.toDateString()}</p>
                        </div>
                        <div className="card-footer">
                        <Link className="btn btn-primary btn-sm" to="/detaljiDogadjaja">
                         Više informacija
                        </Link>
                        </div>
                    </div>
                </div>
//     <Card
//       style={{ width: 240 }}
//       cover={
//         <div style={{ position: 'relative' }}>
//           <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{ width: '100%' }} />
//           <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.5)', opacity: 0, transition: 'opacity 0.3s' }}>
//             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#fff' }}>
//               Hover efekat
//             </div>
//           </div>
//         </div>
//       }
//     >
//       <Meta title={naziv} description={datumIVreme?.toDateString()} />
//     </Card>
//   );
  );
}


        
    
                

export default HomePageOneEvent;