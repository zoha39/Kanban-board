import { Card, Tag } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { WORK_TYPE_CONFIG } from "../../utils/workTypeConfig";

const TaskCard = ({ task }) => {
  const workType = WORK_TYPE_CONFIG[task.workType];

  const WorkTypeIcon = workType?.icon;

  return (
    <Card hoverable size="small" className="mb-3 cursor-pointer">
      <h3 className="font-semibold text-[15px]">{task.title}</h3>

      <p className="text-gray-500 text-sm mt-1">{task.space}</p>

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
    </Card>
  );
};

export default TaskCard;
