import React, { useContext, useEffect, useState } from 'react';
import "../styles/index.css";
import { useNavigate } from 'react-router-dom';
import PageContext from '../Context/PageContext';
import coinMap from "../modules/coingeko_to_binance_map";
import Card from './Card'
import { toast } from "react-toastify";
import Loading from './Loading';

const Header = () => {
    const [data, setData] = useState([]);
    const { currentPage, setCurrentPage } = useContext(PageContext);
    const [rows, setRows] = useState(9 * currentPage);
    const [first, setFirst] = useState(currentPage * 9 - 9);
    const navigate = useNavigate();
    const pages = Array.from({ length: 8 }, (_, i) => i + 1);
    const [searchQuery, setSearchQuery] = useState('');


    const handleClick = (e) => {
        let page = e.target.value;
        setCurrentPage(page);
        setFirst((page - 1) * 9);
        setRows(page * 9);
    }
    useEffect(() => {
        // Update first and rows values when search query changes
        setFirst(0);
        setRows(9);
        setCurrentPage(1);
    }, [searchQuery]);
    useEffect(() => {
        try {
            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false')
                .then(res => res.json())
                .then(data => {
                    data.map((item, index) => {
                        if (item.image && coinMap.get(item.symbol.toUpperCase()) !== undefined) {
                            setData(prevState => [...prevState, item]);
                        }
                    })
                });
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                progress: undefined,
            });
        }
    }, []);
    if (data.length === 0) {
        // Loading State Strts
        return (
            <Loading />
        );
        // Loadin state ends
    }

    return (
        <>
            <div className="flex justify-center p-4 ">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="py-2 pl-4 pr-16 border border-black rounded-lg shadow-md focus:outline-none focus:ring-black-500 focus:border-black-500 mx-2"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div >

            <div className="flex justify-center">
                <div className="flex flex-wrap justify-center">
                    {data
                        .filter((item) =>
                            item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(first, rows).map((item, index) => {
                            if (item.image) {
                                return (
                                    <div className="transition delay-150 mt-3 mx-3 hover:cursor-pointer hover:shadow-xl" >
                                        <Card item={item} key={index} />
                                    </div>
                                )
                            }
                            return null;
                        })}
                </div>
            </div >



            <div className="flex justify-center mt-8 mb-3">
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