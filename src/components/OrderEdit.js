import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../store/order/slice';

const products = [
  { name: 'Product 1', price: 29 },
  { name: 'Product 2', price: 49 },
  { name: 'Product 3', price: 149 },
];

function OrderEdit({ orderId, setEditOrderId }) {
  const dispatch = useDispatch();
  const order = useSelector((state) =>
    state.orders.orders.find((order) => order.id === orderId)
  );

  const [customerName, setCustomerName] = useState(order.customerName);
  const [customerEmail, setCustomerEmail] = useState(order.customerEmail);
  const [product, setProduct] = useState(order.product);
  const [quantity, setQuantity] = useState(order.quantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productDetails = products.find((p) => p.name === product);
    const orderValue = productDetails.price * quantity;
    dispatch(
      updateOrder({
        id: orderId,
        customerName,
        customerEmail,
        product,
        quantity,
        orderValue,
      })
    );
    setEditOrderId(null);
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
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditOrderId(null)}>
        Cancel
      </button>
    </form>
  );
}

export default OrderEdit;