import {connect} from "@/dbConfig/config";
import User from "@/models/user";
import {NextRequest, NextResponse} from "next/server";

connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {token} = reqBody;
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: {$gt: Date.now()},
    });

    if (!user) {
      return NextResponse.json({
        error: "Invalid token",
      });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    console.log(user);
    await user.save();
    return NextResponse.json({
      message: "Email verified",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({error: error.message});
  }
}
