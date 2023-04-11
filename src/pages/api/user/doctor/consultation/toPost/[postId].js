import dbConnect from "@/dbconnect";
import Consultations from "@/models/consultModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "GET") {
    const data = await Consultations.find({
      postId: req.query.postId,
    })
      .populate("doctorId")
      .populate("doctorRefId")
      .sort({
        updatedAt: -1,
      });

    return res.status(200).json({ data });
  }
}
