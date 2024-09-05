"use client";
import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import { ArrowRightAlt } from "@mui/icons-material";
import Link from "next/link";

const breadcrumbsConstants = [
  {
    title: "Cart",
    link: "/cart",
  },
  {
    title: "Checkout",
    link: "/checkout",
  },
  {
    title: "Payment",
    link: "/payment",
  },
];

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    padding: 3,
    fontSize: "1.5rem",
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    cursor: "pointer",
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

function handleClick(event) {
  event.preventDefault();
}

export default function CartBreadcrumbs() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        sx={{ display: "flex", justifyContent: "center", my: "3rem" }}
        aria-label="breadcrumb"
        separator={<ArrowRightAlt />}
      >
        {breadcrumbsConstants.map(({ title, link }) => (
          <Link href={link} key={title}>
            <StyledBreadcrumb label={title} />
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
}
