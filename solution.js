//import axios
import axios from "axios";
//import dotenv
import dotenv from "dotenv";
//config dotenv
dotenv.config();

// express

import express from "express";
const app = express();

//call the port

const port = process.env.PORT || 4000;

app.listen(port, () => console.log("Server is up and running"));
// app.listen(port, () => console.log("Server is up and running", port));

//call options from the api

const options = {
  headers: {
    app_id: process.env.APP_ID,
    app_key: process.env.APP_KEY,
  },
};

//call url

const url =
  "https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/" +
  process.argv[2];

//use axios to get a response

const response = await axios.get(url, options);

response.data.results[0].lexicalEntries[0].entries[0].senses.forEach(
  (item, idx) => {
    console.log(idx + 1, ":", item.definitions[0]);
  }
);

// console.log(response.data.results[0].lexicalEntries[0].entries[0].senses[0]);

app.get("/", (req, res) => {
  console.log("Hello from root", req.query);
  const results =
    response.data.results[0].lexicalEntries[0].entries[0].senses.forEach(
      (item, idx) => {
        return idx + 1, ":", item.definitions[0].includes(req.query.text);
      }
    );
  console.log("query-result", results);
  res.send(results);
});
