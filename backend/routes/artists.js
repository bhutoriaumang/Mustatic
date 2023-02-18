const router = require("express").Router();
const artist = require("../models/artist");

router.get("/getAll", async (req, res) => {
  try {
    const data = await artist.find().sort({ name: 1 });
    return res.status(200).send({ success: true, data: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const data = await artist.findById(req.params.id);
    return res.status(200).send({ success: true, artist: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.post("/save", async (req, res) => {
  const newArtist = artist({
    name: req.body.name,
    imageURL: req.body.imageURL,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
  });
  try {
    const savedArtist = await newArtist.save();
    return res.status(200).send({ success: true, artist: savedArtist });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await artist.findByIdAndDelete(req.params.id);
    return res.status(200).send({ success: true, artist: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const updatedArtist = {
    name: req.body.name,
    imageURL: req.body.imageURL,
    instagram: req.body.instagram,
    twitter: req.body.twitter,
  };
  try {
    const data = await artist.findByIdAndUpdate(req.params.id, updatedArtist, {
      new: true,
      upsert: true,
    });
    return res.status(200).send({ success: true, artist: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;
