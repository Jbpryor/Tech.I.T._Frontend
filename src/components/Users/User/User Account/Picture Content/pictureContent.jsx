import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { userRoles } from "../../../../../Config/userRoles";
import { updateUser, viewImage, fetchUsers } from "../../../userSlice";
import { selectTheme } from "../../Settings/settingsSlice";
import { selectDemoUser } from "../../../../Auth/Demo Login/demoUserSlice";

const PictureContent = ({ user, theme }) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const demoUser = useSelector(selectDemoUser);

  const [requestStatus, setRequestStatus] = useState("idle")

  const [userRole, setUserRole] = useState();
  const [editedRole, setEditedRole] = useState({});
  const [fileContent, setFileContent] = useState();


  const handleChangeUserRole = () => {
    setEditMode(true);
  };

  const handleRoleChange = (event, userRole) => {
    const { value } = event.target;
    setEditedRole((prevEditedRole) => ({
      ...prevEditedRole,
      [userRole]: value,
    }));
    setUserRole(value);

  };

  const handleSaveUserRole = async () => {

    const updatedRole = {
      _id: user._id,
      role: userRole,
    }

    const response = await dispatch(updateUser(updatedRole));

    if (updateUser.fulfilled.match(response)) {
      console.log(response.message)
      const { message, updatedUser } = response.payload;

      setEditMode(false);
      alert(message);
    } else {
      alert("User role update failed: " + response.error.message);
    }
  };


  const handleSaveUserImage = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("_id", user._id);
    formData.append("file", file);
    formData.append("userName", user.name.first + ' ' + user.name.last);

    try {
      setRequestStatus("pending");

      const response = await dispatch(updateUser(formData));

      if (updateUser.fulfilled.match(response)) {

        const { imageId } = response.payload.updatedUser.userImage[0]
        handleViewImage(imageId)

        await fetchUsers();

      } else {
        const { message } = response.error;
        alert("Image not added: " + message);
        console.log(response)
      }
    } catch (error) {
      console.error("Failed to save the image", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  const imageId = user.userImage[0]?.imageId

  const handleViewImage = async (imageId) => {

    try {
      setRequestStatus("pending");

      const response = await dispatch(
        viewImage({ userId: user._id, imageId: imageId })
      );

      const { contentType, data } = response.payload;
      const isImage = contentType.startsWith("image/");

      if (isImage) {
        setFileContent(
          <img className="user-image" src={`data:${contentType};base64,${data}`} alt="Attachment" />
        );
      } else {
        setFileContent();
      }
    } catch (error) {
      console.error("Error fetching file data URL", error);
    } finally {
      setRequestStatus("idle");
    }
  };

  useEffect(() => {
    if (user.userImage?.length > 0) {
      handleViewImage(imageId);
    }
  }, [user.userImage]);

  return (
    <div
      className={`user-img-container ${
        demoUser === "admin" || demoUser === "manager" ? "admin" : ""
      }`}
      style={{
        background: theme.primary_color,
        border: `2px solid ${theme.border}`,
      }}
    >
      <div className="user-image-content">
        <label htmlFor="file">
          <input
            type="file"
            id='file'
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleSaveUserImage}
            style={{ display: "none" }}
          />
          {fileContent ? (
            fileContent
          ) : (
            <img
              className="user-image"
              src="/images/generic-profile-image.jpg"
              alt="Generic Profile"
            />
          )}
        </label>
      </div>
      <div className="user-name-content">
        <div className="user-name">
          {user?.name.first} {user?.name.last}
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
            <div className="user-role">{user?.role}</div>
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
