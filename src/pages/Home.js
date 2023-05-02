import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import Navbar from './Navbar.js';
import Table from './Table.js';
import './Home.css';

const API_URL = `${process.env.REACT_APP_API_URL}/dev/csvfiles`;

const Home = () => {
  const [userGroup, setUserGroup] = useState(null);
  const [csvFiles, setCsvFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchCsvFiles = async () => {
    try {
      const token = await Auth.currentSession();
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token.getIdToken().getJwtToken()}`,
        },
        method: 'GET'
      });
      const data = await response.json();
      setCsvFiles(data.body);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCsvFile = async (fileName) => {
    try {
      const token = await Auth.currentSession();
      await fetch(`${API_URL}/${fileName}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.getIdToken().getJwtToken()}`,
        }
      });
      fetchCsvFiles();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
    setShowConfirmation(true);
  };

  const handleUploadClick = async () => {
    try {
      const token = await Auth.currentSession();
      const formData = new FormData();
      formData.append('csvFile', selectedFile);
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.getIdToken().getJwtToken()}`,
        },
        body: formData,
        mode: 'no-cors'
      });
      fetchCsvFiles();
      setSelectedFile(null);
      setShowConfirmation(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Authenticator>
      {({ signOut, user }) => {
        if (user && user.signInUserSession) {
          const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
          setUserGroup(groups);
        }

        return (
          <>
            <Navbar userGroup={userGroup} SignOutHandler={signOut}/>
            <main>
              <h1>Hello {user && user.username}</h1>
              <button onClick={fetchCsvFiles} className='view-button'>List Csv Files</button>
              <input type="file" onChange={handleFileInput} />
              {showConfirmation && (
                <>
                  <button onClick={handleUploadClick} className='confirm-button'>Confirm Upload</button>
                  <button onClick={() => setShowConfirmation(false)} className='cancel-button'>Cancel Upload</button>
                </>
              )}
              <Table files={csvFiles} onDelete={deleteCsvFile} />
            </main>
          </>
        );
      }}
    </Authenticator>
  );
};

export default Home;
