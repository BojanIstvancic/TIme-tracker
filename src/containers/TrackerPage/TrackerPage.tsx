import Projects from "../../components/projects/Projects";
import StopWatch from "../../components/stopWatch/StopWatch";

export interface TrackerPageProps {}

const TrackerPage: React.FC<TrackerPageProps> = () => {
  return (
    <>
      <StopWatch />
      <Projects />
    </>
  );
};

export default TrackerPage;
