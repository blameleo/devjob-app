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
import { useEffect } from "react";

const jobsCollectionRef = collection(db, "jobs");

const usersCollectionRef = collection(db, "users");

const initialState = {
  users: "",
};

export const UserSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      console.log(action.payload);
      state.users = [...state.users, action.payload];
      try {
        addDoc(usersCollectionRef, action.payload);
      } catch (err) {
        console.log(err);
      }
    },
    getUsers: (state, action) => {
      console.log(action);
      state.users = action.payload;
      console.log(state.users);
    },
  },
});

export const { addUser, getUsers } = UserSlice.actions;

export default UserSlice.reducer;
