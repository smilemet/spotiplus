import { configureStore } from "@reduxjs/toolkit";
import DetailSlice from "./slices/DetailSlice.js";
import MainSlice from "./slices/MainSlice.js";
import TokenSlice from "./slices/TokenSlice.js";

const store = configureStore({
  reducer: {
    token: TokenSlice,
    mainList: MainSlice,
    detail: DetailSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
