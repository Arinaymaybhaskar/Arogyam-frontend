import dbConnect from "@/dbconnect";
import Doctors from "@/models/doctorModel";
import Users from "@/models/userModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { email } = req.body;
    const data = await Users.findOne({ email });

    if (data.isDoctor) {
      const doctorData = await Doctors.findOne({ doctorId: data._id });
      return res.status(200).json({ data, doctorData });
    }

    return res.status(200).json({ data });
  } else {
    return res.status(500).json({ msg: "Bad Request" });
  }
}
