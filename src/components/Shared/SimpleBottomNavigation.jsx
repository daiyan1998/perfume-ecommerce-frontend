import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Container } from '@mui/material';
import { House, Person, ShoppingCart, Store } from '@mui/icons-material';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Container>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<House />} />
        <BottomNavigationAction label="Shop" icon={<Store />} />
        <BottomNavigationAction label="Cart" icon={<ShoppingCart />} />
        <BottomNavigationAction label="Account" icon={<Person />} />
      </BottomNavigation>
    </Container>
  );
}