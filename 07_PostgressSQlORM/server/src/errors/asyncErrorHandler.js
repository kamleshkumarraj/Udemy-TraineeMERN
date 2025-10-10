// first we write code for handling error as promise version.

export const asyncErrorHandler = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
}

// here theFunc is the function which we want to handle async error try catch version.

// export const asyncErrorHandlerTryCatch = (theFunc) => async (req, res, next) => {
//   try {
//     await theFunc(req, res, next);
//   } catch (error) {
//     next(error);
//   }
// }