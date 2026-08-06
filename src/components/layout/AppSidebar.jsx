import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  ClockCircleOutlined,
  StarOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;

const menuItems = [
  {
    key: "/",
    icon: <HomeOutlined />,
    label: "For You",
  },
  {
    key: "/recent",
    icon: <ClockCircleOutlined />,
    label: "Recent",
  },
  {
    key: "/starred",
    icon: <StarOutlined />,
    label: "Starred",
  },
  {
    key: "/task-status",
    icon: <ProfileOutlined />,
    label: "Task Status",
  },
];

const AppSidebar = () => {
  const collapsed = useSelector((state) => state.sidebar.collapsed);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={240}
      collapsedWidth={0}
    >
      <div className="text-white text-lg font-bold p-5">Jira Clone</div>

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default AppSidebar;
