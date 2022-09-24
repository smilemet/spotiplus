import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Buffer } from "buffer";

const client_id = process.env.REACT_APP_CLIENT_ID;
const scope = "user-top-read";
const redirect_uri = process.env.REACT_APP_REDIRECT_URL + "/receipt";

const generateRandomString = (num) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const state = generateRandomString(16);

let URL = "https://accounts.spotify.com/authorize";
URL += "?response_type=token";
URL += "&client_id=" + encodeURIComponent(client_id);
URL += "&scope=" + encodeURIComponent(scope);
URL += "&redirect_uri=" + encodeURIComponent(redirect_uri);
URL += "&state=" + encodeURIComponent(state);

export const getAuthorization = {};

export const getUserToken = createAsyncThunk("RecieptSlice/getUserToken", async () => {
  let result = null;

  // 토큰 가져오기 -> Implicit Grant Flow
  try {
    result = await axios.post(URL, "grant_type=client_credentials");

    console.log(result);
  } catch (err) {
    result = err.response;
    console.error(`-----TokenSlice 에러-----\n ${err}`);
  }

  return result;
});

const RecieptSlice = createSlice({
  name: "userToken",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getUserToken.pending]: (state, { payload }) => {
      return { state, loading: true };
    },
    [getUserToken.fulfilled]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: null,
      };
    },
    [getUserToken.rejected]: (state, { payload }) => {
      return {
        data: payload?.data,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "Server Error",
        },
      };
    },
  },
});

export default RecieptSlice.reducer;
