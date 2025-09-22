// utils/errorHandler.ts
export const getErrorMessage = (error: any): string => {
  // RTK Query error format
  if (error?.data?.message) {
    return error.data.message;
  }

  // Fetch / Network error
  if (error?.error) {
    return error.error;
  }

  // If backend sends directly as response (res.success === false)
  if (error?.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};
