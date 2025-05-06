import React, { useState, useEffect } from "react";
import classes from "../Layouts/AppLayout.module.css"

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  return (
    <div className={classes.Profile}>
      <ul className={classes.ProfileContent}>
        <li className={classes.content}>
          <div className={classes.pfp}>
            <img src={"images/DreamChillz.jpg"} alt="Profile" />
          </div>
          <div className={classes.name}>Tanasdasd</div>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
