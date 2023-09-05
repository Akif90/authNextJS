"use client";
import React, {useState, useEffect, useDeferredValue} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";

const SignUpPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    )
      setIsActive(true);
    else setIsActive(false);
  }, [user]);

  const onSignUp = async () => {
    try {
      const res = await axios.post("/api/users/signup", user);
      console.log(res.data);
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center min-h-screen py-2 items-center flex-col">
      <h1>Sign up</h1>

      <hr />

      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="p-3 text-black rounded-lg"
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="username"
        value={user.username}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        className="p-3 rounded-lg text-black"
        onChange={(e) => setUser({...user, password: e.target.value})}
        id="password"
        placeholder="password"
        value={user.password}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        className="p-3 text-black rounded-lg"
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
        id="email"
        value={user.email}
      />
      <button
        onClick={onSignUp}
        className="btn-info p-2 rounded-lg my-4 border border-white-200"
      >
        {isActive ? "Sign Up" : "Can not Sign Up"}
      </button>
      <Link href={"/login"}>Visit Login</Link>
    </div>
  );
};

export default SignUpPage;
