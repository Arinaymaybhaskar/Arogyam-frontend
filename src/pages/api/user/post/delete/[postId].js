import dbConnect from "@/dbconnect";
import Posts from "@/models/postModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "DELETE") {
    const data = await Posts.findByIdAndRemove(req.query.postId);

    return res.status(200).json({ data });
  }
}
