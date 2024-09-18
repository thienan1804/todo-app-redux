import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchListMembersType = createAsyncThunk(
    'listMembersType/fetchListMembersType',
    async (page, { rejectWithValue }) => {
        try {
            const config = {
                method: "GET",
                url: `${process.env.REACT_APP_API_BASE_URL}member-ship-type/gets?order=ASC&page=${page}&take=10`,
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

export const addMembersType = createAsyncThunk(
    'listMembersType/addMembersType',
    async (userValue, { rejectWithValue }) => {
        try {
            const config = {
                method: "post",
                url: `${process.env.REACT_APP_API_BASE_URL}member-ship-type/create`,
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
                data: userValue,
            };
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

export const deleteMembersType = createAsyncThunk(
    'listMembersType/deleteMembersType',
    async (memberId, { rejectWithValue }) => {
        try {
            const config = {
                method: "delete",
                url: `${process.env.REACT_APP_API_BASE_URL}member-ship-type/delete?id=${memberId}`,
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
            };
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

export const updateMembersType = createAsyncThunk(
    'listMembersType/updateMembersType',
    async ({ membersTypeid, membersTypeValue }, { rejectWithValue }) => {
        try {
            const config = {
                method: "put",
                url: `${process.env.REACT_APP_API_BASE_URL}member-ship-type/update?id=${membersTypeid}`,
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
                data: membersTypeValue,
            };
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
)

const listMembersTypeSlice = createSlice({
    name: 'listMembersType',
    initialState: {
        fetch: {
            loading: false,
            error: null,
            listMembersType: [],
        },
        add: {
            loading: false,
            error: null,
            isSuccess: null,
        },
        delete: {
            loading: false,
            error: null,
            isDeleted: null
        },
        update: {
            loading: false,
            error: null,
            isUpdated: null,
        },
    },
    reducers: {
        clearFetchError: (state) => {
            state.fetch.error = null;
        },
        clearAddError: (state) => {
            state.add.error = null;
        },
        clearDeleteError: (state) => {
            state.delete.error = null;
        },
        clearUpdateError: (state) => {
            state.update.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users Cases
            .addCase(fetchListMembersType.pending, (state) => {
                state.fetch.loading = true;
                state.fetch.error = null;
            })
            .addCase(fetchListMembersType.fulfilled, (state, action) => {
                state.fetch.loading = false;
                state.fetch.listMembersType = action.payload.data;
                state.fetch.error = null;
            })
            .addCase(fetchListMembersType.rejected, (state, action) => {
                state.fetch.loading = false;
                state.fetch.listMembersType = [];
                state.fetch.error = action.payload ? action.payload.message : action.error.message;
            })

            // Add User Cases
            .addCase(addMembersType.pending, (state) => {
                state.add.loading = true;
                state.add.error = null;
            })
            .addCase(addMembersType.fulfilled, (state, action) => {
                state.add.loading = false;
                state.add.isSuccess = action.payload;
                // Dispatch lại fetchListMembersType để refresh danh sách
                fetchListMembersType(1);
            })
            .addCase(addMembersType.rejected, (state, action) => {
                state.add.loading = false;
                state.add.error = action.payload ? action.payload.message : action.error.message;
            })

            // Delete Member Cases
            .addCase(deleteMembersType.pending, (state) => {
                state.delete.loading = true;
                state.delete.error = null;
            })
            .addCase(deleteMembersType.fulfilled, (state, action) => {
                state.delete.loading = false;
                state.delete.isDeleted = true;
                // Dispatch lại fetchListMembersType để refresh danh sách
                fetchListMembersType(1);
            })
            .addCase(deleteMembersType.rejected, (state, action) => {
                state.delete.loading = false;
                state.delete.error = action.payload ? action.payload.message : action.error.message;
            })

            // Update Member Cases
            .addCase(updateMembersType.pending, (state) => {
                state.update.loading = true;
                state.update.error = null;
            })
            .addCase(updateMembersType.fulfilled, (state, action) => {
                state.update.loading = false;
                state.update.isSuccess = true;
                fetchListMembersType(1); // Cập nhật danh sách sau khi sửa thành công
            })
            .addCase(updateMembersType.rejected, (state, action) => {
                state.update.loading = false;
                state.update.error = action.payload ? action.payload.message : action.error.message;
            });
    },
})

export const { clearFetchError, clearAddError, clearDeleteError, clearUpdateError } = listMembersTypeSlice.actions;
export default listMembersTypeSlice.reducer;
