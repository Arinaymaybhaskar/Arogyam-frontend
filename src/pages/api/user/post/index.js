import dbConnect from "@/dbconnect";
import Posts from "@/models/postModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { patientId, description, severity, image } = req.body;

    const post = await Posts.create({
      patientId,
      description,
      severity,
      image,
    });

    return res.status(200).json({ post, msg: "Posted Successfully" });
  } else if (req.method === "GET") {
    const data = await Posts.find().sort({
      updatedAt: -1,
    });

    return res.status(200).json({ data });
  }
}
