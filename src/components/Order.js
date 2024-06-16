import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile'; // Make sure to adjust path if necessary
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';
import { logout } from '../store/auth/slice';
import { clearOrders } from '../store/order/slice';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
} from '@mui/material';
import { green } from '@mui/material/colors';
import { NavigateBefore, NavigateNext } from '@mui/icons-material'; // Ensure these icons are imported correctly

const products = [
  { name: 'Product 1', price: 29 },
  { name: 'Product 2', price: 49 },
  { name: 'Product 3', price: 149 },
];

function Orders() {
  const { user } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.orders);
  const [editOrderId, setEditOrderId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Define rowsPerPage state

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.error('Error fetching user info:', err);
          dispatch(logout());
        });
    }
  }, [user, dispatch]);

  const totalOrderValue = orders.reduce((sum, order) => sum + order.order_value, 0);

  const handleLogout = () => {
    googleLogout();
    dispatch(logout());
    dispatch(clearOrders());
    localStorage.removeItem('orders');
  };

  const getFirstName = (fullName) => {
    return fullName ? fullName.split(' ')[0] : '';
  };

  const handleFormClose = () => {
    setIsAdding(false);
    setEditOrderId(null);
  };

  const handleProfileOpen = () => {
    setIsProfileOpen(true);
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Container>
      {/* Header */}
      <AppBar position="static" sx={{ marginBottom: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleProfileOpen}>
            My Profile
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* User Greeting and Total Order Value */}
      <Box sx={{ marginBottom: 4 }}>
        {userInfo && (
          <Typography variant="h5" gutterBottom>
            Hi {getFirstName(userInfo.name)}
          </Typography>
        )}
        <Paper elevation={3} sx={{ padding: 2, backgroundColor: green[50], display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">Total Order Value</Typography>
          <Typography variant="h6" color="green">
            ${totalOrderValue}
          </Typography>
        </Paper>
      </Box>

      {/* Orders Section */}
      <Box sx={{ marginBottom: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Orders</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsAdding(true)}
            sx={{ backgroundColor: green[500] }}
          >
            Add Order
          </Button>
        </Stack>
        <OrderList
          orders={orders}
          page={page}
          rowsPerPage={rowsPerPage}
          setEditOrderId={setEditOrderId}
        />
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Add or Edit Order Dialog */}
      {(isAdding || editOrderId) && (
        <Dialog open={isAdding || Boolean(editOrderId)} onClose={handleFormClose} fullWidth maxWidth="sm">
          <DialogTitle>{isAdding ? 'Add New Order' : 'Edit Order'}</DialogTitle>
          <DialogContent>
            <OrderForm
              editOrderId={editOrderId}
              setEditOrderId={setEditOrderId}
              onClose={handleFormClose}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleFormClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onClose={handleProfileClose} fullWidth maxWidth="sm">
        <DialogTitle>Profile</DialogTitle>
        <DialogContent>
          <Profile userInfo={userInfo} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProfileClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Orders;
