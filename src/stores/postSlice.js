import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import testApi from "../api/testApi";

export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (payload, thunkAPI) => {
    let response = null;
    try {
      response = await testApi.getPosts();
    } catch(err) {
      response = thunkAPI.rejectWithValue(err);
    }
    return response;
  }
);

export const fetchDetailPost = createAsyncThunk(
  "post/fetchDetailPost",
  async (payload, thunkAPI) => {
    let response = null;
    try {
      response = await testApi.getPost(payload);
    } catch(err) {
      response = thunkAPI.rejectWithValue(err);
    }
    return response;
  }
);

export const fetchCommentOfPost = createAsyncThunk(
  "post/fetchCommentOfPost",
  async (payload, thunkAPI) => {
    let response = null;
    try {
      response = await testApi.getCommentOfPost(payload);
    } catch(err) {
      response = thunkAPI.rejectWithValue(err);
    }
    return response;
  }
);

const initialState = {
  posts: [],
  postDetail: null,
  comments: [],
  isFetching: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    initState: (state) => ({ ...state, ...initialState }),
    setState: (state, { payload }) => ({ ...state, ...payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => ({ ...state, isFetching: true }))
      .addCase(fetchPosts.fulfilled, (state, action) => ({ ...state, isFetching: false, posts: action.payload }))
      .addCase(fetchPosts.rejected, (state) => ({ ...state, isFetching: false }))
      .addCase(fetchDetailPost.pending, (state) => ({ ...state, isFetching: true }))
      .addCase(fetchDetailPost.fulfilled, (state, action) => ({ ...state, isFetching: false, postDetail: action.payload }))
      .addCase(fetchDetailPost.rejected, (state) => ({ ...state, isFetching: false }))
      .addCase(fetchCommentOfPost.pending, (state) => ({ ...state, isFetching: true }))
      .addCase(fetchCommentOfPost.fulfilled, (state, action) => ({ ...state, isFetching: false, comments: action.payload }))
      .addCase(fetchCommentOfPost.rejected, (state) => ({ ...state, isFetching: false }))
  },});

const { actions, reducer } = postSlice;
export const { initState, setState } = actions;
export default reducer;