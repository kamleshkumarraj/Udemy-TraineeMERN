import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { ErrorHandler } from '../errors/errorHandler.js';
import { Session } from '../models/session.models.js';
import { Users } from '../models/users.model.js';

export const getMyProfile = asyncErrorHandler(async (req, res, next) => {
  const { _sid } = req.signedCookies;

  if (!_sid) {
    return next(
      new ErrorHandler('please login to access this resource !', 402),
    );
  }

  const userSession = await Session.findOne({ _id: _sid });
  if (!userSession?.userId) {
    return next(
      new ErrorHandler('please login to access this resource !', 402),
    );
  }

  const userProfile = await Users.findById(userSession.userId);

  res.status(200).json({
    success: true,
    message: 'user profile',
    data: userProfile,
  });
});
