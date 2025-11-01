import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { Session } from '../models/session.models.js';
import { Users } from '../models/users.model.js';

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

export const deleteLastSession = asyncErrorHandler(async (req, res, next) => {
  // now we write code for delete that session that is created first.
  const {email} = req.body;
  const user = await Users.findOne({email});
  const sessions = await Session.find({userId : user._id});
  const session = sessions[0];
  await Session.findByIdAndDelete(session._id);
  res.status(200).json({
    success: true,
    message: 'Session deleted successfully',
  });
});

export const deleteAllSessions = asyncErrorHandler(async (req, res, next) => {
  const {email} = req.body;
  const user = await Users.findOne({email});
  await Session.deleteMany({userId : user._id});
  res.status(200).json({
    success: true,
    message: 'All sessions deleted successfully',
  });
});
