import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastProvider } from './contexts/toastContext';
import './index.css';
import router from './routes/routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ToastProvider>
    <RouterProvider router={router} />
  </ToastProvider>
);