import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, updateOrder } from '../store/order/slice';
import { TextField, Select, MenuItem, InputLabel, FormControl, Button, Box } from '@mui/material';

const products = [
  { name: 'Product 1', price: 29 },
  { name: 'Product 2', price: 49 },
  { name: 'Product 3', price: 149 },
];

function OrderForm({ editOrderId, setEditOrderId, onClose }) {
  const dispatch = useDispatch();
  const orderToEdit = useSelector((state) =>
    state.orders.orders.find((order) => order.id === editOrderId)
  );

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [product, setProduct] = useState(products[0].name);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (orderToEdit) {
      setCustomerName(orderToEdit.customer_name);
      setCustomerEmail(orderToEdit.customer_email);
      setProduct(orderToEdit.product);
      setQuantity(orderToEdit.quantity);
    }
  }, [orderToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderValue = products.find((p) => p.name === product).price * quantity;
    if (editOrderId) {
      dispatch(
        updateOrder({
          id: editOrderId,
          customer_name: customerName,
          customer_email: customerEmail,
          product,
          quantity,
          order_value: orderValue,
        })
      );
      setEditOrderId(null);
    } else {
      dispatch(
        addOrder({
          id: Math.random().toString(36).substr(2, 9),
          customer_name: customerName,
          customer_email: customerEmail,
          product,
          quantity,
          order_value: orderValue,
        })
      );
    }
    setCustomerName('');
    setCustomerEmail('');
    setProduct(products[0].name);
    setQuantity(1);
    onClose();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}
    >
      <TextField
        label="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Customer Email"
        type="email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required
        fullWidth
      />
      <FormControl fullWidth required>
        <InputLabel>Product</InputLabel>
        <Select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          label="Product"
        >
          {products.map((p) => (
            <MenuItem key={p.name} value={p.name}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
        inputProps={{ min: 1 }}
        fullWidth
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {editOrderId ? 'Update Order' : 'Add Order'}
        </Button>
      </Box>
    </Box>
  );
}

export default OrderForm;