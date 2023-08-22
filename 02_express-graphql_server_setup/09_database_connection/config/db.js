const mongoose = require("mongoose");

const connectToDB = async (uri, dab_name) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(
    `Connection successful to mongo Database --> ` +
      `${dab_name}`.cyan.underline.bold,
  );
};

module.exports = { connectToDB };
