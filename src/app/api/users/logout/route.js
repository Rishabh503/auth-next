import { NextResponse } from "next/server"

export async function GET(){
    //clear out the token
    try {
        const response=NextResponse.json({
            message:"Logout Done",
            success:true
        })
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)})
        return response
    } catch (error) {
        console.log("errror in loggout ",error)
         return NextResponse.json(
              { error: error.message },
              { status: 500 }
         )
    }
}