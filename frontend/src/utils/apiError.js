export const getApiErrorMessage = (error, fallbackMessage = 'Something went wrong. Please try again.') => {
    const responseMessage = error?.response?.data?.message;
    const responseError = error?.response?.data?.error;
    const status = error?.response?.status;

    if (status === 401) {
        return 'Your session is missing or expired. Please sign in again and retry.';
    }

    if (status === 403) {
        return 'You do not have permission to perform this action.';
    }

    return responseMessage || responseError || error?.message || fallbackMessage;
};
