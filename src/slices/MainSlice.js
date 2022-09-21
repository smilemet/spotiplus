/**
 * 메인페이지 곡 리스트를 저장하여 axios 요청을 매번 하지 않고 바로 출력하도록 관리한다.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://api.spotify.com/v1/playlists";
const gTop50_playlist = "/37i9dQZEVXbMDoHDwVN2tF";

export const getList = createAsyncThunk("MainSlice/getList", async (payload = null) => {
  let result = null;

  try {
    console.log("---새 정보 가져오기---");
    result = await axios.get(URL + gTop50_playlist, {
      headers: {
        Authorization: `Bearer ${payload}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    result = err.response;
    console.error(`-----MainSlice 에러-----\n ${err}`);
  }

  return result;
});

const MainSlice = createSlice({
  name: "mainList",
  initialState: {
    data: null,
    mainTop: null,
    mainList: null,
    loading: false,
    error: null,
  },
  reducers: {
    setMainTop: (state, action) => {
      return { ...state, mainTop: action.payload };
    },
    setMainList: (state, action) => {
      return { ...state, mainList: action.payload };
    },
  },
  extraReducers: {
    [getList.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getList.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        data: payload.data,
        mainTop: payload.data.tracks.items.splice(0, 1)[0],
        mainList: payload.data.tracks.items,
        loading: false,
        error: null,
      };
    },
    [getList.rejected]: (state, { payload }) => {
      return {
        ...state,
        mainList: payload?.data,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "Server Error",
        },
      };
    },
  },
});

export const { setMainTop, setMainList } = MainSlice.actions;
export default MainSlice.reducer;
