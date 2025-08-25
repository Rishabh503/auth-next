import { dbConnect } from "@/db/dbConfig"
import User from "@/models/userModel"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs" 
// import { connect } from "mongoose"
import jwt from "jsonwebtoken"

dbConnect()

export async function POST(request){
    try {
        const reqbody=await request.json()
        const {email,password}=reqbody;
        console.log(reqbody);
        // checking user 
        const existingUser=await User.findOne({email});
        if(!existingUser) {
            return NextResponse.json({error:"user with this email doesnt exists"},{status:404})
        }
        //check password 
        const validPassword=await bcrypt.compare(password,existingUser.password);
        //wrong pass error
        if(!validPassword){
             return NextResponse.json({error:"invalid password"},{status:404})
        }
        //login
        // create a tokenData
        const tokenData={
            id:existingUser._id,
            username:existingUser.username,
            email:existingUser.email
        }
        //make the token
        const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})
        const response=NextResponse.json({
            message:"login success",
            success:true
        })
        // now we made a response which we will send bd me
        //  but beech me we can use it for our manipulation
        //  of the cookeis on the frontedn
        //  so we will send the details of the token in the cookeis only through this method 
        response.cookies.set("token",token,{
            httpOnly:true,
        })
        return response;
    } catch (error) {
        console.log(error)
         return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
    }
}
