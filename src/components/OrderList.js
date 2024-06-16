import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder } from '../store/order/slice';
import { List, ListItem, ListItemText, Button, Typography, Box } from '@mui/material';

function OrderList({ setEditOrderId }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <List>
      {orders.map((order) => (
        <ListItem key={order.id} divider>
          <ListItemText
            primary={
              <Typography variant="h6">
                {order.customer_name}
              </Typography>
            }
            secondary={
              <React.Fragment>
                <Typography variant="body2">
                  Quantity: {order.quantity}
                </Typography>
                <Typography variant="body2">
                  Order Value: ${order.order_value}
                </Typography>
              </React.Fragment>
            }
          />
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
        </ListItem>
      ))}
    </List>
  );
}

export default OrderList;