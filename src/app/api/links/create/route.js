import { dbConnect } from "@/db/dbConfig";
import Link from "@/models/linksModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

dbConnect()
export async function POST(request){
  try {
      const reqbody=await request.json();
      const {url,title,userId,notes}=reqbody;
      console.log(reqbody)
      const user=await User.findById(userId)

      const newLink=await Link.create({
        url,
        title,
        userId,
        notes
      })
      console.log(newLink)
      if(!newLink) throw new Error("link creation has failed")

      await user.links.push(newLink);
      user.save();
      console.log("passed all")
      return NextResponse.json({
        message:"link creation done",
        success:true
      })
  } catch (error) {
        console.log(error)
        return NextResponse.json({error:error},{status:400})
  }
}

export async function PATCH(request){
  try {
      const reqbody=await request.json();
      const {linkId,url,title,userId,notes}=reqbody;
      console.log(reqbody)
      const user=await User.findById(userId)
        if(!user) throw new Error("user not found or somethig went wrong")
      const updatedLink=await Link.findByIdAndUpdate(linkId,{
        url,
        title,
        notes,
      },
      {new:true}
    )
      console.log(updatedLink)
      if(!updatedLink) throw new Error("link updation has failed")

     
      console.log("passed all")
      return NextResponse.json({
        message:"link updation done",
        success:true,
        updatedLink
      })
  } catch (error) {
        console.log(error)
        return NextResponse.json({error:error},{status:400})
  }
}


export async function DELETE(request) {
  try {
    const reqbody = await request.json();
    const { linkId, userId } = reqbody;

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");


    const deletedLink = await Link.findByIdAndDelete(linkId);
    if (!deletedLink) throw new Error("Link not found or already deleted");

    user.links = user.links.filter((id) => id.toString() !== linkId);
    await user.save();

    return NextResponse.json({
      message: "Link deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}