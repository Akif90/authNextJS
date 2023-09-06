"use client";

import React from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const UserProfile = ({params}) => {
  const router = useRouter();
  const onLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center min-h-screen flex-col items-center w-full h-full">
      <div>
        <h1>User Profile</h1>
        <h4>Profile id: {params.id}</h4>
      </div>
      <div>
        <button
          onClick={onLogout}
          className="bg-red-300 hover:bg-lime-900 rounded-md py-2 mt-3 px-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
