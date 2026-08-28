import { Card, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { WORK_TYPE_CONFIG } from "../../utils/workTypeConfig";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import stripHtml from "../../utils/stripHtml";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { openCreateTaskModal } from "../../redux/slices/modalSlice";
import { STATUS_THEME } from "../../utils/statusThemeConfig";

const TaskCard = ({ task, isDraggingOverlay = false }) => {
  const workType = WORK_TYPE_CONFIG[task.workType];

  const theme = STATUS_THEME[task.statusId] || STATUS_THEME.default;

  const WorkTypeIcon = workType?.icon;
  const dispatch = useDispatch();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      disabled: isDraggingOverlay,
      data: {
        type: "task",
        statusId: task.statusId,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: transform ? 0.6 : 1,
  };

  const description = stripHtml(task.description);

  return (
    <div
      ref={isDraggingOverlay ? undefined : setNodeRef}
      style={isDraggingOverlay ? undefined : style}
      {...(!isDraggingOverlay && attributes)}
      {...(!isDraggingOverlay && listeners)}
    >
      <Card
        hoverable={!isDraggingOverlay}
        size="small"
        className={`
    mb-3
    rounded-xl
    border
    transition-all
    duration-200
    ${theme.cardBorder}

    ${
      isDraggingOverlay
        ? `
          shadow-xl
          scale-105
          rotate-2
          opacity-60
          cursor-grabbing
        `
        : `
          shadow-sm
          hover:-translate-y-1
          hover:shadow-md
          cursor-grab
          active:cursor-grabbing
        `
    }
  `}
      >
        <h3
          className="
    font-semibold
    text-sm
    text-gray-900
    leading-5
  "
        >
          {task.title}
        </h3>

        <p
          className="
    text-gray-500
    text-xs
    mt-2
  "
        >
          {task.space}
        </p>

        {description && (
          <p
            className="
      text-gray-600
      text-xs
      mt-3
      leading-5
      overflow-hidden
      line-clamp-2
      max-h-10
    "
          >
            {description}
          </p>
        )}

        <div className="flex justify-between items-center mt-4">
          <Tag className="flex items-center gap-1">
            {WorkTypeIcon && (
              <WorkTypeIcon
                size={14}
                className={`${workType.color} ${workType.fill}`}
              />
            )}

            {task.workType}
          </Tag>

          <Tag color="red">{task.priority}</Tag>
        </div>

        {task.dueDate && (
          <div className="flex items-center gap-2 mt-4 text-gray-500 text-xs">
            <CalendarOutlined />
            {task.dueDate}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button
            type="text"
            size="small"
            icon={<EditOutlined />}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(openCreateTaskModal(task));
            }}
          >
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TaskCard;
