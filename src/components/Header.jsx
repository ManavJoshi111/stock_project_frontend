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
                <div className="flex justify-center items-center mt-52  flex-col">
                    <div className="flex justify-center items-center mb-4">
                        <div className="mr-3 rounded-full border-4 bg-gray-400 border-gray-400 w-12 h-12 animate-ping"></div>
                        <div className="mr-3 rounded-full border-4 bg-gray-400 border-gray-400 w-12 h-12 animate-ping"></div>
                        <div className="mr-3 rounded-full border-4 bg-gray-400 border-gray-400 w-12 h-12 animate-ping"></div>
                    </div>
                    <div><h1 className="text-3xl text-gray-800">Loading...</h1></div>
                </div>
            </>

        );
        // Loadin state ends
    }
    return (
        <>
            <div className='flex justify-center'>
                {/* <div className="content flex flex-wrap justify-around" style={{ gap: '20px 20px' }}> */}
                <div className="grid grid-cols-3 gap-6 mt-3" style={{ gap: '20px 20px' }}>
                    {data.slice(first, rows).map((item, index) => {
                        if (!item.image)
                            console.log("Item : ", item);
                        return (
                            <>
                                <div className="transition delay-150 mt-3 mx-3 hover:cursor-pointer hover:shadow-xl">
                                    <Card item={item} key={index} />
                                </div>
                            </>
                        )
                    })
                    }
                </div>
            </div>
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