import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import store from './store/store';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="209566786419-5tb37vqji6kubcbelf0vh4625p6ucku6.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>
);