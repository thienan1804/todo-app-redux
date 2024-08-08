import React from "react";
import ListUserPage from "./ListUser/ListUserPage";
import { Divider } from "antd";
import AddUserPage from "./ListUser/AddUserPage";

const HomePage = () => {
  return (
    <div>
      <ListUserPage />
      <Divider />
      <AddUserPage />
    </div>
  );
};

export default HomePage;
