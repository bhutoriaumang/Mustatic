const router = require("express").Router();
const axios = require("axios");
const { response } = require("express");

router.get("/get", async (req, res) => {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://shazam.p.rapidapi.com/songs/v2/get-details",
    params: { id: "1217912247", l: "en-US" },
    headers: {
      "X-RapidAPI-Key": "1f98746a2bmshc442bb5ab1c7e0ap155522jsnc8dd19c4652e",
      "X-RapidAPI-Host": "shazam.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return res.status(200).send({ success: true, data: response.data });
    })
    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
