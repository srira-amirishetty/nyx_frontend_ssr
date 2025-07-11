import React, { useState } from 'react';
import { FaDownload, FaCopy, FaShareAlt, FaThumbsUp, FaPlay, FaExpand, FaVolumeUp, FaEdit } from 'react-icons/fa';
import './VideoPreview.css';
import ChatEditor from './ChatEditor';

const VideoPreview = () => {
  const [showChatEditor, setShowChatEditor] = useState(false);
  
  const handleOpenEditor = () => {
    setShowChatEditor(true);
  };
  
  const handleCloseEditor = () => {
    setShowChatEditor(false);
  };
  
  return (
    <div className="video-preview">
      <h2>Generated Video</h2>
      
      <div className="video-container">
        <div className="video-player">
          <img 
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
            alt="Preview of a couple sitting on a couch looking at their phones"
            className="preview-image"
          />
          <div className="video-controls">
            <div className="video-progress">
              <div className="progress-bar"></div>
            </div>
            <div className="control-buttons">
              <button className="play-button"><FaPlay /></button>
              <div className="time-display">0:00 / 0:15</div>
              <div className="control-spacer"></div>
              <button className="control-button"><FaVolumeUp /></button>
              <button className="control-button"><FaExpand /></button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="action-buttons">
        <div className="left-buttons">
          <button className="canvas-button">Open with Brand Canvas</button>
          <button className="edit-button" onClick={handleOpenEditor}>
            <FaEdit />
            Edit Video Content
          </button>
        </div>
        <div className="right-buttons">
          <button className="icon-button"><FaDownload /></button>
          <button className="icon-button"><FaCopy /></button>
          <button className="icon-button"><FaShareAlt /></button>
          <button className="icon-button"><FaThumbsUp /></button>
        </div>
      </div>
      
      {showChatEditor && (
        <ChatEditor onClose={handleCloseEditor} />
      )}
    </div>
  );
};

export default VideoPreview; 