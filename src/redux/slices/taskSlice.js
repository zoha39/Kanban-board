import { createSlice } from "@reduxjs/toolkit";
import { loadTasks } from "../../services/storageService";

const initialState = {
  tasks: loadTasks(),
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload); //this line changes the data
    },
  },
});

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
