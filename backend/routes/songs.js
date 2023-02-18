const router = require("express").Router();
const songs = require("../models/song");

router.get("/getAll", async (req, res) => {
  try {
    const data = await songs.find().sort({ name: 1 });
    return res.status(200).send({ success: true, data: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const data = await songs.findById(req.params.id);
    return res.status(200).send({ success: true, song: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.post("/save", async (req, res) => {
  const newSong = songs({
    name: req.body.name,
    imageURL: req.body.imageURL,
    songURL: req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  });
  try {
    const savedSong = await newSong.save();
    return res.status(200).send({ success: true, song: savedSong });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await songs.findByIdAndDelete(req.params.id);
    return res.status(200).send({ success: true, song: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const updatedsong = {
    name: req.body.name,
    imageURL: req.body.imageURL,
    songURL: req.body.songURL,
    album: req.body.album,
    artist: req.body.artist,
    language: req.body.language,
    category: req.body.category,
  };
  try {
    const data = await songs.findByIdAndUpdate(req.params.id, updatedsong, {
      new: true,
      upsert: true,
    });
    return res.status(200).send({ success: true, song: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;

module.exports = router;
