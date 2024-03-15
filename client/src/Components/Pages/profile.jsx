import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/profile/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProfileData(data);
        } else {
          console.error('Error fetching profile data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [id]);

  return (
    <div>
      {profileData ? (
        <div>
          <h1>{profileData.username}</h1>
          <p>Email: {profileData.email}</p>
          <p>Bio: {profileData.bio}</p>
          <img src={profileData.image} alt="Profile" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;

