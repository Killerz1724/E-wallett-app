export const DEFAULT_TOAST_MESSAGE = {
  loading: "Processing, Please Wait....",
  success: "Success",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (err: any) => {
    return (
      err?.response.data.message ??
      "Something went wrong, please try again later"
    );
  },
};
