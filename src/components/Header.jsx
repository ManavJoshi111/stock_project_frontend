import React, { useEffect, useState } from 'react';
import "../CSS/Style.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../styles/index.css";
import { useNavigate } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import Card from './Card'

const Header = () => {
    const [data, setData] = useState([]);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch data from coingecko api and store it in state
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => res.json())
            .then(data => { setData(data); console.log("Data is : ", data) });
    }, []);
    if (!data.length) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className='container mt-4'>
                <div className="content d-flex flex-wrap justify-content-around" style={{ gap: '20px 20px' }}>
                    {data.slice(first, first + rows).map((item, index) => {
                        if (!item.image)
                            console.log("Item : ", item);
                        return (
                            <Card item={item} key={index} />
                        )
                    })
                    }
                </div>
                <div className="container mt-2 mb-1 fixed-bottom">
                    <Paginator first={first} rows={rows} totalRecords={data.length} onPageChange={(e) => { setFirst(e.first); setRows(e.rows) }} />
                </div>
            </div>
        </>
    )
}
export default Header;