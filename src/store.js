import { configureStore } from "@reduxjs/toolkit";
import SignSlice from "./slices/SignSlice.js";

const store = configureStore({
  reducer: {
    sign: SignSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
