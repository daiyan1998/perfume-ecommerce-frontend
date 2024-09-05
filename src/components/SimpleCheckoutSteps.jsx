"use client";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function SimpleCheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Container sx={{ py: 5 }}>
      <Stack direction="row" justifyContent="center" gap={3}>
        <Paper>
          {step1 ? (
            <Link href="/cart">
              <Button variant="text">Cart</Button>
            </Link>
          ) : (
            <Button variant="text">Cart</Button>
          )}
        </Paper>
        <Paper>
          {step2 ? (
            <Link href="/shipping">
              <Button>Shipping</Button>
            </Link>
          ) : (
            <Button variant="text" disabled>
              Shipping
            </Button>
          )}
        </Paper>
        <Paper>
          {step3 ? (
            <Link href="/paymentmethod">
              <Button variant="text">Payment Method</Button>
            </Link>
          ) : (
            <Button variant="text" disabled>
              Payment Method
            </Button>
          )}
        </Paper>
        <Paper>
          {step4 ? (
            <Link href="/placeorder">
              <Button variant="text">Place Order</Button>
            </Link>
          ) : (
            <Button variant="text" disabled>
              Place Order
            </Button>
          )}
        </Paper>
      </Stack>
    </Container>
  );
}
