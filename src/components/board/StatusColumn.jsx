import { Card } from "antd";
import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import { STATUS_THEME } from "../../utils/statusThemeConfig";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

const StatusColumn = ({ status }) => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const columnTasks = tasks.filter((task) => task.statusId === status.id);
  const theme = STATUS_THEME[status.id] || STATUS_THEME.default;

  const { setNodeRef, isOver: droppableIsOver } = useDroppable({
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
          <span className="font-semibold tracking-wide">{status.name}</span>

          <span
            className={`
          px-2.5
          py-0.5
          rounded-full
          text-xs
          font-semibold
          bg-white/80
          ${theme.badge}
        `}
          >
            {columnTasks.length}
          </span>
        </div>
      }
      styles={{
        header: {
          borderBottom: "none",
          paddingInline: 20,
          paddingBlock: 16,
        },
        body: {
          padding: 16,
        },
      }}
      className={`
  overflow-hidden!
  w-[320px]
  min-w-[320px]
  rounded-2xl
  shadow-sm
  transition-all
  duration-200
  ${theme.column}
`}
    >
      <SortableContext
        items={columnTasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          ref={setNodeRef}
          className={`
  min-h-130
  space-y-4
  rounded-xl
  transition-all
  duration-200
  ${droppableIsOver ? "bg-white/40" : ""}
`}
        >
          {columnTasks.length === 0 ? (
            <div
              className="
    h-32
    flex
    items-center
    justify-center
    rounded-xl
    border
    border-dashed
    border-gray-300
    text-gray-400
    text-sm
    bg-white/40
  "
            >
              No tasks yet
            </div>
          ) : (
            columnTasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>
      </SortableContext>
    </Card>
  );
};

export default StatusColumn;
