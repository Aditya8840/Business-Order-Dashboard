import React , { useState, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';
import { logout } from '../store/auth/slice';
import { clearOrders } from '../store/order/slice';

function Orders() {
  const { user } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders.orders);
  const [editOrderId, setEditOrderId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();

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
          // Clear login data if there's an error fetching user info
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

  return (
    <div>
      {userInfo && <h2>Hi {getFirstName(userInfo.name)}</h2>}
      <p>Total Order Value: ${totalOrderValue}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? 'Cancel' : 'Add Order'}
      </button>
      {isAdding && <OrderForm setEditOrderId={setEditOrderId} />}
      <OrderList setEditOrderId={setEditOrderId} />
      {editOrderId && <OrderForm editOrderId={editOrderId} setEditOrderId={setEditOrderId} />}
    </div>
  );
}

export default Orders;