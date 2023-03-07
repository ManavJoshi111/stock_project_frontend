import React from 'react'
import "../CSS/Style.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Card = (props) => {
    const { item } = props;
    const navigate = useNavigate();
    // console.log(item);
    return (
        <>
            <div className="card" style={{ width: '18rem' }} onClick={() => { navigate(`/coin/${item.symbol}`) }}>
                <div className="card-body">
                    <div className="d-flex justify-content-start align-items-center mb-2">
                        <img src={item.image} alt={item.name} style={{ height: 50 }} />
                        <div className="details" style={{ margin: '6px 2px 2px 10px' }}>
                            <h5 className="card-title" >{item.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{item.symbol}</h6>
                        </div>
                    </div>

                    <p>{'₹ ' + item.current_price}</p>
                    <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>{item.price_change_percentage_24h + '%'}</p>
                    {/* <Link to={`/coin/${item.id}`} className="card-link">View</Link> */}
                </div>
            </div>
        </>
    )
}

export default Card
