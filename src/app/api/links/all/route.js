import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import Link from "@/models/linksModel";
import { NextResponse } from "next/server";
import { dbConnect } from "@/db/dbConfig";


export async function GET(request){
  await dbConnect()
   try {
    const id=await getDataFromToken(request);
    console.log(id);
       if (!id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const user=await User.findById(id).populate("links");
       if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }
      const links = user.links ;

    return NextResponse.json({
        message:"all the links",
        links,
        success:true
    })
   } catch (error) {
     console.error("Error fetching links:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
   }
}