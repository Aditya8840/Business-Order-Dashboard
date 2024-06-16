import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder } from '../store/order/slice';
import {
  Box,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import { Pagination } from '@mui/material';

const OrderList = ({ orders, page, rowsPerPage, setEditOrderId }) => {
  const dispatch = useDispatch();

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Order Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer_name}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.quantity}</TableCell>
              <TableCell>${order.order_value}</TableCell>
              <TableCell>
              <Box display="flex" alignItems="center">
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => setEditOrderId(order.id)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={() => handleDelete(order.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderList;