import React from 'react'
import cryptoImg from '../assets/crypto.jpg';

const About = () => {
    return (
        <div>
            <div class="py-16 bg-white">
                <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
                    <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                        <div class="md:5/12 lg:w-5/12">
                            <img src={cryptoImg} alt="crypto img" className='max-w-full max-h-80 rounded-md' />
                        </div>
                        <div class="md:7/12 lg:w-6/12 text-justify">
                            <h2 class="text-3xl text-gray-900 py-3 font-bold md:text-4xl">About US</h2>
                            <p className="text-gray-800 mb-4">
                                At Cryptox, we believe in making cryptocurrency trading accessible and convenient for everyone. Our platform allows you to buy and sell a variety of cryptocurrencies using dummy amounts, providing a risk-free environment to explore and learn about the crypto market.
                            </p>
                            <p className="text-gray-800 mb-4">
                                Our mission is to empower individuals and create opportunities in the world of cryptocurrencies. Whether you're a beginner or an experienced trader, Cryptox provides a user-friendly interface and comprehensive tools to enhance your trading experience.
                            </p>
                            <p className="text-gray-800 mb-4">
                                We strive to deliver a seamless and secure trading environment, prioritizing the privacy and security of our users. Our team of dedicated professionals is committed to providing exceptional customer support and ensuring that your experience on Cryptox is smooth and enjoyable.
                            </p>
                            <p className="text-gray-800">
                                Join us on this exciting journey as we revolutionize the way people trade and interact with cryptocurrencies. Start your crypto trading experience with Cryptox today!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default About
