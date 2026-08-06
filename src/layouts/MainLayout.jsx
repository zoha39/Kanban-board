import { Layout } from "antd";
import AppHeader from "../components/layout/AppHeader";
import AppSidebar from "../components/layout/AppSidebar";
import CreateTaskModal from "../components/layout/modal/CreateTaskModal";

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AppHeader />

      <Layout>
        <AppSidebar />

        <Content style={{ padding: "24px" }}>{children}</Content>

        <CreateTaskModal />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
