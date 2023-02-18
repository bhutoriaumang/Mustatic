const router = require("express").Router();
const albums = require("../models/album");

router.get("/getAll", async (req, res) => {
  try {
    const data = await albums.find().sort({ name: 1 });
    return res.status(200).send({ success: true, data: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const data = await albums.findById(req.params.id);
    return res.status(200).send({ success: true, album: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.post("/save", async (req, res) => {
  const newAlbum = albums({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });
  try {
    const savedAlbum = await newAlbum.save();
    return res.status(200).send({ success: true, album: savedAlbum });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await albums.findByIdAndDelete(req.params.id);
    return res.status(200).send({ success: true, album: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  const updatedalbum = {
    name: req.body.name,
    imageURL: req.body.imageURL,
  };
  try {
    const data = await albums.findByIdAndUpdate(req.params.id, updatedalbum, {
      new: true,
      upsert: true,
    });
    return res.status(200).send({ success: true, album: data });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;

module.exports = router;
