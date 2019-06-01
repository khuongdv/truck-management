import { toast } from 'react-toastify';

export const customSuccessMsg = ({ code, message }) => {
    toast.success(message, { hideProgressBar: true });
};
export const customErrorMsg = ({ code, message }) => {
    toast.error(message, { hideProgressBar: true });
};

export default {
    customSuccessMsg,
    customErrorMsg,
};
