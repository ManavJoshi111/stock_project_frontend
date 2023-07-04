import React, { useContext, useEffect, useState } from 'react';
import "../styles/index.css";
import { useNavigate } from 'react-router-dom';
import PageContext from '../Context/PageContext';
import coinMap from "../modules/coingeko_to_binance_map";
import Card from './Card'

const Header = () => {
    const [data, setData] = useState([]);
    const { currentPage, setCurrentPage } = useContext(PageContext);
    const [rows, setRows] = useState(9 * currentPage);
    const [first, setFirst] = useState(currentPage * 9 - 9);
    const navigate = useNavigate();
    const pages = Array.from({ length: 8 }, (_, i) => i + 1);

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
            .then(data => {
                data.map((item, index) => {
                    if (item.image && coinMap.get(item.symbol.toUpperCase()) !== undefined) {
                        setData(prevState => [...prevState, item]);
                    }
                })
            });
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
            <div className="flex justify-center p-4">
                <div className="flex items-center">
                    <input type="text" placeholder="Search" className="py-2 pl-4 pr-16 border border-black rounded-lg shadow-md focus:outline-none focus:ring-black-500 focus:border-black-500 mx-2" />
                    <button type="button" className="py-3 font-medium rounded-lg tracking-widest text-white uppercase bg-gray-800 shadow-lg focus:outline hover:bg-gray-700 hover:shadow-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 17l5-5m0 0l-5-5m5 5H4"></path>
                        </svg>
                    </button>
                </div>
            </div>




            <div className="flex justify-center">
                <div className="flex flex-wrap justify-center">
                    {data.slice(first, rows).map((item, index) => {
                        if (item.image && coinMap.get(item.symbol.toUpperCase()) !== undefined) {
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