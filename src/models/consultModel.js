import { Schema, model, models } from "mongoose";

const ConsultationSchema = new Schema(
  {
    doctorid: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postid: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
    dname: {
      type: String,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      default: false,
    },
    timeSlot: {
      type: {
        startTime: String,
        endTime: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Consultations =
  models.Consultation || model("Consultation", ConsultationSchema);

export default Consultations;
