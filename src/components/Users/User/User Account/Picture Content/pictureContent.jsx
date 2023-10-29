import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userRoles } from "../../../../../Constants/userRoles";
import { changeUserRole } from "../../../../../Store/Slices/userSlice";

const PictureContent = ({ onFileSelected }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  // const [ showSaveButton, setShowSaveButton ] = useState(false);
  // const [ userImage, setUserImage ] = useState('/images/default-profile.jpg');
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const theme = useSelector(
    (state) => state.settings.themes[state.settings.theme]
  );

  const demoUser = useSelector((state) => state.demoUser);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const baseImg = event.target.result;
        setSelectedFile(baseImg);
      };

      reader.readAsDataURL(file);
    }
  };

  // const openExplorer = () => {
  //   if (inputRef.current) {
  //     inputRef.current.click();
  //   }
  // };

  const users = useSelector((state) => state.users);
  const { userId } = useParams();

  const user = users.find((user) => {
    if (typeof user.id === "string") {
      return user.id === userId;
    } else {
      return user.id.toString() === userId;
    }
  });

  // const generateUniqueFilename = (file, user) => {
  //   const fileName = file.name;
  //   const fileExtension = fileName.split('.').pop();
  //   const uniqueFilename = `${user}-${Date.now()}.${fileExtension}`;
  //   return uniqueFilename;
  // };

  // const handleFileSelected = (file) => {
  //   const uniqueFilename = generateUniqueFilename(file, user);
  //   dispatch(updateProfilePicture(user, uniqueFilename));
  //   storeProfilePicture(file, uniqueFilename);
  // };

  // const storeProfilePicture = (file) => {
  //   const imagesDirectory = `${process.env.PUBLIC_URL}/images`;
  //   const filePath = `${imagesDirectory}/${uniqueFilename}`;
  //   localStorage.setItem(filePath, file);
  // };

  const [userRole, setUserRole] = useState("");
  const [editedRole, setEditedRole] = useState({});

  const handleChangeUserRole = () => {
    setEditMode(true);
  };

  const handleSaveUserRole = () => {
    setUserRole(editedRole[userRole]);
    dispatch(
      changeUserRole({
        selectedUser: user.id,
        selectedRole: editedRole[userRole],
      })
    );
    setEditMode(false);
  };

  const handleRoleChange = (event, userRole) => {
    const { value } = event.target;
    setEditedRole((prevEditedRole) => ({
      ...prevEditedRole,
      [userRole]: value,
    }));
  };

  return (
    <div
      className={`user-img-container ${demoUser === 'admin' || demoUser === 'manager' ? 'admin' : '' }`}
      style={{
        background: theme.primary_color,
        border: `2px solid ${theme.border}`,
      }}
    >
      <div className="user-image-content">
        <div
          ref={inputRef}
          onClick={() => {
            inputRef.current.click();
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={inputRef}
          />
          {selectedFile ? (
            <img className="user-image" src={selectedFile} alt="Profile" />
          ) : (
            <img
              className="user-image"
              src="public/images/generic-profile-image.jpg"
              alt="Generic Profile"
            />
          )}
        </div>
      </div>
      <div className="user-name-content">
        <div className="user-name">
          {user.name.first} {user.name.last}
        </div>
        <div className="user-role-container">
          {editMode ? (
            <select
              value={userRole}
              className="user-role-select"
              onChange={(event) => handleRoleChange(event, userRole)}
              style={{
                background: theme.primary_color,
                border: `1px solid ${theme.primary_color}`,
                color: theme.font_color,
              }}
            >
              <option value={user.role}>{user.role}</option>
              {userRoles.map(
                (role) =>
                  role !== user.role && (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  )
              )}
            </select>
          ) : (
            <div className="user-role">{user.role}</div>
          )}
        </div>
        <div className="change-role-buttons-container">
          {(demoUser === "admin" || demoUser === "manager") && (
            <>
              {editMode ? (
                <button
                  className="save-role-button"
                  onClick={handleSaveUserRole}
                  style={{
                    background: theme.background_color,
                    color: theme.font_color,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className="change-role-button"
                  onClick={handleChangeUserRole}
                  style={{
                    background: theme.background_color,
                    color: theme.font_color,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  Change Role
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PictureContent;
