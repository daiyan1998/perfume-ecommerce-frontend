"use client";
import Loading from "@/components/Loading";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/slices/userApiSlice";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  ReportGmailerrorred,
  Visibility,
} from "@mui/icons-material";
import { Check, Delete, EditNote, NoAccounts } from "@mui/icons-material";
import {
  Alert,
  Button,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Modal,
  TextField,
  Checkbox,
  FormControlLabel,
  Box,
  TableFooter,
  TablePagination,
  useTheme,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TablePaginationActions = (props) => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
};

const UserListScreen = () => {
  // redux calls
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDeleteUser }] =
    useDeleteUserMutation();

  // functions and handlers
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setrowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h3">Users</Typography>
      </Stack>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Alert severity="error">{error?.data?.message}</Alert>
      ) : (
        <Paper variant="outlined">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? users.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                ).map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user._id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.isAdmin ? (
                        <Check color="success" />
                      ) : (
                        <NoAccounts color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      <UserEditModal user={user} refetch={refetch} />
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteHandler(user._id)}>
                          <Delete color="error" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={users.length}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  );
};

const UserEditModal = ({ user, refetch }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isCheked, setIsCheked] = useState(false);

  useEffect(() => {
    setIsCheked(user.isAdmin);
  }, []);

  // redux calls
  const [updateUser, { isLoading: loadingUpdateUser }] =
    useUpdateUserMutation();

  // function and handler
  const updateHandler = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const updatedUser = {
      id: user._id,
      name: data.get("name"),
      email: data.get("email"),
      isAdmin: isCheked,
    };
    const result = await updateUser(updatedUser);
    if (result.error) {
      toast.error(result.error?.data?.message);
    } else {
      toast.success("User Updated");
      refetch();
      handleClose();
    }
  };
  // style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    "& .MuiTextField-root": { mb: 2 },
  };
  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={handleOpen}>
          <EditNote />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={updateHandler}>
          <Box sx={style}>
            <Typography variant="h6" mb={4}>
              User Details
            </Typography>
            <TextField label="Name" name="name" defaultValue={user.name} />
            <TextField label="Email" name="email" defaultValue={user.email} />
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isAdmin"
                    onChange={() => setIsCheked(!isCheked)}
                    checked={isCheked}
                  />
                }
                label="Admin"
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              disabled={loadingUpdateUser}
            >
              {loadingUpdateUser ? "Loading.." : "Update"}
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default UserListScreen;
