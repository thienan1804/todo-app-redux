import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "./userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const userState = useSelector((state) => state.user) || {};
    const { loading, error } = userState;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        // Clear error when component mounts
        dispatch(clearError());
    }, [dispatch]);

    const handleLoginEvent = (e) => {
        e.preventDefault();
        let userCredential = {
            username,
            password
        };
        dispatch(loginUser(userCredential)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                setUsername("");
                setPassword("");
                localStorage.setItem("accessToken", result.payload.accessToken);
                navigate("/")
            }
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleLoginEvent} className="form-group custom-form">
                <label>Username</label>
                <input required type="text"
                    value={username} onChange={(e) => setUsername(e.target.value)} className="form-control"></input>
                <br />
                <label>Password</label>
                <input required type="password" className="form-control"
                    value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                <br />
                <button className="btn btn-success btn-md" type="submit">
                    {loading ? "Loading..." : "Login"}
                </button>
                {error && (
                    <div className="alert alert-danger mt-2" role="alert">
                        {typeof error === 'string' ? error : error.message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default LoginPage;
