// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "lab-express-cinema";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
const router = require("./routes/index");

app.use("/", index);

const Movie = require("./models/Movie.model");

app.get("/movies", (req, res, next) => {
  const movie = req.query.movies;
  Movie.find(movie)
    .then((movies) => {
      console.log("Movies are here!");
      res.render("movies", { movies });
    })
    .catch((error) => {
      next(error);
    });
});

app.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((theMovie) => res.render("movie-details.hbs", { movie: theMovie }))
    .catch((error) => {
      console.log("Error while retrieving book details: ", error);
      next(error);
    });
});

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
