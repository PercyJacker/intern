import React, { useState } from 'react'

const VideoUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const validateVideo = async (file) => {
        const maxFileSize = 100 * 1024 * 1024; // 100MB
        const video = document.createElement('video');
    
        return new Promise((resolve, reject) => {
          video.preload = 'metadata';
          video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
    
            const duration = video.duration;
            if (duration > 300) reject(new Error('Video duration exceeds 5 minutes'));
            if (file.size > maxFileSize) reject(new Error('File size exceeds 100MB'));
            resolve('File is valid');
          };
          video.onerror = () => reject(new Error('Invalid video file'));
          video.src = URL.createObjectURL(file);
        });
      };

      const handleUpload = async () => {
        if (!file) return setMessage('Please select a video file');
      
        try {
          const validationMessage = await validateVideo(file);
          setMessage(validationMessage);
      
          const formData = new FormData();
          formData.append('video', file);
      
          const response = await fetch('https://intern-a3y7.vercel.app/api/uploadvideo', {
            method: 'POST',
            body: formData,
          });
      
          if (!response.ok) throw new Error(`"Uploads are only allowed between 2 PM and 7 PM IST."`);
          const result = await response.text();
          setMessage(result);
        } catch (error) {
          setMessage(error.message ,"hbbbbbb" || 'An unknown error occurred');
        }
      };
      
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
          <h1 className="text-2xl font-bold mb-4">Video Upload</h1>
      
          <div className="flex flex-col items-center gap-4 bg-white p-6 shadow-md rounded-lg w-full max-w-md">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
            <button
              onClick={handleUpload}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Upload Video
            </button>
            <p className="text-gray-600 text-sm mt-2">{message}</p>
          </div>
        </div>
      );
      
}

export default VideoUpload
