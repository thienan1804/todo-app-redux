import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, clearAddError } from "./ListUserSlice";

const AddUserPage = () => {
  const [userValue, setUserValue] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
  });

  const state = useSelector((state) => state.listUser);

  const dispatch = useDispatch();

  const handleOnchangeUserValue = (e) => {
    setUserValue({ ...userValue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearAddError());
  }, [dispatch]);

  const handleSubmitUser = (e) => {
    e.preventDefault();
    dispatch(addUser(userValue)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setUserValue({
          username: "",
          password: "",
          fullName: "",
          email: "",
        });
        alert("Them thanh cong");
      } else if (result.meta.requestStatus === "rejected") {
        return <h1>{state.add.error}</h1>;
      }
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmitUser} className="form-group custom-form">
        <label>Username</label>
        <input
          name="username"
          required
          value={userValue.username}
          onChange={handleOnchangeUserValue}
          type="text"
          className="form-control"
        ></input>
        <br />
        <label>Password</label>
        <input
          name="password"
          required
          value={userValue.password}
          onChange={handleOnchangeUserValue}
          type="password"
          className="form-control"
        ></input>
        <br />
        <label>FullName</label>
        <input
          name="fullName"
          required
          value={userValue.fullName}
          onChange={handleOnchangeUserValue}
          type="text"
          className="form-control"
        ></input>
        <br />
        <label>Email</label>
        <input
          name="email"
          required
          value={userValue.email}
          onChange={handleOnchangeUserValue}
          type="email"
          className="form-control"
        ></input>
        <br />
        <button className="btn btn-success btn-md" type="submit">
          {state.add.loading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
