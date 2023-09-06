import {connect} from "@/dbConfig/config";
import User from "@/models/user";
import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      status: 200,
    });
    response.cookies.set("token", "", {httpOnly: true});
    return response;
  } catch (error) {
    return NextResponse.json({error: error.message, status: 400});
  }
}
