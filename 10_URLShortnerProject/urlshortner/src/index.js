import dotenv from 'dotenv/config'
import { app } from "./app.js";
import { connectDB } from "./db/connection.js";
import { urlHandlerRouter } from './routes/urls.routes.js';
import { asyncErrorHandler } from './errors/asyncErrorHanlder.error.js';
import { Urls } from './models/url.model.js';
// import { Urls } from './models/url.model.js';

// now we handle route for backend.

//route for url handler.
app.use('/api/v1/', urlHandlerRouter)

//route for handling ejs pages.
app.get("/", function(req, res){
  res.render("index.ejs");
})
app.get('/auth/login', function(req, res) {
  res.render("auth/login.ejs")
})

app.get('/auth/register', function(req, res) {
  res.render("auth/register.ejs")
})

// now we handle redirect-url from short url to long url.
app.get("/:urlCode", asyncErrorHandler(async function(req, res){
  const {urlCode} = req.params;
  console.log(urlCode)

  const urlData = await Urls.findOne({urlCode})

  if(!urlData) return res.status(404).json({
    success : false,
    message : "URL not found !"
  })

  // const userId = req.user._id;

  // urlData.visited.push({visitedBy : userId});
  // await urlData.save();

  res.redirect(urlData.longUrl);
}))


connectDB()
.then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on PORT:${PORT}`);
  })
})
.catch((err) => {
  console.log(`We can't start server because database connection failed due to this error : ${err}`);
})

