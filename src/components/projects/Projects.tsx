import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getTrackerData } from "../../redux/tracketDataSlice";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";

export interface ProjectsProps {}

export interface Item {
  id: number;
  title: string;
  userId: number;
}

const Projects: React.FC<ProjectsProps> = () => {
  const { user } = useSelector((state: RootState) => state.authentication);
  const { data, isLoading } = useSelector(
    (state: RootState) => state.trackerData
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user.id) {
      dispatch(getTrackerData({ userId: user.id }));
    }
  }, [user, dispatch]);

  return (
    <Box
      sx={{
        p: 4.6,
      }}
    >
      {!isLoading ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flex: "1", color: "var(--darker-blue)" }}
            >
              Project
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{ ml: 5, color: "var(--darker-blue)" }}
            >
              Time Status
            </Typography>
          </Box>
          {data && data.length > 0 ? (
            data.map((item: any, index: any) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pt: 1,
                  pb: 1,
                  borderBottom: "1px solid var(--darker-blue)",
                }}
                key={index}
              >
                <Typography variant="body1" component="div" sx={{ flex: "1" }}>
                  {item.title}
                </Typography>
                <Typography variant="body1" component="div" sx={{ ml: 5 }}>
                  <Typography variant="body1" component={"span"}>
                    {("0" + Math.floor((item.time / 60000) % 60)).slice(-2)}:
                  </Typography>
                  <Typography variant="body1" component={"span"}>
                    {("0" + Math.floor((item.time / 1000) % 60)).slice(-2)}
                  </Typography>
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body1" component={"span"}>
              You haven't tracked anything yet
            </Typography>
          )}
        </>
      ) : (
        <Box sx={{ width: "100%", mt: 10 }}>
          <LinearProgress />
        </Box>
      )}
    </Box>
  );
};

export default Projects;
