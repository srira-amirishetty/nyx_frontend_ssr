import React, { useState } from 'react';
import { FaArrowLeft, FaUpload, FaImage, FaVideo, FaLink } from 'react-icons/fa';
import './ToolPanels.css';

/**
 * MediaPanel Component
 * 
 * Provides an interface for adding and managing media in the video:
 * - Upload custom media (images/videos)
 * - Browse and search stock media
 * - Access previously used brand assets
 * 
 * @param {Object} props Component props
 * @param {Function} props.onClose Function to close the panel
 */
const MediaPanel = ({ onClose }) => {
  // Track the active tab in the media panel
  const [activeTab, setActiveTab] = useState('upload');
  // Track selected media items (would be used in a real implementation)
  const [selectedMedia, setSelectedMedia] = useState([]);
  
  // Sample stock media items for demonstration
  const stockMedia = [
    { id: 's1', thumbnail: 'https://via.placeholder.com/160x90/444/fff?text=Stock+1', type: 'image' },
    { id: 's2', thumbnail: 'https://via.placeholder.com/160x90/444/fff?text=Stock+2', type: 'video' },
    { id: 's3', thumbnail: 'https://via.placeholder.com/160x90/444/fff?text=Stock+3', type: 'image' },
    { id: 's4', thumbnail: 'https://via.placeholder.com/160x90/444/fff?text=Stock+4', type: 'video' },
    { id: 's5', thumbnail: 'https://via.placeholder.com/160x90/444/fff?text=Stock+5', type: 'image' },
    { id: 's6', thumbnail: 'https://via.placeholder.com/160x90/444/fff?text=Stock+6', type: 'video' },
    { id: 's7', thumbnail: 'https://via.placeholder.com/160x90/444/fff?text=Stock+7', type: 'image' },
    { id: 's8', thumbnail: 'https://via.placeholder.com/160x90/444/fff?text=Stock+8', type: 'video' },
  ];
  
  // Sample brand media items for demonstration
  const brandMedia = [
    { id: 'b1', thumbnail: 'https://via.placeholder.com/160x90/333/fff?text=Logo', type: 'image' },
    { id: 'b2', thumbnail: 'https://via.placeholder.com/160x90/333/fff?text=Product', type: 'image' },
    { id: 'b3', thumbnail: 'https://via.placeholder.com/160x90/333/fff?text=Team', type: 'image' },
  ];

  // Handlers for media interaction (would be implemented in real application)
  const handleFileUpload = (files) => {
    // Logic to handle file upload
    console.log('Files uploaded', files);
  };

  const handleUrlImport = (url) => {
    // Logic to import media from URL
    console.log('Import from URL', url);
  };

  const handleMediaSelect = (mediaId) => {
    // Logic to select/deselect a media item
    console.log('Media selected', mediaId);
    
    // Toggle selection (in a real implementation)
    setSelectedMedia(prev => {
      if (prev.includes(mediaId)) {
        return prev.filter(id => id !== mediaId);
      } else {
        return [...prev, mediaId];
      }
    });
  };

  return (
    <div className="tool-panel">
      {/* Panel header with back button */}
      <div className="tool-panel-header">
        <button className="back-button" onClick={onClose} aria-label="Go back">
          <FaArrowLeft />
        </button>
        <h3>Media Library</h3>
      </div>
      
      {/* Tab navigation for different media sources */}
      <div className="media-tabs" role="tablist">
        <button 
          className={`media-tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
          role="tab"
          aria-selected={activeTab === 'upload'}
          aria-controls="upload-tab"
        >
          <FaUpload /> Upload
        </button>
        <button 
          className={`media-tab ${activeTab === 'stock' ? 'active' : ''}`}
          onClick={() => setActiveTab('stock')}
          role="tab"
          aria-selected={activeTab === 'stock'}
          aria-controls="stock-tab"
        >
          <FaImage /> Stock Media
        </button>
        <button 
          className={`media-tab ${activeTab === 'brand' ? 'active' : ''}`}
          onClick={() => setActiveTab('brand')}
          role="tab"
          aria-selected={activeTab === 'brand'}
          aria-controls="brand-tab"
        >
          <FaVideo /> My Brand
        </button>
      </div>
      
      <div className="tool-panel-content">
        {/* Upload Tab Content */}
        {activeTab === 'upload' && (
          <div id="upload-tab" role="tabpanel" className="upload-section">
            <div className="upload-area large">
              <div 
                className="upload-box" 
                role="button"
                aria-label="Upload files"
                onClick={() => document.getElementById('file-upload').click()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <input 
                  type="file" 
                  id="file-upload" 
                  multiple 
                  accept="image/*, video/*" 
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <FaUpload className="upload-icon" />
                <div className="upload-text">
                  <strong>Drag and drop files here</strong>
                  <p>Or click to browse your computer</p>
                </div>
                <p className="upload-formats">Supports JPG, PNG, MP4, MOV up to 50MB</p>
              </div>
            </div>
            
            {/* URL Import section */}
            <div className="url-import">
              <h4>Import from URL</h4>
              <div className="url-input-group">
                <input 
                  type="text" 
                  placeholder="Paste link to media (YouTube, Vimeo, etc.)" 
                  className="url-input"
                  aria-label="Media URL"
                  id="url-input"
                />
                <button 
                  className="url-btn"
                  onClick={() => handleUrlImport(document.getElementById('url-input').value)}
                >
                  <FaLink /> Import
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Stock Media Tab Content */}
        {activeTab === 'stock' && (
          <div id="stock-tab" role="tabpanel" className="stock-media-section">
            <div className="stock-search">
              <input 
                type="text" 
                placeholder="Search stock media..." 
                className="search-input"
                aria-label="Search stock media"
              />
              {/* Filter buttons for stock media types */}
              <div className="stock-filters" role="radiogroup" aria-label="Media type filter">
                <button className="stock-filter active" role="radio" aria-checked="true">All</button>
                <button className="stock-filter" role="radio" aria-checked="false">Images</button>
                <button className="stock-filter" role="radio" aria-checked="false">Videos</button>
              </div>
            </div>
            
            {/* Grid of stock media items */}
            <div className="media-grid">
              {stockMedia.map(item => (
                <div 
                  key={item.id} 
                  className="media-item"
                  onClick={() => handleMediaSelect(item.id)}
                  role="checkbox"
                  aria-checked={selectedMedia.includes(item.id)}
                  aria-label={`Stock ${item.type} ${item.id}`}
                >
                  <img src={item.thumbnail} alt={`Stock media ${item.id}`} />
                  <div className="media-item-type">
                    {item.type === 'video' ? <FaVideo /> : <FaImage />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Brand Media Tab Content */}
        {activeTab === 'brand' && (
          <div id="brand-tab" role="tabpanel" className="brand-media-section">
            <h4>Your Brand Media</h4>
            <p className="section-description">Previously uploaded brand assets</p>
            
            {/* Grid of brand media items */}
            <div className="media-grid">
              {brandMedia.map(item => (
                <div 
                  key={item.id} 
                  className="media-item"
                  onClick={() => handleMediaSelect(item.id)}
                  role="checkbox"
                  aria-checked={selectedMedia.includes(item.id)}
                  aria-label={`Brand ${item.type} ${item.id}`}
                >
                  <img src={item.thumbnail} alt={`Brand media ${item.id}`} />
                  <div className="media-item-type">
                    {item.type === 'video' ? <FaVideo /> : <FaImage />}
                  </div>
                </div>
              ))}
              {/* Add new brand media button */}
              <div 
                className="media-item upload-item"
                role="button"
                aria-label="Add new brand media"
                onClick={() => document.getElementById('brand-upload').click()}
              >
                <input 
                  type="file" 
                  id="brand-upload" 
                  multiple 
                  accept="image/*, video/*" 
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <FaUpload />
                <div>Add New</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Panel footer with action buttons */}
      <div className="tool-panel-footer">
        <button className="cancel-button" onClick={onClose}>Cancel</button>
        <button 
          className="apply-button"
          disabled={selectedMedia.length === 0}
        >
          Insert Selected Media
        </button>
      </div>
    </div>
  );
};

export default MediaPanel; 