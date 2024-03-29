import PictureContent from "./Picture Content/pictureContent";
import UserInfo from "./User Info/userInfo";


function UserAccount({ user, theme, accountActive }) {

    return (
        <div className={`user-account-container ${accountActive ? 'active' : ''}`}>

            <PictureContent user={user} theme={theme} />
            <UserInfo user={user} theme={theme} />

        </div>
    )
}

export default UserAccount;