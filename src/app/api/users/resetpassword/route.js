import { dbConnect } from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs" 
dbConnect();
export async function POST(request) {
  try {
    const reqbody = await request.json();
    const { token, password, confirmPassword } = reqbody;
    console.log(reqbody);

    if (!token || !password || !confirmPassword)
      throw new Error("missing credentials");

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        { error: "user not found or login or invalid token" },
        { status: 400 }
      );
    }
    console.log(user);
    //    user.isVerified=true;
    //    user.verifyToken=undefined;
    //    user.verifyTokenExpiry=undefined;
    if(password!==confirmPassword) throw new Error("passowrd and confirm password are not same")
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    user.password=hashedPassword;
    user.forgotPasswordToken=false;
    user.forgotPasswordTokenExpiry=undefined;
    await user.save();
    return NextResponse.json({
      message: "password changed succcesuflly",
      succes: true,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
