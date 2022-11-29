import MainLayout from "../../components/MainLayout";
import TrackerRouter from "./TrackerRouter";

const Tracker: React.FC<{}> = () => {
  return (
    <MainLayout>
      <TrackerRouter />
    </MainLayout>
  );
};

export default Tracker;
