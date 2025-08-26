import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
       const userId=await  getDataFromToken(request)
       const user=await User.findOne({_id:userId}).select("-password")
       return NextResponse.json({
        message:"User founnd",
        data:user
       })
    } catch (error) {
        return NextResponse.json({error:error.message},{status:400})
    }
} 