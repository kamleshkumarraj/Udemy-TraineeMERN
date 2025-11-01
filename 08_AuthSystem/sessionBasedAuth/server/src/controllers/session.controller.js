import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { Session } from '../models/session.models.js';

export const createSession = asyncErrorHandler(async (req, res, next) => {
  const { _sid } = req.signedCookies;

  if (_sid) {
    const session = await Session.findById(_sid);
    if (session) {
      if (new Date(session.expiresAt).valueOf() > Date.now()) {
        return res.status(200).json({
          success: true,
          message: 'Session already exists',
        });
      }else{
        await Session.findByIdAndDelete(_sid);
      }
    }
  }

  const session = await Session.create({
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 10,
  });
  const options = {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 10,
    signed: true,
  };
  res.cookie('_sid', session._id, options).status(201).json({
    success: true,
    message: 'Session created successfully',
    session,
  });
});
