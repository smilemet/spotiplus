import { configureStore } from "@reduxjs/toolkit";
import MainSlice from "./slices/MainSlice.js";
import TokenSlice from "./slices/TokenSlice.js";

const store = configureStore({
  reducer: {
    token: TokenSlice,
    mainList: MainSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
