/**
 * 로그인 상태를 관리하고 새 토큰을 가져온다.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { Buffer } from "buffer";

const client_id = process.env.REACT_APP_CLIENT_ID;
const client_secret = process.env.REACT_APP_CLIENT_SECRETE;
const URL = "https://accounts.spotify.com/api/token";
const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

export const getToken = createAsyncThunk("TokenSlice/getToken", async () => {
  let result = null;

  // 토큰 가져오기 -> 앱 인증 방식
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
    console.log("hello"); // 지울것
    // 로컬에 토큰 저장
    localStorage.setItem("spotify_token", result.data.access_token);
  } catch (err) {
    result = err.response;
    console.error(err);
  }

  return result;
});

const TokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
    isLogIn: false,
    data: null,
    loading: false,
    error: null,
  },
  reducer: {
    setToken: (state, action) => {
      return { ...state, token: action.payload };
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

export default TokenSlice.reducer;
export const { setToken, setIsLogIn } = TokenSlice.actions;
