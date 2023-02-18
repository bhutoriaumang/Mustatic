require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose, mongo } = require("mongoose");
mongoose.set("strictQuery", false);
const userRoutes = require("./routes/auth");
const songsRoutes = require("./routes/songs");
const artistsRoutes = require("./routes/artists");
const albumsRoutes = require("./routes/albums");

app.use(cors({ origin: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/users/", userRoutes);

app.use("/api/songs/", songsRoutes);

app.use("/api/artists/", artistsRoutes);

app.use("/api/albums/", albumsRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

mongoose.connection.once("error", (error) => {
  console.log("Error : ${error}");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
