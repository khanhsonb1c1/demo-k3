import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // xử lý chuyển trang
import './assets/style.css';
import App from './app/app';
import { Provider } from 'react-redux';
import store from './app/store';

// aplication single page
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
