import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
// import {collection,addDoc} from 'firebase/firestore'
import { collection, addDoc } from "firebase/firestore";

const jobsCollectionRef = collection(db, "jobs");

const usersCollectionRef = collection(db, "users");

const initialState = {
  jobs: [],
};

export const JobSlice = createSlice({
  name: "jobs",
  initialState: initialState,
  reducers: {
    addJob: async (state, action) => {
      try {
        await addDoc(jobsCollectionRef, action.payload);
      } catch (err) {
        console.log(err);
      }
    },

    addUser: async (state, action) => {
      try {
        await addDoc(usersCollectionRef, action.payload);
      } catch (err) {
        console.log(err);
      }
    },

    editJob: (state, action) => {},

    deleteJob: (state, action) => {},
  },
});

export const { addJob, editJob, deleteJob, addUser } = JobSlice.actions;

export default JobSlice.reducer;
