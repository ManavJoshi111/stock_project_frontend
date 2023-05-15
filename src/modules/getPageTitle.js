const getPageTitle = (path, coin) => {

    switch (path) {
        case '/':
            return 'Invest in crypto | CryptoX';

        case '/coin':
            return `${coin} | CryptoX`

        case '/home':
            return 'Invest in crypto | CryptoX';

        case '/dashboard':
            return 'Dashboard | CryptoX'

        case '/about':
            return 'About Us | CryptoX';

        case '/contact':
            return 'Contact Us | CryptoX';

        default:
            return 'Cryptox | A crypto investment platform';
    }

}

module.exports = getPageTitle;