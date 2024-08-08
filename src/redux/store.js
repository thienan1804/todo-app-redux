

import { configureStore } from '@reduxjs/toolkit';
import filtersSlice from '../components/Filters/filtersSlice';
import todosSlice from '../components/TodoList/todosSlice';
import userSlice from '../components/Login/userSlice';
import listUserSlice from '../components/Home/ListUser/ListUserSlice';

const store = configureStore({
  reducer: {
    filters: filtersSlice.reducer,
    todoList: todosSlice.reducer,
    user: userSlice,
    listUser: listUserSlice,
  },
});

export default store;
