import React from "react";
import cryptoImg from "../assets/crypto.jpg";

const About = () => {
  return (
    <div>
      <div class="py-16 bg-white">
        <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div class="md:5/12 lg:w-5/12">
              <img
                src={cryptoImg}
                alt="crypto img"
                className="max-w-full max-h-80 rounded-md"
              />
            </div>
            <div class="md:7/12 lg:w-6/12 text-justify">
              <h2 class="text-3xl text-gray-900 py-3 font-bold md:text-4xl">
                About US
              </h2>
              <p className="text-gray-800 mb-4">
                At Cryptox, We aimed to make cryptocurrency trading accessible
                and convenient for everyone. Our platform allows users to buy
                and sell a variety of cryptocurrencies using dummy amounts,
                providing a risk-free environment to explore and learn about the
                crypto market.
              </p>
              <p className="text-gray-800 mb-4">
                Our mission with Cryptox is to empower individuals and create
                opportunities in the world of cryptocurrencies. Whether you're a
                beginner or an experienced trader, Cryptox offers a
                user-friendly interface and comprehensive tools to enhance your
                trading experience.
              </p>
              <p className="text-gray-800 mb-4">
                We strive to deliver a seamless and secure trading environment,
                prioritizing the privacy and security of users. Our commitment
                is to provide exceptional support and ensure that your
                experience on Cryptox is smooth and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-6 my-10 flex justify-around items-start">
        <div className="text-center px-3 shadow-md rounded-xl p-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Manav Joshi</h2>
          <p className="text-gray-700 mb-1">
            Email:{" "}
            <a
              href="mailto:manavjoshi154@gmail.com"
              className="text-blue-500 hover:underline ml-1"
            >
              manavjoshi154+crypto_about@gmail.com
            </a>
          </p>
          <p className="text-gray-700">
            GitHub:
            <a
              href="https://github.com/ManavJoshi111/"
              className="text-blue-500 hover:underline ml-1"
            >
              https://github.com/ManavJoshi111
            </a>
          </p>
        </div>
        <div className="text-center px-3 shadow-md rounded-xl p-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sagar Nanera
          </h2>
          <p className="text-gray-700 mb-1">
            Email:{" "}
            <a
              href="mailto:sagarnanera30@gmail.com"
              className="text-blue-500 hover:underline ml-1"
            >
              sagarnanera30+crypto_about@gmail.com
            </a>
          </p>
          <p className="text-gray-700">
            GitHub:
            <a
              href="https://github.com/sagarnanera/"
              className="text-blue-500 hover:underline ml-1"
            >
              https://github.com/sagarnanera
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
