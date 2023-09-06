import {NextResponse} from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = async (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedData = jwt.verify(token, process.env.JSON_SECRET);
    return decodedData.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
