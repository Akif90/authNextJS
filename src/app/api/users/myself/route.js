import {NextResponse} from "next/server";
import {getTokenData} from "@/helpers/tokenData";
import {connect} from "@/dbConfig/config";
import User from "@/models/user";

connect();

export async function GET(request) {
  try {
    const id = await getTokenData(request);
    const user = await User.findOne({_id: id}).select("-password");
    return NextResponse.json({user});
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      status: 400,
    });
  }
}
