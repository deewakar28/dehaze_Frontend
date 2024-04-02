import React, { useState } from 'react';
import axios from 'axios';

function VideoDehaze() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage('Please select a file');
      return;
    }

    setProcessing(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('upload_file', selectedFile);

      const response = await axios.post('http://localhost:8000/dehaze_video/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

    
      console.log('Response:', response);
    } catch (error) {
      setErrorMessage('Error uploading file');
      console.error('Error:', error);
    }

    setProcessing(false);
  };

  return (
    <div>
      <h1>Video Dehazing</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={processing}>Upload</button>
      {errorMessage && <p>{errorMessage}</p>}
      {processing && <p>Processing...</p>}
    </div>
  );
}

export default VideoDehaze;
