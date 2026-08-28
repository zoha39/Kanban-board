import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createTaskOpen: false,
  editingTask: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,

  reducers: {
    openCreateTaskModal: (state, action) => {
      state.createTaskOpen = true;
      state.editingTask = action.payload || null;
    },

    closeCreateTaskModal: (state) => {
      state.createTaskOpen = false;
      state.editingTask = null;
    },
  },
});

export const { openCreateTaskModal, closeCreateTaskModal } = modalSlice.actions;

export default modalSlice.reducer;
