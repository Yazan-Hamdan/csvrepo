const API_URL = `${process.env.REACT_APP_API_URL}/dev/csvfiles`;


const fetchCsvFilesRepo = async (token, method) => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token.getIdToken().getJwtToken()}`,
        },
        method: method
      });
      const data = await response.json();
      return data
    } catch (err) {
      console.log(err);
    }
  };


const deleteCsvFileRepo = async (token, method, fileName) => {
    try {
      await fetch(`${API_URL}/${fileName}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token.getIdToken().getJwtToken()}`,
        }
      });
    } catch (err) {
      console.log(err);
    }
  };


const handleUploadRepo = async (token, method, selectedFile) => {
    try {
      const formData = new FormData();
      formData.append('csvFile', selectedFile);
      await fetch(API_URL, {
        method: method,
        headers: {
          Authorization: `Bearer ${token.getIdToken().getJwtToken()}`,
        },
        body: formData
      });
      
    } catch (err) {
      console.log(err);
    }
  };

const downloadHandlerRepo = async (token, method, fileName) => {
    try {
      const response = await fetch(`${API_URL}/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token.getIdToken().getJwtToken()}`,
        },
        method: method,
      });
      return response
  
    } catch (err) {
      console.log(err);
    }
  };

const viewAsJsonHandlerRepo = async (token, method,fileName) => {
    try {
      const response = await fetch(`${API_URL}/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token.getIdToken().getJwtToken()}`,
        },
        method: method,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };


export {fetchCsvFilesRepo, deleteCsvFileRepo, handleUploadRepo, downloadHandlerRepo, viewAsJsonHandlerRepo}