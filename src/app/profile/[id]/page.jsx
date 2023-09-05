import React from "react";

const UserProfile = ({params}) => {
  return (
    <div>
      <h1>User Profile</h1>
      <h4>Profile id: {params.id}</h4>
    </div>
  );
};

export default UserProfile;
