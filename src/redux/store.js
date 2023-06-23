import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "./JobSlice";

const store = configureStore({
  reducer: {
    jobs: JobReducer,
  },
});

export default store;
