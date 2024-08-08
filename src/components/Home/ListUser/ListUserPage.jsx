import React, { useEffect } from "react";
import { fetchListUser, clearFetchError } from "./ListUserSlice";
import { useDispatch, useSelector } from "react-redux";

const ListUserPage = () => {
  const state = useSelector((state) => state.listUser);

  const dispatch = useDispatch();

  useEffect(() => {
    // Clear error when component mounts
    dispatch(clearFetchError());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchListUser(1)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        // console.log(result);
      }
    });
  }, [dispatch]);

  return (
    <div>
      <div>
        <div>ListUserPage</div>
        {state.fetch.loading && <div>Loading...</div>}
        {state.fetch.error && <div>Error: {state.error}</div>}
        {state.fetch.listUser &&
          state.fetch.listUser.map((list, i) => (
            <div key={i}>{list.username}</div>
          ))}
      </div>
    </div>
  );
};

export default ListUserPage;
