const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    currentlyReading: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual('wishlistCount').get(function () {
  return this.wishlist.length;
});

userSchema.virtual('currentlyReadingCount').get(function () {
  return this.currentlyReading.length;
});

const User = model('User', userSchema);

module.exports = User;
