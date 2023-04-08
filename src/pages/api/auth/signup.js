import { hash } from "bcrypt";
import Users from "@/models/userModel";
import dbConnect from "@/dbconnect";
import Doctors from "@/models/doctorModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { fullname, email, password, isDoctor } = req.body;

    const emailCheck = await Users.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await hash(password, 10);
    const user = await Users.create({
      fullname,
      email,
      password: hashedPassword,
      isDoctor,
    });

    if (isDoctor) {
      await Doctors.create({
        did: user._id,
      });
    }

    delete user.password;
    return res.json({ status: true, user });
  } else {
    res.status(500).json({ msg: "Only Post Request is Allowed" });
  }
}
