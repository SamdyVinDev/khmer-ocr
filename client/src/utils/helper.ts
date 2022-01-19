import { toast } from "react-toastify";

export const promiseSnackbar = {
    init: (snackbarId: string, message: string) =>
        toast(message, {
            isLoading: true,
            toastId: snackbarId,
            autoClose: false,
            hideProgressBar: false,
        }),

    success: (snackbarId: string, message: string) =>
        toast.update(snackbarId, {
            isLoading: false,
            type: "success",
            render: message,
            autoClose: 5000,
        }),

    error: (snackbarId: string, message: string) =>
        toast.update(snackbarId, {
            isLoading: false,
            type: "error",
            render: message,
            autoClose: 5000,
        }),
};
