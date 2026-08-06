import { useSelector } from "react-redux";
import StatusColumn from "./StatusColumn";
import { DndContext } from "@dnd-kit/core";

const TaskBoard = () => {
  const statuses = useSelector((state) => state.status.statuses);

  return (
    <DndContext
      onDragStart={(event) => {
        console.log("Dragging:", event.active.id);
      }}
      onDragEnd={(event) => {
        console.log(event);
      }}
    >
      <div className="flex gap-5 overflow-x-auto pb-4">
        {statuses.map((status) => (
          <StatusColumn key={status.id} status={status} />
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
