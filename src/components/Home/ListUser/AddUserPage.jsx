import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addMembersType,
  clearAddError,
  fetchListMembersType,
  updateMembersType,
  clearUpdateError,
} from "./ListUserSlice";
import Button from "react-bootstrap/Button";

const AddUserPage = ({ selectedUser, setSelectedUser }) => {
  const [membersType, setMemberTypes] = useState({
    tenChuDe: "",
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
        tenChuDe: selectedUser.tenChuDe || "",
      });
    }
  }, [selectedUser]);

  const handleSubmitUser = (e) => {
    console.log(selectedUser);
    e.preventDefault();
    if (selectedUser) {
      // Nếu có selectedUser, gọi API cập nhật
      dispatch(
        updateMembersType({
          membersTypeid: selectedUser.maChuDe,
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
      {selectedUser && (
        <Button
          variant="success"
          onClick={() => {
            setSelectedUser(null);
          }}
        >
          Thêm
        </Button>
      )}
      <form onSubmit={handleSubmitUser} className="form-group custom-form">
        <label>Ten chu de</label>
        <input
          name="tenChuDe"
          required
          value={membersType.tenChuDe}
          onChange={handleOnchangeUserValue}
          type="text"
          className="form-control"
        ></input>
        <br />

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
