import * as React from "react";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { ListItemIcon } from "@mui/material";
import Image from "next/image";

const products = [
  {
    name: "Professional plan",
    desc: "Monthly subscription",
    price: "$15.00",
  },
  {
    name: "Dedicated support",
    desc: "Included in the Professional plan",
    price: "Free",
  },
  {
    name: "Hardware",
    desc: "Devices needed for development",
    price: "$69.99",
  },
  {
    name: "Landing page template",
    desc: "License",
    price: "$49.99",
  },
];

function Info({ cart }) {
  return (
    <React.Fragment>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Total
      </Typography>
      <Typography variant="h4" gutterBottom>
        ৳{cart.itemsPrice}
      </Typography>
      <List disablePadding>
        {cart.cartItems?.map((product) => (
          <ListItem key={product.cartUniqueId} sx={{ py: 1, px: 0 }}>
            <ListItemIcon>
              <Image
                src={product.image}
                height={50}
                width={50}
                alt="product image"
              />
            </ListItemIcon>
            <ListItemText
              sx={{ mr: 2 }}
              primary={`${product.name} - ${product.ml}ML`}
            />
            <Typography variant="body1" fontWeight="medium">
              ৳{product.price} * {product.qty} = ৳{product.price * product.qty}
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

Info.propTypes = {
  totalPrice: PropTypes.string.isRequired,
};

export default Info;
