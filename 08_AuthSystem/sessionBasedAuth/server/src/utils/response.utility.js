// we create utility for response.

export const sendResponse = (res, message, data, statusCode) => {
  res.status(statusCode).json({ success: true, message, data });
};
