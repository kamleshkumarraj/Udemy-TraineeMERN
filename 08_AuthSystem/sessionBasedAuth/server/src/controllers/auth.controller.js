import crypto from 'node:crypto';
import { asyncErrorHandler } from '../errors/asyncErrorHandler.js';
import { ErrorHandler } from '../errors/errorHandler.js';
import { Users } from '../models/users.model.js';
import { uploadFileOnCloudinary } from '../utils/cloudinary.utils.js';
import { deleteFile } from '../utils/file.utils.js';
import { generateEmailVerification } from '../utils/generateEmailVerification.js';
import { sendResponse } from '../utils/response.utility.js';
import { sendMail } from '../utils/sendMail.utils.js';
import { Session } from '../models/session.models.js';
import { generateForgotPasswordEmail } from '../utils/email/generateEmailForgotPasswordTemplate.utils.js';
import shortId from 'short-id'
import { Otp } from '../models/otp.models.js';
import { generateEmailOTPTemplate } from '../utils/email/generateEmailTemplateForOtp.utils.js';

export const registerUser = asyncErrorHandler(async (req, res, next) => {
  const { fullName, email, username, password, role = 'user' } = req.body;
  const avatar = req.file;
  // console.log(fullName, email, username, password, role, avatar);

  // first we check if user is already registered or not.
  const existingUser = await Users.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    return next(new ErrorHandler('User already exists', 400));
  }
  // now we create transaction for if user is created then in this case profile create other wise created profile will rollback.

  const { success, data } = await uploadFileOnCloudinary([avatar]);
  console.log(data);
  if (!success) {
    await deleteFile([avatar]);
    return next(new ErrorHandler('get error during file upload', 400));
  }

  const user = await Users.create({
    fullName,
    email,
    username,
    password,
    role,
    avatar: data[0],
  });

  await deleteFile([avatar]);

  // now we send email verification mail.
  const token = user.generateEmailVerificationToken();
  const origin = req.headers.origin;
  const url = `${origin}/api/v1/verify-email/${token}`;
  const message = generateEmailVerification(url, user.fullName);

  try {
    await sendMail({ message, subject: 'Email verification', to: user.email });
    await user.save();
  } catch (error) {
    user.emailVerificationToken = null;
    user.emailVerificationTokenExpiry = null;
    await user.save();
  }
  // const port =

  sendResponse(res, 'User registered successfully !', user, 200);
});

export const verifyEmail = asyncErrorHandler(async (req, res, next) => {
  const verifyToken = req.params.verifyToken;
  const token = crypto.createHash('sha256').update(verifyToken).digest('hex');
  const user = await Users.findOne({
    emailVerificationToken: token,
    emailVerificationTokenExpiry: { $gt: Date.now() },
  });
  if (!user) return next(new ErrorHandler('Invalid token', 400));
  user.isVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationTokenExpiry = null;
  await user.save();
  sendResponse(res, 'Email verified successfully !', user, 200);
});

export const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const { _sid } = req.signedCookies;

  // first we validate email and password.
  const user = await Users.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid credentials !', 400));
  }

  // now we check password.
  if (!(await user.comparePassword(password))) {
    return next(new ErrorHandler('Invalid credentials !', 400));
  }

  const options = {
    httpOnly: true,
    sameSite: 'None',
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 10,
    signed: true,
  };

  const sessions = await Session.find({ userId: user._id });

  if (sessions.length >= process.env.MAX_DEVICE_LOGIN) {
    return next(
      new ErrorHandler('You have logged in from too many devices', 400),
    );
  }

  // now we session is valid or not.
  if (_sid) {
    const session = await Session.findOne({ _id: _sid });

    if (session) {
      if (session.userId && session.userId.toString() === user._id.toString()) {
        return sendResponse(res, 'User already logged in !', null, 200);
      }
      if (new Date(session.expiresAt).valueOf() > Date.now()) {
        // we add the session in cookie with adding time.

        session.expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 10;
        session.userId = user._id;
        await session.save();
        res.cookie('_sid', _sid, options);
        return sendResponse(res, 'User logged in successfully !', null, 200);
      } else {
        await Session.findByIdAndDelete(_sid);
      }

      // now we check this user is logged in how many device.
    }
  }

  // if session not present then create new fresh session.

  const session = await Session.create({
    userId: user.id,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 10,
  });
  res.cookie('_sid', session._id, options);
  return sendResponse(res, 'User logged in successfully !', null, 200);
});

export const forgotPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await Users.findOne({ email });
  if(!user) return next(new ErrorHandler('User not found', 400));
  // now we create url for send request.
  const origin = req.headers.origin;
  const token = user.generatePasswordResetToken();
  const url = `${origin}/api/v1/auth/forgot-password/${token}`;
  const mailTemplate = generateForgotPasswordEmail(url, user?.fullName);

  try {
    await sendMail({
      message: mailTemplate,
      subject: 'Password reset',
      to: user.email,
    });
    await user.save();
  } catch (error) {
    user.passwordResetToken = null;
    user.passwordResetTokenExpiry = null;
    await user.save();
  }
  sendResponse(res, 'Password reset link send successfully !', null, 200);
});

export const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const token = req.params.token;
  const { password, confirmPassword } = req.body;
  if (password != confirmPassword)
    return next(
      new ErrorHandler('Password and confirm password not match', 400),
    );
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const user = await Users.findOne({
    passwordResetToken: tokenHash,
    passwordResetTokenExpiry: { $gt: Date.now() },
  });
  if (!user) return next(new ErrorHandler('Invalid token', 400));

  user.password = password;
  user.passwordResetToken = null;
  user.passwordResetTokenExpiry = null;
  await user.save();
  sendResponse(res, 'Password reset successfully !', null, 200);
});


export const sendOtpForMailVerification = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if(!user) return next(new ErrorHandler('User not found', 400));
  // create unique otp for user.
  const otp = shortId.generate();

  await Otp.create({
    userId : user?._id,
    email,
    otp,
  });
  
  const message = generateEmailOTPTemplate(otp, email);

  try {
    await sendMail({
      message,
      subject: 'Email verification',
      to: email,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }

  return res.status(200).json({
    success: true,
    message: 'Otp send successfully !',
  })
})

export const verifyOtpForMailVerification = asyncErrorHandler(async (req, res, next) => {
  const { email, otp } = req.body;
  const dbOtp = await Otp.findOne({ email });
  if (!dbOtp) return next(new ErrorHandler('Invalid otp', 400));
  
  if(! (await dbOtp.compareOtp(otp))) return next(new ErrorHandler('Invalid otp', 400));
  
  await dbOtp.deleteOne();

  sendResponse(res, 'Email verified successfully !', undefined, 200);
})