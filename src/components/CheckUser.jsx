const CheckUser = () => {
    const isLoggedIn = async () => {
        const response = await fetch("http://localhost:8000/api/v1/isLoggedIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });
        const content = await response.json();
        console.log("Content : ", content);
        if (content.success == "true") {
            return true;
        } else {
            return false;
        }
    }
    isLoggedIn();
}

export default CheckUser;