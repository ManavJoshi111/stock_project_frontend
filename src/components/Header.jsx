import React, { useEffect, useState } from 'react';
import "../CSS/Style.css";
import "../styles/index.css";
import { useNavigate } from 'react-router-dom';
import Card from './Card'

const Header = () => {
    const [data, setData] = useState([]);
    const [rows, setRows] = useState(9);
    const [first, setFirst] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const pages = Array.from({ length: 10 }, (_, i) => i + 1);
    const handleClick = (e) => {
        let page = e.target.value;
        console.log(page);
        setCurrentPage(page);
        setFirst((page - 1) * 9);
        setRows(page * 9);
    }
    useEffect(() => {
        // Fetch data from coingecko api and store it in state
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => res.json())
            .then(data => { setData(data); console.log("Data is : ", data) });
    }, []);
    return (
        <>
            <div className='flex justify-around'>
                {/* <div className="content flex flex-wrap justify-around" style={{ gap: '20px 20px' }}> */}
                <div className="grid grid-cols-3 gap-6 mt-3" style={{ gap: '20px 20px' }}>
                    {data.slice(first, rows).map((item, index) => {
                        if (!item.image)
                            console.log("Item : ", item);
                        return (
                            <>
                                <Card item={item} key={index} />
                            </>
                        )
                    })
                    }
                </div>
            </div>
            <div className="container mt-3 mb-1">
                <div className="flex justify-center">
                    <nav>
                        <ul className="flex">
                            {pages.map((page) => (
                                <li
                                    value={page}
                                    className={`${currentPage === page
                                        ? "bg-gray-800 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        } px-3 py-2 cursor-pointer rounded-full mr-2`}
                                    onClick={(e) => { handleClick(e) }}
                                >
                                    {page}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default Header;