import MainLayout from "../../components/mainLayout/MainLayout";
import TrackerRouter from "./TrackerRouter";

export interface TrackerProps {}

const Tracker: React.FC<TrackerProps> = () => {
  return (
    <MainLayout>
      <TrackerRouter />
    </MainLayout>
  );
};

export default Tracker;
