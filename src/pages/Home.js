import React, { useState } from 'react';
import csvtojson from 'csvtojson';
import { Authenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import {fetchCsvFilesRepo, deleteCsvFileRepo, handleUploadRepo, downloadHandlerRepo, viewAsJsonHandlerRepo} from '../repos/csv'
import '@aws-amplify/ui-react/styles.css';
import Navbar from '../shared/Navbar.js';
import Table from '../shared/Table.js';
import './Home.css';

const Home = () => {
  const [userGroup, setUserGroup] = useState(null);
  const [csvFiles, setCsvFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [jsonObj, setJsonObj] = useState(null)

  const fetchCsvFiles = async () => {
    try {
      const token = await Auth.currentSession();
      const repoResult = await fetchCsvFilesRepo(token, 'GET')
      setCsvFiles(repoResult.body);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCsvFile = async (fileName) => {
    try {
      const token = await Auth.currentSession();
      await deleteCsvFileRepo(token, 'DELETE', fileName)
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
      await handleUploadRepo(token, 'POST', selectedFile)

      setSelectedFile(null);
      setShowConfirmation(false);
    } catch (err) {
      console.log(err);
    } finally {
      fetchCsvFiles();
    }
  };

  const downloadClickHandler = async (fileName) => {
    try {
      const token = await Auth.currentSession();
      const response = await downloadHandlerRepo(token, 'GET', fileName)
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const suggestedName = fileName.split('.csv')[0];
      const downloadedFileName = window.prompt('Save file as:', suggestedName);
      if (downloadedFileName) {
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadedFileName + '.csv';
        a.click();
      }
  
    } catch (err) {
      console.log(err);
    }
  };

  const viewAsJsonHandler = async (fileName) => {
    try {
      const token = await Auth.currentSession();
      const response = await viewAsJsonHandlerRepo(token, 'GET', fileName)
      const csvText = await response.text();
      const jsonObj = await csvtojson().fromString(csvText);
      setJsonObj(jsonObj);
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
              { (userGroup == 'Admins' || userGroup == 'Writers') &&
                <>
                  <label htmlFor='file-upload' className='input-label'>{selectedFile ? selectedFile.name : "Choose File"}</label>
                  <input type="file" onChange={handleFileInput} onClick={(event) => {event.target.value = null}} id='file-upload'/>
                  {showConfirmation && (
                    <>
                      <button onClick={handleUploadClick} className='confirm-upload-button delete-button'>Confirm Upload</button>
                      <button onClick={() => {setShowConfirmation(false); setSelectedFile(null)}} className='delete-button'>Cancel Upload</button>
                    </>
                  )}
                </>
              }
              <Table files={csvFiles} onDelete={deleteCsvFile} onDownload={downloadClickHandler} onViewJson={viewAsJsonHandler} userGroup={userGroup}/>
              {jsonObj && (
                <div className='section-container'>
                  <section>
                    <h2>JSON Data:</h2>
                    <pre>{JSON.stringify(jsonObj, null, 2)}</pre>
                  </section>
                </div>
              )}
            </main>
          </>
        );
      }}
    </Authenticator>
  );
};

export default Home;
