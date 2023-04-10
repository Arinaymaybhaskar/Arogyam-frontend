import { Schema, model, models } from "mongoose";

const DoctorSchema = new Schema({
  did: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  experience: {
    type: String,
  },
  qualification: {
    type: String,
    required: true,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
});

const Doctors = models.Doctor || model("Doctor", DoctorSchema);

export default Doctors;
