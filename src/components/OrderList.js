import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder } from '../store/order/slice';

function OrderList({ setEditOrderId }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  const handleDelete = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          <div>
            <p>Order ID: {order.id}</p>
            <p>Customer Name: {order.customer_name}</p>
            <p>Customer Email: {order.customer_email}</p>
            <p>Product: {order.product}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Order Value: ${order.order_value}</p>
          </div>
          <div>
            <button onClick={() => setEditOrderId(order.id)}>Edit</button>
            <button onClick={() => handleDelete(order.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default OrderList;