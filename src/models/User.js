import { Schema, model } from 'mongoose'
import bcrypt from "bcryptjs"

const userSchema = new Schema({
  email: {
    type: String,
    requiered: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    requiered: [true, 'Please enter a password'],
    minlength: 6,
  },
  chat: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    { timestamps: true, versionKey: false },
  ],
 
}, { timestamps: true, versionKey: false })


userSchema.methods.toJSON = function () {
  let admin = this;
  let adminObject = admin.toObject();
  delete adminObject.password;
  return adminObject;
}

userSchema.methods.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

export default model('User', userSchema)