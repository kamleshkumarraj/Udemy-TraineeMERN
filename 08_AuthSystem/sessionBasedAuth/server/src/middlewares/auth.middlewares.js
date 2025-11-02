import { asyncErrorHandler } from "../errors/asyncErrorHandler.js";
import { Session } from "../models/session.models.js";
import { Users } from "../models/users.model.js";

export const isLoggedIn = asyncErrorHandler(async (req, res, next ) => {
  const {_sid} = req.signedCookies;

  if(_sid){
    const session = await Session.findById(_sid);
    if(session){
      if(new Date(session.expiresAt).valueOf() > Date.now()){
        if(!session.userId){
          return res.status(401).json({
            success : false,
            message : 'Please login to access this resource !'
          })
        }
          const user = await Users.findById(session.userId);
          req.user = user._id;
          next();
      }else{
        await Session.findByIdAndDelete(_sid);
        return res.status(401).json({
          success : false,
          message : 'Please login to access this resource !'
        })
      }
    }
  }else{
    return res.status(401).json({
      success : false,
      message : 'Please login to access this resource !'
    })
  }
})