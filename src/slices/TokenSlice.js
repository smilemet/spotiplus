/**
 * 앱 실행 시 Spotify의 Clent Credentials Flow에 따라 토큰을 가져온다.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Buffer } from "buffer";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRETE;
const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export const getToken = createAsyncThunk("TokenSlice/getToken", async () => {
  let result = null;

  // 토큰 가져오기 -> Client Credentials Flow
  try {
    result = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: "Basic " + auth,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        params: {
          grant_type: "client_credentials",
        },
      }
    );

    // 토큰을 로컬 스토리지에 저장 → 만료되기 전까지는 새 토큰 가져오지 않음
    const tokenObj = {
      value: result.data.access_token,
      expire: Date.now() + result.data.expires_in * 1000,
    };

    localStorage.setItem("spotify_token", JSON.stringify(tokenObj));
  } catch (err) {
    result = err.response;
    console.error(`-----TokenSlice 에러-----\n ${err}`);
  }

  return result;
});

const TokenSlice = createSlice({
  name: "token",
  initialState: {
    token: JSON.parse(localStorage.getItem("spotify_token"))?.value,
    expire: JSON.parse(localStorage.getItem("spotify_token"))?.expire,
    isLogIn: false,
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      return { ...state, token: action.payload.value, expire: action.payload.expire };
    },
    setIsLogIn: (state, action) => {
      return { ...state, isLogIn: action.payload };
    },
  },
  extraReducers: {
    [getToken.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getToken.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        error: null,
        token: payload?.data.access_token,
      };
    },
    [getToken.rejected]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        data: payload?.data,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "Server Error",
        },
      };
    },
  },
});

export const { setToken, setIsLogIn } = TokenSlice.actions;
export default TokenSlice.reducer;
