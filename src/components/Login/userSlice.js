import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredential, { rejectWithValue }) => {
        try {
            var config = {
                method: "post",
                url: "http://118.69.126.49:8878/api/auth/login",
                headers: { "Content-Type": "application/json" },
                data: userCredential,
            };
            const response = await axios(config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;  // Reset error when a new request is sent
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
