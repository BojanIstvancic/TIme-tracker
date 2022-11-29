import Projects from "../../components/projects/Projects";
import StopWatch from "../../components/stopWatch/StopWatch";

const TrackerPage: React.FC<{}> = () => {
  return (
    <>
      <StopWatch />
      <Projects />
    </>
  );
};

export default TrackerPage;
