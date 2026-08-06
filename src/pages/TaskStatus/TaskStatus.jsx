import MainLayout from "../../layouts/MainLayout";
import TaskBoard from "../../components/board/TaskBoard";

const TaskStatus = () => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">TASK STATUS BOARD</h1>

      <TaskBoard />
    </MainLayout>
  );
};

export default TaskStatus;
