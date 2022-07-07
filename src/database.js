const mongoose = require('mongoose');
const { envs } = require('./envs');


module.exports = {
  connect: async () => {
    await mongoose.connect(envs.mongoUrl || '');
  }
}
