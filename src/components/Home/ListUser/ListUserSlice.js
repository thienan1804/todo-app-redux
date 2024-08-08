import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchListUser = createAsyncThunk(
    'listUser/fetchListUser',
    async (page, { rejectWithValue }) => {
        try {
            const config = {
                method: "GET",
                url: `${process.env.REACT_APP_API_BASE_URL}users?order=ASC&page=${page}&take=10`,
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export const addUser = createAsyncThunk(
    'listUser/addUser',
    async (userValue, { rejectWithValue }) => {
        const FormData = require("form-data");
        const data = new FormData();
        data.append("username", userValue.username);
        data.append("password", userValue.password);
        data.append("fullName", userValue.fullName);
        data.append("email", userValue.email);
        try {
            const config = {
                method: "post",
                url: `${process.env.REACT_APP_API_BASE_URL}users`,
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                    "Content-Type": "multipart/form-data",
                },
                data: data,
            };
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

const listUserSlice = createSlice({
    name: 'listUser',
    initialState: {
        fetch: {
            loading: false,
            error: null,
            listUser: [],
        },
        add: {
            loading: false,
            error: null,
            isSuccess: null,
        },
    },
    reducers: {
        clearFetchError: (state) => {
            state.fetch.error = null;
        },
        clearAddError: (state) => {
            state.add.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users Cases
            .addCase(fetchListUser.pending, (state) => {
                state.fetch.loading = true;
                state.fetch.error = null;  // Reset error when a new request is sent
            })
            .addCase(fetchListUser.fulfilled, (state, action) => {
                state.fetch.loading = false;
                state.fetch.listUser = action.payload.data;
                state.fetch.error = null;
            })
            .addCase(fetchListUser.rejected, (state, action) => {
                state.fetch.loading = false;
                state.fetch.listUser = [];
                state.fetch.error = action.payload ? action.payload.message : action.error.message;
            })

            // Add User Cases
            .addCase(addUser.pending, (state) => {
                state.add.loading = true;
                state.add.error = null;  // Reset error when a new request is sent
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.add.loading = false;
                state.fetch.listUser = [...state.fetch.listUser, action.payload]; // Append new user to the list
                state.add.isSuccess = action.payload;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.add.loading = false;
                state.add.error = action.payload ? action.payload.message : action.error.message;
            });
    },
})

export const { clearFetchError, clearAddError } = listUserSlice.actions;
export default listUserSlice.reducer;
