import 'react-toastify/dist/ReactToastify.css';

import { toast, ToastContainer } from 'react-toastify';

const success = (message: string) => {
  toast.success(message);
};

const error = (message: string) => {
  toast.error(message);
};

export default { error, success, ToastContainer };
