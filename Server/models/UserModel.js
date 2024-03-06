const mongoose = require('mongoose');
// init const Schema as Schema constructor
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  favStretches: [{name: String, equipment: String, difficulty: String, instructions: String}],
});

// use pre hook to run the func before middleware func save/update a user doc
userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    console.log(this);
    this.password = hash;
    return next();
  })
});

// Export user model through module.exports
// The collection name should be 'user'
module.exports = mongoose.model('User', userSchema);
