// we write class for handling api error.

export class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;

    captureStackTrace(this, this.constructor);
  }
}
