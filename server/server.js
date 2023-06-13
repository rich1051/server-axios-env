const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const axios = require("axios");
require('dotenv').config();

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("build"));

/** ---------- EXPRESS ROUTES ---------- **/

/** ---------- API ROUTE ---------- */
// listen for GET request from client at /gifs
app.get("/gifs", (req, res) => {
// when client sends request, use axios to send GET request to Giphy API
  axios
    .get(
      `http://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&rating=pg`
    )
    .then((response) => {
      console.log(response.data);
      res.send(response.data);
    })
    .catch((error) => {
      console.log("There was an error GETTING", error);
    });
});

/** ---------- START SERVER ---------- **/
app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
