import React, { useState } from "react";
import PictureContent from "./Picture Content/pictureContent";
import UserInfo from "./User Info/userInfo";


function UserAccount({ user, theme, accountActive }) {

    const [, setProfilePicture] = useState(null);

    const handleFileSelected = (file) => {
      setProfilePicture(file);
    };

    return (
        <div className={`user-account-container ${accountActive ? 'active' : ''}`}>

            <PictureContent onFileSelected={handleFileSelected} theme={theme} />
            <UserInfo user={user} theme={theme} />

        </div>
    )
}

export default UserAccount;