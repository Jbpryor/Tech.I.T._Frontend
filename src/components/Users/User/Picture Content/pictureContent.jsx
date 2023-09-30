import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const PictureContent = ({ onFileSelected }) => {
  const [ selectedFile, setSelectedFile ] = useState(null);
  // const [ EditMode, setEditMode ] = useState(false);
  // const [ showSaveButton, setShowSaveButton ] = useState(false);
  // const [ userImage, setUserImage ] = useState('/images/default-profile.jpg');
  const inputRef = useRef(null);
  const dispatch = useDispatch();

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

  const openExplorer = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const users = useSelector((state) => state.users);
  const { userId } = useParams();

  const user = users.find((user) => {
    if (typeof user.id === 'string') {
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

  const storeProfilePicture = (file) => {
    const imagesDirectory = `${process.env.PUBLIC_URL}/images`;
    const filePath = `${imagesDirectory}/${uniqueFilename}`;
    localStorage.setItem(filePath, file);
  };
  
  return (
    <>
      <div className="user-image-content">
        <div ref={inputRef}>
          {selectedFile ? (
            <img className='user-image' src={selectedFile} alt="Profile" />
          ): (
            <img className='user-image' src='/images/generic-profile-image.jpg' alt="Generic Profile" />
          )}
      </div>
    </div>
    <div className="user-name-content">
      <div className="user-name">{user.name.first} {user.name.last}</div>
      <div className="user-role">{user.role}</div>
    </div>
    <div className="user-img-update-button">
      <input type='file' accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} ref={inputRef} />
      <button className="update" onClick={() => inputRef.current.click()}>Update</button>
    </div>
  </>
  );
};

export default PictureContent;
