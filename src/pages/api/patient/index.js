import dbConnect from "@/dbconnect";
import Users from "@/models/userModel";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { email } = req.body;

    const data = await Users.findOne({ email });

    return res.json({ status: true, data });
  } else {
    res.status(500).json({ msg: "Only Post Request is Allowed" });
  }
}
