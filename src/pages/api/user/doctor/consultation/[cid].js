import dbConnect from "@/dbconnect";
import Consultations from "@/models/consultModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "DELETE") {
    const data = await Consultations.findByIdAndRemove(req.query.cid);

    return res.status(200).json({ data, msg: "Deleted Successfully" });
  }
}
