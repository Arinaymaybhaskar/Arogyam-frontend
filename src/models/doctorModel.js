import { Schema, model, models } from "mongoose";

const DoctorSchema = new Schema({
  did: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  experience: {
    type: String,
  },
  education: {
    type: String,
  },
  qualification: {
    type: String,
  },
  twitterUrl: {
    type: String,
  },
  linkedinUrl: {
    type: String,
  },
});

const Doctors = models.Doctor || model("Doctor", DoctorSchema);

export default Doctors;
