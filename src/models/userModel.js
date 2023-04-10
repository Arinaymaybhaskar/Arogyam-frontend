import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Transgender", "rather not say"],
    default: "rather not say",
  },
  contact: {
    type: String,
  },
  profile: {
    type: String,
    default: "",
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
});

const Users = models.User || model("User", UserSchema);

export default Users;
