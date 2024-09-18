import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addMembersType,
  clearAddError,
  fetchListMembersType,
  updateMembersType,
  clearUpdateError,
} from "./ListUserSlice";

const AddUserPage = ({ selectedUser }) => {
  const [membersType, setMemberTypes] = useState({
    name: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleOnchangeUserValue = (e) => {
    setMemberTypes({ ...membersType, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearAddError());
  }, [dispatch]);

  useEffect(() => {
    // Clear error khi component mount hoặc khi bắt đầu sửa lại thông tin
    dispatch(clearUpdateError());
  }, [dispatch]);

  // Cập nhật giá trị của membersType khi selectedUser thay đổi
  useEffect(() => {
    if (selectedUser) {
      setMemberTypes({
        name: selectedUser.name || "",
        description: selectedUser.description || "",
      });
    }
  }, [selectedUser]);

  const handleSubmitUser = (e) => {
    e.preventDefault();
    if (selectedUser) {
      // Nếu có selectedUser, gọi API cập nhật
      dispatch(
        updateMembersType({
          membersTypeid: selectedUser.id,
          membersTypeValue: membersType,
        })
      ).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          alert("Sửa thành công");
          dispatch(fetchListMembersType(1));
        }
      });
    } else {
      // Thêm mới thành viên
      dispatch(addMembersType(membersType)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          setMemberTypes({
            name: "",
            description: "",
          });
          alert("Thêm thành công");
          dispatch(fetchListMembersType(1));
        }
      });
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmitUser} className="form-group custom-form">
        <label>Name</label>
        <input
          name="name"
          required
          value={membersType.name}
          onChange={handleOnchangeUserValue}
          type="text"
          className="form-control"
        ></input>
        <br />
        <label>Description</label>
        <input
          name="description"
          required
          value={membersType.description}
          onChange={handleOnchangeUserValue}
          type="text"
          className="form-control"
        ></input>
        <br />

        <br />
        <button className="btn btn-success btn-md" type="submit">
          {!selectedUser ? "Thêm" : "Sửa"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
