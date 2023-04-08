import dbConnect from "@/dbconnect";
import Doctors from "@/models/doctorModel";

export default async function handler(req, res) {
  dbConnect().catch((error) => res.json({ error: "Connection Failed" }));

  if (req.method === "POST") {
    const { experience, education, qualification, twitter, linkedin } =
      req.body;

    const doctor = await Doctors.findOneAndUpdate(
      { did: req.query.did },
      {
        experience,
        education,
        qualification,
        twitter,
        linkedin,
      }
    );

    return res.json({ status: true, doctor });
  } else {
    res.status(500).json({ msg: "Only Post Request is Allowed" });
  }
}
