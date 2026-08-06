import { Modal, Form, Input, Select, DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateTaskModal } from "../../../redux/slices/modalSlice";
import {
  Zap,
  Bookmark,
  SquareCheckBig,
  ChevronDown,
  Minus,
  ChevronUp,
  Circle,
  LoaderCircle,
  CircleCheckBig,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { addTask } from "../../../redux/slices/taskSlice";
import { notification } from "antd";
import RichTextEditor from "../../editor/RichTextEditor";

const CreateTaskModal = () => {
  const dispatch = useDispatch();

  const open = useSelector((state) => state.modal.createTaskOpen);
  const statuses = useSelector((state) => state.status.statuses);

  const [form] = Form.useForm();

  const getStatusOption = (status) => {
    const icons = {
      todo: <Circle size={16} className="text-gray-500" />,
      "in-progress": <LoaderCircle size={16} className="text-blue-500" />,
      completed: <CircleCheckBig size={16} className="text-green-500" />,
    };

    return {
      value: status.id,
      label: (
        <div className="flex items-center gap-2">
          {icons[status.id] || <Circle size={16} />}
          {status.name}
        </div>
      ),
    };
  };

  return (
    <Modal
      title="Create Task"
      open={open}
      onCancel={() => dispatch(closeCreateTaskModal())}
      onOk={() => form.submit()}
      okText="Create"
      cancelText="Cancel"
      destroyOnHidden
    >
      <p className="mb-5 text-gray-500">Required fields are marked with *</p>

      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          dispatch(
            addTask({
              id: uuidv4(),
              ...values,
              dueDate: values.dueDate
                ? values.dueDate.format("YYYY-MM-DD")
                : null,
              createdAt: new Date().toISOString(),
            }),
          );

          notification.success({
            title: "Task Created",
            description: "Your task has been created successfully.",
          });

          dispatch(closeCreateTaskModal());
          form.resetFields();
        }}
      >
        <Form.Item
          label="Task Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter a task title",
            },
          ]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          label="Space"
          name="space"
          rules={[
            {
              required: true,
              message: "Please enter a space",
            },
          ]}
        >
          <Input placeholder="Enter space" />
        </Form.Item>

        <Form.Item
          label="Work Type"
          name="workType"
          rules={[
            {
              required: true,
              message: "Select a work type",
            },
          ]}
        >
          <Select
            placeholder="Select work type"
            options={[
              {
                value: "Epic",
                label: (
                  <div className="flex items-center gap-2">
                    <Zap
                      size={16}
                      className="text-purple-500 fill-purple-500"
                    />
                    Epic
                  </div>
                ),
              },
              {
                value: "Task",
                label: (
                  <div className="flex items-center gap-2">
                    <SquareCheckBig size={16} className="text-blue-500" />
                    Task
                  </div>
                ),
              },
              {
                value: "Story",
                label: (
                  <div className="flex items-center gap-2">
                    <Bookmark
                      size={16}
                      className="text-green-500 fill-green-500"
                    />
                    Story
                  </div>
                ),
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Priority" name="priority" initialValue="Medium">
          <Select
            options={[
              {
                value: "Low",
                label: (
                  <div className="flex items-center gap-2">
                    <ChevronDown size={16} className="text-green-500" />
                    Low
                  </div>
                ),
              },
              {
                value: "Medium",
                label: (
                  <div className="flex items-center gap-2">
                    <Minus size={16} className="text-yellow-500" />
                    Medium
                  </div>
                ),
              },
              {
                value: "High",
                label: (
                  <div className="flex items-center gap-2">
                    <ChevronUp size={16} className="text-red-500" />
                    High
                  </div>
                ),
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Status" name="statusId" initialValue="todo">
          <Select options={statuses.map(getStatusOption)} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <RichTextEditor />
        </Form.Item>

        <Form.Item label="Due Date" name="dueDate">
          <DatePicker className="w-full" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTaskModal;
