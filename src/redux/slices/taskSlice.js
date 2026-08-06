import { createSlice } from "@reduxjs/toolkit";
import { loadTasks } from "../../services/storageService";

const initialState = {
  tasks: loadTasks(), //already saved tasks need to be loaded
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload); //this line changes the data
    },

    moveTask: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, moveTask } = taskSlice.actions;

export default taskSlice.reducer;
