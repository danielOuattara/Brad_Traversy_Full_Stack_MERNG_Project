require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const colors = require("colors");
const { connectToDB } = require("./config/db");
//--------------------------------------------------------------
const app = express();

const port = process.env.PORT || 5000;

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  }),
);

//---

// const start = () => {
//   try {
//     connectToDB(process.env.MONGO_URI, process.env.DATABASE);
//     app.listen(
//       port,
//       console.log(`Sever running on -->  http://localhost:${port}/graphql`),
//     );
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// start();

//---

connectToDB(process.env.MONGO_URI, process.env.DATABASE)
  .then(() => {
    app.listen(
      port,
      console.log(`Sever running on -->  http://localhost:${port}/graphql`),
    );
  })
  .catch((err) => console.log(err.message));
