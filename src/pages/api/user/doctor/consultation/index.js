import dbConnect from "@/dbconnect";
import Consultations from "@/models/consultModel";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { doctorId, postId, fee, timeSlot, doctorName, doctorRefId } =
      req.body;

    // const product = await stripe.products.create({ name: "Ajay Sharma" });

    const consultation = await Consultations.create({
      doctorId,
      postId,
      doctorName,
      doctorRefId,
      fee,
      timeSlot,
      doctorName,
    });

    return res.status(200).json({ consultation, msg: "Posted Successfully" });
  } else {
    res.status(500).json({ msg: "Only Post Request is Allowed" });
  }
}
