"use client";
import axios from "axios";
import React, {useState} from "react";

const Profile = () => {
  const [user, setUser] = useState();
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/myself");
    setUser(res.data.user);
    console.log(res.data);
  };
  return (
    <div>
      <h1>Profile</h1>
      {user && <div>Found Users details</div>}
      <button
        onClick={getUserDetails}
        className="bg-red-300 hover:bg-lime-900 rounded-md py-2 mt-3 px-4"
      >
        Get Users detail
      </button>
    </div>
  );
};

export default Profile;
