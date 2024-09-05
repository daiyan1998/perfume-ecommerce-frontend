import { changeMl, changePrice } from "@/slices/select";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

const ChangeProductMl = ({ product }) => {
  const { ml, price } = useSelector((state) => state.select);
  const dispatch = useDispatch();
  // @desc Handle price change.
  const handleChange = (event) => {
    dispatch(changePrice(event.target.value));
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Quantity</InputLabel>
          {/* selecting perfume price by clicking on ml */}
          <Select value={price} label="Quantity" onChange={handleChange}>
            {product.priceByMl?.map((x) => {
              return (
                <MenuItem
                  key={x.ml}
                  value={x.price}
                  onClick={() => dispatch(changeMl(x.ml))}
                >
                  {x.ml}ML
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Typography variant="h4">৳{price || 0}</Typography>
    </>
  );
};

export default ChangeProductMl;
