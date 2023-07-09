import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase";
// import {collection,addDoc} from 'firebase/firestore'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const jobsCollectionRef = collection(db, "jobs");

const usersCollectionRef = collection(db, "users");

const initialState = {
  jobs: null,
};

export const JobSlice = createSlice({
  name: "jobs",
  initialState: initialState,
  reducers: {
    addJob: (state, action) => {
      try {
        addDoc(jobsCollectionRef, action.payload);
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

    getJobs: (state, action) => {
      state.jobs = action.payload;
    },

    editJob: (state, action) => {
      console.log(action.payload);
      // state.jobs = state.jobs.map((job) => {
      //   if (job.id === action.payload.id) {
      //     return action.payload.updatedJob;
      //   }
      //   return job;
      // });
      const jobDoc = doc(db, "jobs", action.payload.id);
      updateDoc(jobDoc, action.payload.updatedJob);
    },

    deleteJob: (state, action) => {
      console.log(action.payload);
      try {
        const jobDoc = doc(db, "jobs", action.payload);
        deleteDoc(jobDoc);
      } catch (err) {
        console.log(err);
      }
    },
  },
});

export const { addJob, editJob, deleteJob, addUser, getJobs } =
  JobSlice.actions;

export default JobSlice.reducer;
