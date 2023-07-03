import React, { useEffect, useState } from 'react';
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
        setCurrentPage(page);
        setFirst((page - 1) * 9);
        setRows(page * 9);
    }
    useEffect(() => {
        // Fetch data from coingecko api and store it in state
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(res => res.json())
            .then(data => setData(data));
    }, []);
    if (data.length === 0) {
        // Loading State Strts
        return (
            <>
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            </>

        );
        // Loadin state ends
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-wrap justify-center">
                    {data.slice(first, rows).map((item, index) => {
                        if (item.image) {
                            return (
                                <div className="transition delay-150 mt-3 mx-3 hover:cursor-pointer hover:shadow-xl" >
                                    <Card item={item} key={index} />
                                </div>
                            )
                        }
                    })}
                </div>
            </div >



            <div className="flex justify-center mt-8">
                <nav>
                    <ul className="flex">
                        {pages.map((page, index) => (
                            <li
                                value={page}
                                key={index}
                                className={`${currentPage === page
                                    ? "bg-gray-800 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-lg"
                                    } px-3 py-2 cursor-pointer rounded-full mr-2`}
                                onClick={(e) => { handleClick(e) }}
                            >
                                {page}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}
export default Header;