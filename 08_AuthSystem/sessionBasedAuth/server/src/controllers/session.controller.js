import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { Session } from '../models/session.models.js';

export const createSession = asyncErrorHandler(async (req, res, next) => {
  const {_sid} = req.signedCookies;

  if (_sid) {
    const session = await Session.findById(_sid);
    if(session.expiresAt > Math.round(Date.now() / 1000)) {
      return res.status(200).json({
        success: true,
        message: 'Session already exists',
        session,
      });
    }
  }

  const session = await Session.create({
    expiresAt: Math.round(Date.now() / 1000) + 60 * 60 * 24 * 10,
  });
  const options = {
    httpOnly: true,
    sameSite: 'None',
    secure : true,
    maxAge: 1000 * 60 * 60 * 24 * 10,
    signed: true,
  };
  res.cookie('_sid', session._id, options).status(201).json({
    success: true,
    message: 'Session created successfully',
    session,
  });
});
