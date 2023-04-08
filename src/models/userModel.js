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
  avatar: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3AUser-avatar.svg&psig=AOvVaw3XHLUxwCG2tZ1kijP16wt-&ust=1680161209649000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCOiY-LHOgP4CFQAAAAAdAAAAABAE",
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
});

const Users = models.User || model("User", UserSchema);

export default Users;
