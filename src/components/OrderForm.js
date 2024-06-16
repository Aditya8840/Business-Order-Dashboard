import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder, updateOrder } from '../store/order/slice';

const products = [
  { name: 'Product 1', price: 29 },
  { name: 'Product 2', price: 49 },
  { name: 'Product 3', price: 149 },
];

function OrderForm({ editOrderId, setEditOrderId }) {
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
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Customer Email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        required
      />
      <select value={product} onChange={(e) => setProduct(e.target.value)}>
        {products.map((p) => (
          <option key={p.name} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <button type="submit">{editOrderId ? 'Update Order' : 'Add Order'}</button>
    </form>
  );
}

export default OrderForm;