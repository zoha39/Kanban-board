import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statuses: [
    {
      id: "todo",
      name: "To Do",
    },
    {
      id: "in-progress",
      name: "In Progress",
    },
    {
      id: "completed",
      name: "Completed",
    },
  ],
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    addStatus: (state, action) => {
      state.statuses.push({
        id: crypto.randomUUID(),
        name: action.payload,
      });
    },
  },
});

export const { addStatus } = statusSlice.actions;

export default statusSlice.reducer;
