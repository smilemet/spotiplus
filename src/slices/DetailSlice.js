/**
 * 특정 곡에 대한 상세 정보를 표시한다.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const track = "https://api.spotify.com/v1/tracks";
const audio = "https://api.spotify.com/v1/audio-features";

export const getDetail = createAsyncThunk("DetailSlice/getDetail", async (payload = null) => {
  let result = {};

  // 입력된 id를 바탕으로 해당 곡의 상세정보 가져오기
  try {
    payload.setIsLoading(true);

    result.track = await axios.get(`${track}/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    payload.setIsLoading(false);
  } catch (err) {
    result = err.response;
    payload.setIsLoading(false);
    console.err(`-----DetailSlice 에러-----\n ${err}`);
  }

  // 입력된 id를 바탕으로 해당 곡의 audio analysis 가져오기
  try {
    result.audio = await axios.get(`${audio}/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${payload.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    result = err.response;
    console.err(`-----DetailSlice 에러-----\n ${err}`);
  }

  return result;
});

const DetailSlice = createSlice({
  name: "detail",
  initialState: {
    track: null,
    audio: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearDetail: (state) => {
      return { ...state, track: null, audio: null };
    },
  },
  extraReducers: {
    [getDetail.pending]: (state, { payload }) => {
      return { ...state, loading: true };
    },
    [getDetail.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        track: payload?.track.data,
        audio: payload?.audio.data,
        loading: false,
        error: null,
      };
    },
    [getDetail.rejected]: (state, { payload }) => {
      return {
        ...state,
        track: payload?.track.data,
        audio: payload?.audio.data,
        loading: false,
        error: {
          code: payload?.status ? payload.status : 500,
          message: payload?.statusText ? payload.statusText : "Server Error",
        },
      };
    },
  },
});

export const { clearDetail } = DetailSlice.actions;
export default DetailSlice.reducer;
