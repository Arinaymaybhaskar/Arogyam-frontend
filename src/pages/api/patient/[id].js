import dbConnect from "@/dbconnect";
import Users from "@/models/userModel";
import { hash } from "bcrypt";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { fullname, password, dob, contact, gender } = req.body;

    const hashedPassword = await hash(password, 10);
    const data = await Users.findByIdAndUpdate(req.query.id, {
      fullname,
      password: hashedPassword,
      dob,
      contact,
      gender,
    });

    return res.json({ status: true, data });
  } else {
    res.status(500).json({ msg: "Only Post Request is Allowed" });
  }
}
