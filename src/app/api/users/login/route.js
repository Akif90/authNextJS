import {connect} from "@/dbConfig/config";
import User from "@/models/user";
import {NextRequest, NextResponse} from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
  try {
    const {email, password} = await request.json();
    const user = await User.findOne({email});
    if (!user) {
      throw "User not found";
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      throw "Wrong Credentials";
    }

    //creating token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = await jwt.sign(tokenData, process.env.JSON_SECRET, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "Login Successful",
      username: user.username,
      success: true,
    });
    response.cookies.set("token", token, {httpOnly: true});
    return response;
  } catch (error) {
    return NextResponse.json({error: error.message, statusCode: 400});
  }
}
