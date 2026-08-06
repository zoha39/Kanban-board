import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "./slices/sidebarSlice";
import modalReducer from "./slices/modalSlice";
import taskReducer from "./slices/taskSlice";
import { saveTasks } from "../services/storageService";
import statusReducer from "./slices/statusSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    modal: modalReducer,
    tasks: taskReducer,
    status: statusReducer,
  },
});

store.subscribe(() => {
  //run this callback whenever store changes
  saveTasks(store.getState().tasks.tasks);
});
