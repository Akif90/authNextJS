import {connect} from "@/dbConfig/config";
import User from "@/models/user";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import {sendEmail} from "@/helpers/mailer";

connect();

export async function POST(request) {
  try {
    const {password, token} = await request.json();
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: {$gt: Date.now()},
    });

    if (!user) {
      return NextResponse.json({
        error: "Invalid token",
      });
    }
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    user.password = hashedPassword;
    await user.save();
    return NextResponse.json({
      message: "Email verified",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({error: error.message, status: 500});
  }
}
