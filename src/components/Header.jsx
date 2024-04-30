import React, { useContext, useEffect, useState } from "react";
import PageContext from "../Context/PageContext";
import coinMap from "../modules/coingeko_to_binance_map";
import Card from "./Card";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Header = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      const fetchedData = await response.json();
      const filteredData = fetchedData.filter(
        (item) => item.image && coinMap.get(item.symbol.toUpperCase())
      );
      setData(filteredData); // Storing all data in data state
      setFilteredData(filteredData); // Initially setting filtered data to all data
      updateTotalPages(filteredData.length);
    } catch (err) {
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
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    // Filter data based on search query and update filteredData
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, data]); // Listen to changes in searchQuery and data

  useEffect(() => {
    updateTotalPages(filteredData.length); // Update total pages based on filtered data length
  }, [filteredData]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const updateTotalPages = (dataLength) => {
    setTotalPages(Math.ceil(dataLength / itemsPerPage));
  };

  return (
    <>
      <div className="flex justify-center p-4 ">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="py-2 pl-4 pr-16 border border-black rounded-lg shadow-md focus:outline-none focus:ring-black-500 focus:border-black-500 mx-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center">
          {filteredData.slice(startIndex, endIndex).map((item) => (
            <div
              key={item.id}
              className="transition delay-150 mt-3 mx-3 hover:cursor-pointer hover:shadow-xl"
            >
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8 mb-3">
        <nav>
          <ul className="flex">
            {pages.map((page) => (
              <li
                key={page}
                className={`${
                  currentPage === page
                    ? "bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-lg"
                } px-3 py-2 cursor-pointer rounded-full mr-2`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
