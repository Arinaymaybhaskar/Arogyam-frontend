import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Users from "@/models/userModel";
import { compare } from "bcrypt";
import dbConnect from "@/dbconnect";

let userData = null;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        dbConnect().catch((error) => {
          error: "Connection Failed...!";
        });

        // check user existance
        const user = await Users.findOne({ email: credentials.email });
        userData = user._doc;

        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        if (user && checkPassword) {
          return Promise.resolve(user);
        } else {
          throw new Error("Invalid Credentials");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (userData) {
        session.user.id = userData._id;
        session.user.name = userData.fullname;
        session.user.isDoctor = userData.isDoctor;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
