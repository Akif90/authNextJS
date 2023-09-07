"use client";
import axios from "axios";
import React, {useState} from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const onSubmit = async () => {
    try {
      console.log("You clicked");
      const res = await axios.post("/api/users/checkuser", {email});
      console.log("Check your email to reset password");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center min-h-screen py-2 items-center flex-col">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="p-3 text-black rounded-lg"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        id="email"
        value={email}
      />
      <button
        className="btn-info p-2 rounded-lg my-4 border border-white-200 "
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default ForgetPassword;
