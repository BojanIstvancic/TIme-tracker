import { Box } from "@mui/system";
import SideBar from "../SideBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <SideBar />
      <Box sx={{ marginLeft: "200px", minHeight: "100%" }}>{children}</Box>
    </>
  );
};

export default MainLayout;
