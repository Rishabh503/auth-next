import { dbConnect } from "@/db/dbConfig"
import User from "@/models/userModel"
import { NextResponse } from "next/server"

dbConnect()
export async function POST(request){
    try {
        const reqbody=await request.json()
        const {token}=reqbody
        console.log(token)

       const user=await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
       if(!user){
        return NextResponse.json({error:"user not found or login or invalid token"},{status:400})
       }
       console.log(user);
       user.isVerified=true;
       user.verifyToken=undefined;
       user.verifyTokenExpiry=undefined;
       await user.save();
        return NextResponse.json({
               message:"email verified sucessfully",
               succes:true
              })
    } catch (error) {
          return NextResponse.json({error:error.message},{status:400})
    }
}