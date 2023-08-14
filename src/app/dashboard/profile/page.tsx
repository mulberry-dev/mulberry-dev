"use client";

import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <section>
        <h2>Profile</h2>
        <div className="profile-card px-4 border-radius-xl ">
          <h3>Session</h3>
          <p>Email: {session?.user?.email}</p>
          <p>Password: *******</p>
          <div>
            <p>Status: {status}</p>
          </div>
          <div>
            <p>Expires: {session?.expires}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
