export type UninterceptedApiError = {
  error: {
    message: string;
  };
};

export type MessageResponse = {
  message: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type ApiError = {
  message: string;
};
