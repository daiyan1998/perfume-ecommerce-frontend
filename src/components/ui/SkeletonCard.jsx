import { Card, CardContent, Skeleton, Stack } from "@mui/material";

const SkeletonCard = () => {
  return (
    <Card>
      <Stack>
        <Skeleton variant="rectangular" sx={{ height: 250, width: "100%" }} />
        <CardContent sx={{ textAlign: "center" }}>
          <Skeleton animation="wave" />
          <Skeleton variant="text" sx={{ fontSize: "1rem", mb: 2 }} />
          <Skeleton variant="rectangular" sx={{ height: "3.5rem" }} />
        </CardContent>
      </Stack>
    </Card>
  );
};

export default SkeletonCard;
