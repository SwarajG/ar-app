const { config } = require('dotenv');

config();

module.exports = {
  envs: {
    mongoUrl: process.env.MONGO_URL,
  },
};
