import { Box, LinearProgress } from "@mui/material";
import React from "react";

const loading = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};

export default loading;
