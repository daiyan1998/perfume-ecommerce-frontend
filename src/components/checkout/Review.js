import * as React from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Review({ cart }) {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary="4 selected" />
          <Typography variant="body2">{cart.itemsPrice}</Typography>
        </ListItem>
        {/* <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">$9.99</Typography>
        </ListItem> */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {cart.itemsPrice}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>
            {cart.shippingAddress.firstName} {cart.shippingAddress.lastName}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {cart.shippingAddress.address}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            <React.Fragment>
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                sx={{ width: "100%", mb: 1 }}
              >
                <Typography variant="body1" color="text.secondary">
                  Payment Method
                </Typography>
                <Typography variant="body2">{cart.paymentMethod}</Typography>
              </Stack>
            </React.Fragment>
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
