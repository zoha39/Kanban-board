import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createTaskOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCreateTaskModal: (state) => {
      state.createTaskOpen = true;
    },

    closeCreateTaskModal: (state) => {
      state.createTaskOpen = false;
    },
  },
});

export const { openCreateTaskModal, closeCreateTaskModal } = modalSlice.actions;

export default modalSlice.reducer;
