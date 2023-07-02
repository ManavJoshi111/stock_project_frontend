import React from 'react';

const ContactUsPage = () => {
    return (
        <div className="bg-gradient  flex items-center justify-center ">
            <div className="bg-white rounded-lg shadow-xl p-8 mx-4 md:w-1/2">
                <h2 className="text-4xl font-bold text-center mb-4">Contact Us</h2>
                <p className="text-gray-700 text-lg text-center mb-8">We'd love to hear from you!</p>
                <div className="flex items-center justify-center space-x-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8zm0 0v0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14s-3-1.5-3-4.8c0-1.1.4-2.1 1.2-3" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14s3-1.5 3-4.8c0-1.1-.4-2.1-1.2-3" />
                    </svg>
                    <p className="text-gray-600">123 Main Street, City</p>
                </div>
                <div className="flex items-center justify-center space-x-4 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <p className="text-gray-600">contact@example.com</p>
                </div>
                <div className="flex items-center justify-center space-x-4 mt-4">
                    <img src='https://img.icons8.com/?size=512&id=53438&format=png' className='w-6 h-6' />
                    <p className="text-gray-600">+91 1234567890</p>
                </div>
                {/* Add additional contact information or form here */}
            </div>
        </div>
    );
};

export default ContactUsPage;