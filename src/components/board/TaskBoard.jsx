import { DndContext, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import StatusColumn from "./StatusColumn";
import { moveTask } from "../../redux/slices/taskSlice";

const TaskBoard = () => {
  const statuses = useSelector((state) => state.status.statuses);
  const tasks = useSelector((state) => state.tasks.tasks);

  const dispatch = useDispatch();

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const activeTask = tasks.find((task) => task.id === active.id);

    if (!activeTask) return;

    let updatedTasks = [...tasks];

    // CASE 1 : Dropped on a COLUMN

    if (over.data.current?.type === "column") {
      updatedTasks = updatedTasks.map((task) =>
        task.id === active.id
          ? {
              ...task,
              statusId: over.data.current.statusId,
            }
          : task,
      );
    }

    // CASE 2 : Dropped on another TASK
    else if (over.data.current?.type === "task") {
      const overTask = tasks.find((task) => task.id === over.id);

      if (!overTask) return;

      // ---------- Same Column ----------
      if (activeTask.statusId === overTask.statusId) {
        const oldIndex = updatedTasks.findIndex(
          (task) => task.id === active.id,
        );

        const newIndex = updatedTasks.findIndex((task) => task.id === over.id);

        updatedTasks = arrayMove(updatedTasks, oldIndex, newIndex);
      }

      // ---------- Different Column ----------
      else {
        updatedTasks = updatedTasks.map((task) =>
          task.id === active.id
            ? {
                ...task,
                statusId: overTask.statusId,
              }
            : task,
        );
      }
    }

    dispatch(moveTask(updatedTasks));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex gap-5 overflow-x-auto pb-4">
        {statuses.map((status) => (
          <StatusColumn key={status.id} status={status} />
        ))}
      </div>
    </DndContext>
  );
};

export default TaskBoard;
