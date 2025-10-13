import express from 'express';
import cookieParser from 'cookie-parser'
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url';

export const app = express();

app.use(express.json({
  limit : '50mb'
}))

app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

// now we set ejs engine.
app.set("view engine", "ejs");
// and set path for ejs files.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, 'views'))

// console.log();


// home route.
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
app.get("/:urlCode", async function(req, res){
  const urlCode = req.params;

  const urlData = await Urls.findOne({urlCode})

  if(!urlData) return res.status(404).json({
    success : false,
    message : "URL not found !"
  })

  const userId = req.user._id;

  urlData.visited.push({visitedBy : userId});
  await urlData.save();

  res.redirect(urlData.longUrl);
})

// here we configure routes.

// now we write code for handling unhandled rejection.
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection:", err);
  // Application specific logging, throwing an error, or other logic here
});

// now we write code for handling uncaught exception.
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception:", err);
  // Application specific logging, throwing an error, or other logic here
});

// global middleware for error handling.
app.use((err, req, res, next) => {
  // console.log(err.stack)
  const error = err?.message || "Something went wrong!";
  const statusCode = err?.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error,
    statusCode: statusCode,
  });
});