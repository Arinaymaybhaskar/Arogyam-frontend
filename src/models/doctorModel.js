import { Schema, model, models } from "mongoose";

const DoctorSchema = new Schema({
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  experience: {
    type: String,
  },
  qualification: {
    type: String,
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
