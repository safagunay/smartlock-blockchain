const mongoose = require("mongoose");
const defaultOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true
};
/**
 * calls mongoose.connect if not already connected
 * @param MONGODB_URI: string (default: process.env.MONGODB_URI)
 * @param mongooseOptions: object (default: undefined, mongoose options)
 */
const createMongooseLambda = (MONGODB_URI, mongooseOptions = defaultOptions) => {

  if (!MONGODB_URI) {
    MONGODB_URI = process.env.MONGODB_URI;
  }

  switch (mongoose.connection.readyState) {
    case 0: // disconnected
      mongoose.connect(MONGODB_URI, mongooseOptions);
      return;
    case 3: // disconnecting
      setTimeout(createMongooseLambda, 500, MONGODB_URI, mongooseOptions);
  }

};

module.exports = createMongooseLambda;
