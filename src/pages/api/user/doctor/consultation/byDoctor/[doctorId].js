import dbConnect from "@/dbconnect";
import Consultations from "@/models/consultModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "GET") {
    const data = await Consultations.find({
      doctorId: req.query.doctorId,
    }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({ data });
  }
}
