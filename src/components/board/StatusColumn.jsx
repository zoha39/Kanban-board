import { Card } from "antd";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

const StatusColumn = ({ status }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const columnTasks = tasks.filter((task) => task.statusId === status.id);
  const { setNodeRef } = useDroppable({
    id: status.id,
    data: {
      type: "column",
      statusId: status.id,
    },
  });

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
      <SortableContext
        items={columnTasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="space-y-3 min-h-75">
          {columnTasks.length === 0 ? (
            <p className="text-gray-400 text-sm">No tasks yet</p>
          ) : (
            columnTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </SortableContext>
    </Card>
  );
};

export default StatusColumn;
