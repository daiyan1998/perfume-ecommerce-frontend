"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NavLink from "./NavLink";
import {
  AdminPanelSettings,
  ArrowDropDown,
  PermIdentityOutlined,
} from "@mui/icons-material";
import CartDrawer from "./Shared/CartDrawer";
import { Avatar, Button, Container } from "@mui/material";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { useLogoutMutation } from "@/slices/userApiSlice";
import { logout } from "@/slices/authSlice";
import { useRouter } from "next/navigation";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [avatarEl, setavatarEl] = useState(null);
  const [adminEl, setAdminEl] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const router = useRouter();

  const isAvatarOpen = Boolean(avatarEl);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const isAdminOpen = Boolean(adminEl);

  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const avatarClick = (e) => {
    setavatarEl(e.currentTarget);
  };

  const avatarClose = () => {
    setavatarEl(null);
  };

  const adminClick = (e) => {
    setAdminEl(e.currentTarget);
  };

  const adminClose = () => {
    setAdminEl(null);
  };

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      avatarClose();
      await logoutApiCall().unwrap();
      router.push("/login");
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar
        variant="none"
        sx={{ bgcolor: "white", color: "black" }}
        position="sticky"
      >
        <Container>
          <Toolbar>
            {/* NavLink Component */}
            <NavLink />
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CartDrawer />
              {/*Avatar Component */}

              {userInfo ? (
                <>
                  <Button
                    id="avatar-button"
                    aria-controls={isAvatarOpen ? "avatar-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={isAvatarOpen ? "true" : undefined}
                    endIcon={<ArrowDropDown />}
                    onClick={avatarClick}
                  >
                    <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
                      N
                    </Avatar>
                  </Button>
                  <Menu
                    id="avatar-menu"
                    anchorEl={avatarEl}
                    open={isAvatarOpen}
                    onClose={avatarClose}
                    MenuListProps={{
                      "aria-labelledby": "avatar-button",
                    }}
                  >
                    <Link href="/profile">
                      <MenuItem onClick={avatarClose}>Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </Menu>
                  {/*admin */}
                  {userInfo && userInfo.isAdmin && (
                    <>
                      <Button
                        aria-controls={isAdminOpen ? "admin-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={isAdminOpen ? "true" : undefined}
                        startIcon={<AdminPanelSettings />}
                        endIcon={<ArrowDropDown />}
                        onClick={adminClick}
                      >
                        Admin
                      </Button>
                      <Menu
                        id="admin-menu"
                        anchorEl={adminEl}
                        open={isAdminOpen}
                        onClose={adminClose}
                        onClick={adminClose}
                      >
                        <Link href="/admin/orderlist">
                          <MenuItem>Orders</MenuItem>
                        </Link>
                        <Link href="/admin/productlist">
                          <MenuItem>Products</MenuItem>
                        </Link>
                        <Link href="/admin/userlist">
                          <MenuItem>Users</MenuItem>
                        </Link>
                      </Menu>
                    </>
                  )}
                </>
              ) : (
                <Link href="/login">
                  <Button startIcon={<PermIdentityOutlined />}>Signin</Button>
                </Link>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              ></IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}
