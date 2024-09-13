import * as React from "react";
import Button from "@mui/material/Button";
import { Badge, Box } from "@mui/material";
import styled from "@emotion/styled";
import Link from "next/link";
import MenuDrawer from "./MenuDrawer";

const pages = [
  {
    title: "Home",
    navigate: "/",
  },
  {
    title: "Shop",
    sub: ["Shop1", "shop2"],
    navigate: "/shop",
    developing: true,
  },
  // { title: "Blogs", sub: ["Blogs1"] },
];

export default function NavLink() {
  const NavBox = styled(Box)(() => ({
    position: "relative",
    "&:hover": {
      "& .showMenu": {
        display: "block",
        transform: "translateY(0px)",
      },
    },
  }));

  const NavMenu = styled(Box)(() => ({
    position: "absolute",
    textAlign: "center",
    display: "none",
    transform: "translateY(5px)",
    transitionDuration: 1,
  }));

  return (
    <Box display="flex">
      <Box display={{ md: "none", xs: "block" }}>
        <MenuDrawer />
      </Box>
      {pages.map(({ title, sub, navigate, developing }) => (
        <NavBox
          key={title}
          position="relative"
          sx={{ display: { md: "block", xs: "none" } }}
        >
          <Link href={navigate ? navigate : ""}>
            {developing ? (
              <Badge
                badgeContent="Developing"
                color="info"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Button
                  variant="text"
                  sx={{
                    color: "black",
                    fontSize: "1rem",
                    fontWeight: 300,
                  }}
                >
                  {title}
                </Button>
              </Badge>
            ) : (
              <Button
                variant="text"
                sx={{
                  color: "black",
                  fontSize: "1rem",
                  fontWeight: 300,
                }}
              >
                {title}
              </Button>
            )}
          </Link>
          {/* <NavMenu className="showMenu" bgcolor="white">
            {sub?.map((s) => {
              return (
                <Typography
                  sx={{
                    display: "block",
                    cursor: "pointer",
                    bgcolor: "white",
                    color: "black",
                    p: "1rem 2rem",
                    ":hover": {
                      bgcolor: "black",
                      color: "white",
                    },
                  }}
                  key={s}
                >
                  {s}
                </Typography>
              );
            })}
          </NavMenu> */}
        </NavBox>
      ))}
    </Box>
  );
}
