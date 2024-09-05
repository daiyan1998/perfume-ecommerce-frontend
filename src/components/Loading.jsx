import { Backdrop, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Backdrop sx={{ color: "#fff" }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
