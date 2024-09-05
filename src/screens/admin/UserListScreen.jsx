"use client";
import Loading from "@/components/Loading";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "@/slices/userApiSlice";
import { Check, Delete, EditNote, NoAccounts } from "@mui/icons-material";
import {
  Alert,
  Button,
  Box,
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
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  return (
    <Container sx={{ mt: 10 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Users</Typography>
      </Stack>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Alert severity="error">{error?.data?.message}</Alert>
      ) : (
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
              {users.map((user) => (
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
            </TableBody>
          </Table>
        </TableContainer>
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
