const mongoose = require('mongoose');
const authSchema = require('./auth.model');

authSchema.statics = {
  create: function (data) {
    return new Promise((resolve, reject) => {
      const user = new this(data);
      user.save()
        .then((savedUser) => resolve(savedUser))
        .catch((error) => reject(error));
    });
  },
  login: function (query) {
    return new Promise((resolve, reject) => {
      this.find(query)
        .then((users) => resolve(users))
        .catch((error) => reject(error));
    });
  }
};

const authModel = mongoose.model('User', authSchema);
module.exports = authModel;

// const mongoose = require('mongoose');
// const authSchema = require('./auth.model');

// authSchema.statics = {
//   create: function (data, cb) {
//     const user = new this(data);
//     user.save(cb);
//   },
//   login: function (query, cb) {
//     this.find(query, cb);
//   }
// }

// const authModel = mongoose.model('Users', authSchema);
// module.exports = authModel;