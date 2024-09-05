import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import {
  Badge,
  Button,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

const constants = [
  {
    title: "Home",
    navigate: "",
  },
  {
    title: "Shop",
    navigate: "",
  },
  {
    title: "Blog",
    navigate: "",
  },
  {
    title: "About Us",
    navigate: "",
  },
  {
    title: "Contact Us",
    navigate: "",
  },
];

const attarBrand = [
  { title: "Elite Oud", navigate: "" },
  { title: "Arabian Oud", navigate: "" },
  { title: "Abdul Samad Al Quraishi", navigate: "" },
  { title: "Ajman", navigate: "" },
  { title: "Jonaid", navigate: "" },
];

// Tabs
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

// CustomTabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "15rem" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
          sx={{ width: "100%" }}
        >
          <Tab label="Menu" {...a11yProps(0)} />
          <Tab label="Category" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Stack>
          {constants.map((x) => (
            <>
              <Button sx={{ p: 2, justifyContent: "start" }}>{x.title}</Button>
              <Divider />
            </>
          ))}
        </Stack>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Stack>
          {attarBrand.map((x) => (
            <>
              <Button sx={{ p: 2, justifyContent: "start" }}>{x.title}</Button>
              <Divider />
            </>
          ))}
        </Stack>
      </CustomTabPanel>
    </Box>
  );
};

// Menu Drawer
export default function MenuDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => () => {
    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
          onClick={toggleDrawer("left", true)}
          variant="contained"
        >
          <Menu />
        </IconButton>
        <Drawer
          anchor="left"
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <BasicTabs />
        </Drawer>
      </>
    </div>
  );
}
