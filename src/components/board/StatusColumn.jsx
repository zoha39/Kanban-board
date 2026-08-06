import { Card } from "antd";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

const StatusColumn = ({ status }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const columnTasks = tasks.filter((task) => task.statusId === status.id);
  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span className="font-semibold">{status.name}</span>

          <span className="text-gray-400 text-sm">{columnTasks.length}</span>
        </div>
      }
      className="min-w-[320px] bg-gray-50"
    >
      <div className="space-y-3">
        {columnTasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks yet</p>
        ) : (
          columnTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </Card>
  );
};

export default StatusColumn;
