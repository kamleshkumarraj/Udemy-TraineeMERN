import { ErrorHandler } from "../../errors/apiError.error.js";
import { asyncErrorHandler } from "../../errors/asyncErrorHanlder.error.js";
import shortID from 'short-id'
import { Urls } from "../../models/url.model.js";

export const minimizeURL = asyncErrorHandler(async (req, res, next) => {
  const {url} = req.body;
  if(!url) return next(new ErrorHandler("URL is required !", 400));

  // if url is present then we sort the url.
  const shortId = shortID.generate();
  const protocol = req.protocol;
  const host = req.get('host');
  const shortUrl = `${protocol}://${host}/${shortId}`

  // now we save url in db.
  const dbData = {
    urlCode : shortId,
    longUrl : url,
    shortUrl,
    generatedBy : req?.user?._id,
    visited : [],
  }

  const urlData = await Urls.create(dbData);
  res.status(200).json({
    success : true,
    message : "URL created successfully !",
    data : urlData
  })
})