import dbConnect from "@/dbconnect";
import Users from "@/models/userModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { email } = req.body;
    const data = await Users.findOne({ email });

    return res.status(200).json({ data });
  } else {
    return res.status(500).json({ msg: "Bad Request" });
  }
}
