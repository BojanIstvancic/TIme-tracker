import { Box } from "@mui/system";
import SideBar from "../sidebar/SideBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FunctionComponent<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <SideBar />
      <Box sx={{ marginLeft: "200px" }}>{children}</Box>
    </>
  );
};

export default MainLayout;
