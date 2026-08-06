import { Card, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { WORK_TYPE_CONFIG } from "../../utils/workTypeConfig";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import stripHtml from "../../utils/stripHtml";

const TaskCard = ({ task }) => {
  const workType = WORK_TYPE_CONFIG[task.workType];

  const WorkTypeIcon = workType?.icon;
  const description = stripHtml(task.description);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
      data: {
        type: "task",
        statusId: task.statusId,
      },
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: transform ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        hoverable
        size="small"
        className="mb-3 cursor-grab active:cursor-grabbing"
      >
        <h3 className="font-semibold text-[15px]">{task.title}</h3>

        <p className="text-gray-500 text-sm mt-1">{task.space}</p>

        {description && (
          <p className="text-gray-600 text-sm mt-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex justify-between items-center mt-4">
          <Tag className="flex items-center gap-1">
            {/* //conditional rendering */}
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
      </Card>
    </div>
  );
};

export default TaskCard;
