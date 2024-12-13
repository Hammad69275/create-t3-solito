import Toast from 'react-native-toast-message';

const success = (message: string) => {
  Toast.show({
    text1: message,
    type: 'success'
  });
};
const error = (message: string) => {
  Toast.show({
    text1: message,
    type: 'error'
  });
};

const ToastContainer = Toast;

export default { error, success, ToastContainer };
