import dbConnect from "@/dbconnect";
import Consultations from "@/models/consultModel";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { did, postid, fee, timeSlot, dname } = req.body;

    const product = await stripe.products.create({ name: "Ajay Sharma" });

    const consultation = await Consultations.create({
      did,
      postid,
      dname,
      fee,
      timeSlot,
    });

    return res.json({ status: true, consultation, product });
  } else {
    res.status(500).json({ msg: "Only Post Request is Allowed" });
  }
}
