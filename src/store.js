import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "./slices/TokenSlice.js";

const store = configureStore({
  reducer: {
    token: TokenSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export default store;
