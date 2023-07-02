import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center bg-gray-200"
            style={{ height: "calc(100vh - 64px)" }}>
            <div className="max-w-md mx-auto bg-white rounded p-8 shadow-md">
                <h1 className="text-4xl text-red-500 mb-2">404</h1>
                <h3 className="text-2xl text-red-500 mb-4">Error</h3>
                <p className="text-xl mb-4">Page not found</p>
                <p className="text-lg mb-4">
                    Please check the URL or{" "}
                    <button
                        className="text-blue-500 underline"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>
                    .
                </p>
            </div>
        </div >
    );
};

export default Error;
