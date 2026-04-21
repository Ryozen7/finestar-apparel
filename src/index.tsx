import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { Server } from 'miragejs';

// MirageJS mock server setup
if (process.env.NODE_ENV === 'development') {
  new Server({
    routes() {
      this.namespace = 'api';
      this.get('/products', () => [
        {
          id: '1',
          name: 'Classic White Shirt',
          price: 39.99,
          category: 'Shirts',
          variants: [
            { size: 'S', color: 'White' },
            { size: 'M', color: 'White' },
            { size: 'L', color: 'White' }
          ],
          image: '',
        },
        {
          id: '2',
          name: 'Slim Fit Jeans',
          price: 59.99,
          category: 'Pants',
          variants: [
            { size: '32', color: 'Blue' },
            { size: '34', color: 'Blue' }
          ],
          image: '',
        },
        {
          id: '3',
          name: 'Summer Dress',
          price: 49.99,
          category: 'Dresses',
          variants: [
            { size: 'S', color: 'Red' },
            { size: 'M', color: 'Red' }
          ],
          image: '',
        }
      ]);
    },
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);