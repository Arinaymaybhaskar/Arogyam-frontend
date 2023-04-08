import dbConnect from "@/dbconnect";
import Posts from "@/models/postModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "GET") {
    const data = await Posts.find({ uid: req.query.uid }).sort({
      updatedAt: -1,
    });

    return res.json({ status: true, data });
  }
}
