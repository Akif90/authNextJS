"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) setIsActive(true);
    else setIsActive(false);
  }, [user]);

  const onLogin = async () => {
    try {
      const res = await axios.post("/api/users/login", user);
      const {username} = res.data;
      router.push(`/profile/${username}`);
    } catch (error) {
      console.log("Error", error?.response?.data || "");
    }
  };
  return (
    <div className="flex justify-center min-h-screen py-2 items-center flex-col">
      <h1>Login</h1>

      <hr />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="p-3 text-black rounded-lg"
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        id="email"
        value={user.email}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="p-3 text-black rounded-lg"
        onChange={(e) => setUser({...user, password: e.target.value})}
        id="password"
        placeholder="password"
        value={user.password}
      />

      <button
        onClick={onLogin}
        className="btn-info p-2 rounded-lg my-4 border border-white-200 "
      >
        {isActive ? "Login" : "Can not Login"}
      </button>
      <Link
        className="p-2 border rounded-md mb-2 border-white-400"
        href={"/signup"}
      >
        Sign Up
      </Link>
      <Link
        className="p-2 border rounded-md mb-2 border-white-400"
        href={"/forgetpassword"}
      >
        Forgot Password?
      </Link>
    </div>
  );
};

export default LoginPage;
