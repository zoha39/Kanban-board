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

    updateTask: (state, action) => {
      const updatedTask = action.payload;

      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);

      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
  },
});

export const { addTask, moveTask, updateTask } = taskSlice.actions;

export default taskSlice.reducer;
