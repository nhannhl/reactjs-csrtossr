import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testApi from "../api/testApi";

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (payload, thunkAPI) => {
    let response = null;
    try {
      response = await testApi.getUsers();
    } catch(err) {
      response = thunkAPI.rejectWithValue(err);
    }
    return response;
  }
);

export const fetchDetailUser = createAsyncThunk(
  "user/fetchDetailUser",
  async (payload, thunkAPI) => {
    let response = null;
    try {
      response = await testApi.getUser(payload);
      console.log(response);
    } catch(err) {
      response = thunkAPI.rejectWithValue(err);
    }
    return response;
  }
);

const initialState = {
  users: [],
  userDetail: null,
  isFetching: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initState: (state) => ({ ...state, ...initialState }),
    setState: (state, { payload }) => ({ ...state, ...payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => ({ ...state, isFetching: true }))
      .addCase(fetchUsers.fulfilled, (state, action) => ({ ...state, isFetching: false, users: action.payload }))
      .addCase(fetchUsers.rejected, (state) => ({ ...state, isFetching: false }))
      .addCase(fetchDetailUser.pending, (state) => ({ ...state, isFetching: true }))
      .addCase(fetchDetailUser.fulfilled, (state, action) => ({ ...state, isFetching: false, userDetail: action.payload }))
      .addCase(fetchDetailUser.rejected, (state) => ({ ...state, isFetching: false }))
  },});

const { actions, reducer } = userSlice;
export const { initState, setState } = actions;
export default reducer;