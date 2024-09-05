import styled from "@emotion/styled";
import { Button, Container, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const Banner = (props) => {
  Banner.propTypes = {
    imgUrl: PropTypes.string,
  };
  const Background = styled("div")(() => ({
    backgroundImage: `url(${props.imgUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "500px",
    width: "auto",
    objectFit: "contain",
    color: "white",
    display: "flex",
    alignItems: "center",
    margin: "2rem auto",
  }));

  return (
    <Background>
      <Container
        sx={{
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Style Destination</Typography>
        <Typography variant="h1">Special Perfume</Typography>
        <Typography variant="h6">
          Aliqua id fugiat irure ex duis ea quis id quis ad et. <br /> Sunt qui
          esse pariatur duis deserunt
        </Typography>
        <Button
          variant="outlined"
          size="large"
          sx={{ mt: 3, color: "white", borderColor: "white" }}
        >
          Shop Now
        </Button>
      </Container>
    </Background>
  );
};

export default Banner;
