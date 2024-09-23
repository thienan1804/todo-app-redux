import React, { useEffect, useState } from "react";
import {
  fetchListMembersType,
  clearFetchError,
  deleteMembersType,
  clearDeleteError,
} from "./ListUserSlice";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./ListUserPage.scss";
import { Divider } from "antd";
import AddUserPage from "./AddUserPage";

const ListUserPage = () => {
  const state = useSelector((state) => state.listUser);

  const dispatch = useDispatch();

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearFetchError());
  }, [dispatch]);

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearDeleteError());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListMembersType(1)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        // console.log(result);
      }
    });
  }, [dispatch]);

  // delete
  const handleDelete = (memberId) => {
    dispatch(deleteMembersType(memberId)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        alert("Xóa thành công");
        dispatch(fetchListMembersType(1));
      } else {
        alert("Xóa thất bại: " + result.error.message);
      }
    });
  };

  // Edit
  const [selectedUser, setSelectedUser] = useState(null); // Tạo state để lưu trữ người dùng được chọn
  const handleEdit = (type) => {
    setSelectedUser(type); // Đặt thành viên được chọn vào state
  };

  return (
    <div>
      <div>
        {state.fetch.loading && <div>Loading...</div>}
        {state.fetch.error && <div>Error: {state.error}</div>}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ma Chu De</th>
              <th>Ten Chu De</th>
              <th>Feature</th>
            </tr>
          </thead>
          {state.fetch.listMembersType &&
            state.fetch.listMembersType.map((type, i) => (
              <tbody key={i}>
                <tr>
                  <td>{type.maChuDe}</td>
                  <td>{type.tenChuDe}</td>
                  <td>
                    <Button onClick={() => handleEdit(type)} variant="warning">
                      Sửa
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(type.maChuDe)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      </div>
      <Divider />
      <AddUserPage
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default ListUserPage;
