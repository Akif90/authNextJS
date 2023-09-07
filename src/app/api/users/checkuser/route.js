import {connect} from "@/dbConfig/config";
import User from "@/models/user";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendEmail} from "@/helpers/mailer";

connect();

export async function POST(request) {
  try {
    const {email} = await request.json();
    const user = await User.findOne({email});
    if (!user) throw new Error("User with the given email does not exists");
    console.log(user);
    await sendEmail({email, emailType: "RESET", id: user._id});
    return NextResponse.json({message: "User found"});
  } catch (error) {
    return NextResponse.json({error: error.message, status: 500});
  }
}
