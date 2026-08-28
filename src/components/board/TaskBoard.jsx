import {
  DndContext,
  closestCorners,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import StatusColumn from "./StatusColumn";
import TaskCard from "./TaskCard";
import { moveTask } from "../../redux/slices/taskSlice";

const TaskBoard = () => {
  const statuses = useSelector((state) => state.status.statuses);
  const tasks = useSelector((state) => state.tasks.tasks);

  const dispatch = useDispatch();

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),

    useSensor(KeyboardSensor),
  );

  const handleDragStart = (event) => {
    const task = tasks.find((task) => task.id === event.active.id);

    setActiveTask(task);
  };

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveTask(null);

    if (!over) return;

    if (active.id === over.id) return;

    const activeTask = tasks.find((task) => task.id === active.id);

    if (!activeTask) return;

    let updatedTasks = [...tasks];

    // Dropped on a column
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

    // Dropped on another task
    else if (over.data.current?.type === "task") {
      const overTask = tasks.find((task) => task.id === over.id);

      if (!overTask) return;

      // Same column reorder
      if (activeTask.statusId === overTask.statusId) {
        const oldIndex = updatedTasks.findIndex(
          (task) => task.id === active.id,
        );

        const newIndex = updatedTasks.findIndex((task) => task.id === over.id);

        updatedTasks = arrayMove(updatedTasks, oldIndex, newIndex);
      }

      // Move to another column
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
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      onDragEnd={handleDragEnd}
    >
      <div
        className="
    min-h-screen
    bg-gray-100
    rounded-xl
    p-6
    overflow-x-auto
  "
      >
        <div
          className="
      flex
      gap-6
      items-start
      pb-4
    "
        >
          {statuses.map((status) => (
            <StatusColumn key={status.id} status={status} />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} isDraggingOverlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;
