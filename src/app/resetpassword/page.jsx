"use client";
import axios from "axios";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {useSearchParams} from "next/navigation";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const onReset = async () => {
    try {
      const token = searchParams.get("token");
      console.log(token);
      const res = await axios.post("/api/users/resetpassword", {
        password,
        token,
      });
      console.log("Password reset successfully");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center min-h-screen py-2 items-center flex-col">
      <label htmlFor="password">Enter a new password</label>
      <input
        type="password"
        value={password}
        className="p-3 rounded-lg text-black"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn-info p-2 rounded-lg my-4 border border-white-200"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

export default ResetPassword;
