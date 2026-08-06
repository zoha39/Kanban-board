import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import TaskStatus from "../pages/TaskStatus/TaskStatus";
import Recent from "../pages/Recent/Recent";
import Starred from "../pages/Starred/Starred";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/task-status" element={<TaskStatus />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
