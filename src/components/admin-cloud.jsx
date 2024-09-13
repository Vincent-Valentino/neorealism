import React, { useState, useEffect } from 'react';
import { Pane, Button, FilePicker, TextInput, Alert, Autocomplete } from 'evergreen-ui';

function AdminCloud() { // Changed the component name for clarity
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('none');
  const [selectedFile, setSelectedFile] = useState(null);
  const [newFileName, setNewFileName] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleFileSelect = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setNewFileName(file.name);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedMovie) {
      setMessageType('warning');
      setMessage('Please select a file and a movie.');
      return;
    }

    setUploading(true);
    setMessage('');
    setMessageType('none');

    const formData = new FormData();
    formData.append('file', selectedFile);  // The file itself
    formData.append('movie', selectedMovie);  // The movie title for MongoDB
    formData.append('customFileName', newFileName);  // The custom file name you want in Cloudinary

    try {
      // Updated the API endpoint here
      const response = await fetch('http://localhost:4000/api/cloud/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setUploading(false);

      if (response.ok) {
        setMessageType('success');
        setMessage('File uploaded successfully!');
      } else {
        setMessageType('danger');
        setMessage(`Error: ${result.error || 'Upload failed'}`);
      }
    } catch (error) {
      setUploading(false);
      setMessageType('danger');
      setMessage('Upload failed. Check console for more details.');
      console.error('Upload failed:', error);
    }
  };

  return (
    <Pane width="100%" height="100%" background="white" padding={16}>
      <Button
        appearance="primary"
        intent="success"
        onClick={handleUpload}
        disabled={uploading}
        marginBottom={16}
        width="100%"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>

      <FilePicker
        multiple={false}
        onChange={handleFileSelect}
        placeholder="Select a file to upload"
        width="100%"
        marginBottom={16}
      />

      <TextInput
        value={newFileName}
        onChange={(e) => setNewFileName(e.target.value)}
        placeholder="Change file name before uploading"
        width="100%"
        marginBottom={16}
      />
      <Autocomplete 
        title="Search Movies"
        onChange={(selected) => setSelectedMovie(selected)}
        items={movies.map((movie) => movie.title)}
        selectedItem={selectedMovie}
        position="bottom-left"  // Ensure the dropdown appears below the input
      >
        {(props) => (
          <TextInput
            placeholder="Search for a movie"
            value={selectedMovie}
            onChange={(e) => setSelectedMovie(e.target.value)}
            width="100%"
            {...props.getInputProps()}
          />
        )}
      </Autocomplete>
      {messageType !== 'none' && (
        <Alert
          intent={messageType}
          title={message}
          marginTop={16}
        />
      )}
    </Pane>
  );
}

export default AdminCloud;
