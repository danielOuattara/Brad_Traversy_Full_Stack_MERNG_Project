require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");

//--------------------------------------------------------------
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Sever running on port ${port}`));
