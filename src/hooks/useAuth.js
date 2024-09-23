import axios from "axios";
import { useEffect, useState } from "react";


function useAuth() {
    const [user, setUser] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (token == null) {
            setUser(undefined);
            setErrorMessage("Cần đăng nhập trước mới có thể vào trang này");
        }

        if (token != null) {
            var config = {
                method: "GET",
                url: `${process.env.REACT_APP_API_BASE_URL}User/test`,
                headers: { Authorization: `Bearer ${token}` },
            };

            axios(config)
                .then((response) => {
                    let user = response.data;
                    setUser(user);
                })
                .catch((error) => {
                    setUser(undefined);
                    setErrorMessage((error.response?.data).message);
                });
        }
    }, [token]);

    return [user, errorMessage];
}

export default useAuth;
