const response = (status: number, message: unknown) => ({ status, message });

const responseError = (status: number, message: unknown) =>
  response(status, { message });

export { response, responseError };
