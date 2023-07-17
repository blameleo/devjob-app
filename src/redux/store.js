import { configureStore } from "@reduxjs/toolkit";
import JobReducer from "./JobSlice";
import UserReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    jobs: JobReducer,
    users: UserReducer,
  },
});

export default store;
