import React, { useState } from "react";
import axios from "axios";

const MusicUpload = () => {
  const [musicData, setMusicData] = useState({
    title: "",
    isFavourite: false,
    artist: "",
    duration: "",
  });
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMusicData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a music file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file
    formData.append("title", musicData.title);
    formData.append("isFavourite", musicData.isFavourite);
    formData.append("artist", musicData.artist);
    formData.append("duration", musicData.duration);

    try {
      setUploading(true);
      const response = await axios.post("http://localhost:3000/api/music", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Music uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading music:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Music</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={musicData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Artist:</label>
          <input
            type="text"
            name="artist"
            value={musicData.artist}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration (in seconds):</label>
          <input
            type="number"
            name="duration"
            value={musicData.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            Is Favourite:
            <input
              type="checkbox"
              name="isFavourite"
              checked={musicData.isFavourite}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>Music File:</label>
          <input type="file" accept="audio/*" onChange={handleFileChange} required />
        </div>
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Music"}
        </button>
      </form>
    </div>
  );
};

export default MusicUpload;