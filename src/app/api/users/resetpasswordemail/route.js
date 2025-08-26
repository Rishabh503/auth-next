// krna kya hai

import { dbConnect } from "@/db/dbConfig";
import { sendEmail } from "@/helpers/mailers";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

// send an email to the user
// save that tokens to the db too

// return a response saying an email has been sent to you with reset password  optional
dbConnect();
export async function POST(request) {
  try {
    const reqbody = await request.json();
    console.log(reqbody);
    const { email } = reqbody;
    const user = await User.findOne({ email: email }).select("-password");
    if (!user) {
      return NextResponse.json(
        { error: "user not found or login or invalid token" },
        { status: 400 }
      );
    }
    console.log(user)
    const response=await sendEmail({email,emailType:"RESET",userId:user._id})
    console.log(response)
    return NextResponse.json({
      message:"email sent succesfully check your email"
    })

  } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
