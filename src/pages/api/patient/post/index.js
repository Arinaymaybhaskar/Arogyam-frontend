import dbConnect from "@/dbconnect";
import Posts from "@/models/postModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { uid, description, severity, images } = req.body;

    const post = await Posts.create({
      uid,
      description,
      severity,
      images,
    });

    return res.json({ status: true, post });
  }
}
