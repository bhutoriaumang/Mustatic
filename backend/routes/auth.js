const router = require("express").Router();
const user = require("../models/user");

const admin = require("../config/firebase.config");

router.get("/login", async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized request" });
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedvalue = await admin.auth().verifyIdToken(token);
    if (!decodedvalue) {
      return res.status(401).json({ message: "Unauthorized request" });
    } else {
      const userExists = await user.findOne({ user_id: decodedvalue.user_id });
      if (!userExists) {
        return newUserData(decodedvalue, req, res);
      } else {
        return updateUserData(decodedvalue, req, res);
      }
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const users = await user.find().sort({ createdAt: 1 });
    res.status(200).send({ success: true, data: users });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const data = await user.findByIdAndUpdate(req.params.id, {
      role: req.body.data.role,
    });
    res.status(200).send({ success: true, data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await user.findByIdAndDelete(req.params.id);
    res.status(200).send({ success: true, data: data });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

const newUserData = async (decodedvalue, req, res) => {
  const newUser = new user({
    name: decodedvalue.name,
    email: decodedvalue.email,
    imageURL: decodedvalue.picture,
    user_id: decodedvalue.user_id,
    email_verified: decodedvalue.email_verified,
    role: "member",
    auth_time: decodedvalue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateUserData = async (decodedvalue, req, res) => {
  const filter = { user_id: decodedvalue.user_id };
  const option = {
    upsert: true,
    new: true,
  };
  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodedvalue.auth_time },
      option
    );
    res.status(200).send({ user: result });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = router;
