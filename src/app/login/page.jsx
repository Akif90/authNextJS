"use client";
import React, {useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};
  return (
    <div className="flex justify-center min-h-screen py-2 items-center flex-col">
      <h1>Login</h1>

      <hr />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="p-3 rounded-lg"
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        id="email"
        value={user.email}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="p-3 rounded-lg"
        onChange={(e) => setUser({...user, password: e.target.value})}
        id="password"
        placeholder="password"
        value={user.password}
      />

      <button
        onClick={onLogin}
        className="btn-info p-2 rounded-lg my-4 border border-white-200 "
      >
        Login
      </button>
      <Link href={"/signup"}>Visit SignUp</Link>
    </div>
  );
};

export default LoginPage;
