import { useState, useEffect } from 'react';

const GoToTopButton = () => {
    const [showButton, setShowButton] = useState(false);


    // show the button when the user scrolls down 20% of the viewport height
    const handleScroll = () => {
        if (window.scrollY > window.innerHeight * 0.2) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    // scroll to the top when the button is clicked
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // add event listener to show the button on scroll
    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`${showButton ? 'block' : 'hidden'
                } fixed bottom-8 right-8 z-10`}
        >
            <button
                onClick={handleClick}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-white hover:bg-gray-800 focus:bg-gray-800 focus:outline-none"
            >
                <span className="text-2xl font-extrabold text-white">&#8593;</span>
            </button>
        </div>
    );
};

export default GoToTopButton;
