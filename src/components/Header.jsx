import React, { useContext, useEffect, useState } from "react";
import PageContext from "../Context/PageContext";
import coinMap from "../modules/coingeko_to_binance_map";
import Card from "./Card";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const { currentPage, setCurrentPage } = useContext(PageContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 9;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
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
    } finally {
      setLoading(false);
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

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h1 class="text-lg text-center text-red-600 bg-red-100 rounded">
        Due to issues with mapping of APIs this site uses, certain
        cryptocurrency pages may not work as expected. We sincerely apologize
        for any inconvenience this may cause. please contact us for further
        information from
        <NavLink to="/about" className="text-blue-500 hover:underline ml-1">
          here
        </NavLink>
      </h1>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-4 border border-black rounded-lg shadow-md focus:outline-none focus:ring-black-500 focus:border-black-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {filteredData.slice(startIndex, endIndex).map((item) => (
            <div
              key={item.id}
              className="transition border border-black delay-150 hover:cursor-pointer hover:shadow-xl"
            >
              <Card item={item} />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <nav>
            <ul className="flex">
              <li className="mr-2">
                <button
                  className={`${
                    currentPage === 1
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-lg"
                  } px-3 py-2 cursor-pointer rounded-full`}
                  onClick={() => handlePageClick(1)}
                >
                  &lt;
                </button>
              </li>
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
              <li className="ml-2">
                <button
                  className={`${
                    currentPage === totalPages
                      ? "bg-gray-800 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 shadow-lg"
                  } px-3 py-2 cursor-pointer rounded-full`}
                  onClick={() => handlePageClick(totalPages)}
                >
                  &gt;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
