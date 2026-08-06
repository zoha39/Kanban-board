import { Layout, Button, Input } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";
import logo from "../../assets/logo.webp";
import { openCreateTaskModal } from "../../redux/slices/modalSlice";

const { Header } = Layout;
const { Search } = Input;

const AppHeader = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.sidebar.collapsed);

  return (
    <Header className="bg-white border-b border-gray-200 flex items-center px-2!">
      {/* Sidebar Toggle */}
      <Button
        type="text"
        icon={
          collapsed ? (
            <MenuUnfoldOutlined style={{ color: "white", fontSize: "20px" }} />
          ) : (
            <MenuFoldOutlined style={{ color: "white", fontSize: "20px" }} />
          )
        }
        onClick={() => dispatch(toggleSidebar())}
      />

      {/* Logo */}
      <img src={logo} alt="logo" className="h-8 w-auto object-contain"></img>

      {/* Search */}
      <div className="flex-1 flex justify-center px-8">
        <Search placeholder="Search..." style={{ maxWidth: 500 }} />
      </div>

      {/* Create Button */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => dispatch(openCreateTaskModal())}
      >
        Create
      </Button>
    </Header>
  );
};

export default AppHeader;
