import React, { useState } from 'react';
import { FaArrowLeft, FaCog, FaCheck } from 'react-icons/fa';
import './ToolPanels.css';

/**
 * SettingsPanel Component
 *
 * Provides an interface for configuring video settings:
 * - Format settings (aspect ratio, dimensions)
 * - Brand customization (colors, logo placement)
 * - Export options (quality, format, platform optimizations)
 *
 * @param {Object} props Component props
 * @param {Function} props.onClose Function to close the panel
 */
const SettingsPanel = ({ onClose }) => {
  // Active tab state for settings panel
  const [activeTab, setActiveTab] = useState('format');
  // Selected format state
  const [selectedFormat, setSelectedFormat] = useState('f3'); // Default to 16:9
  // Duration settings state
  const [videoDuration, setVideoDuration] = useState(15);
  const [sceneDuration, setSceneDuration] = useState(5);

  // Format presets for video aspects
  const formatPresets = [
    { id: 'f1', name: 'Square 1:1', dimensions: '1080 x 1080px', platform: 'Instagram, Facebook' },
    { id: 'f2', name: 'Portrait 4:5', dimensions: '1080 x 1350px', platform: 'Instagram, Pinterest' },
    { id: 'f3', name: 'Landscape 16:9', dimensions: '1920 x 1080px', platform: 'YouTube, Web' },
    { id: 'f4', name: 'Vertical 9:16', dimensions: '1080 x 1920px', platform: 'TikTok, Instagram Stories' },
    { id: 'f5', name: 'Widescreen 21:9', dimensions: '2560 x 1080px', platform: 'Cinematic Web' },
  ];

  // Handler for format selection
  const handleFormatSelect = (formatId) => {
    setSelectedFormat(formatId);
  };

  // Handler for video duration changes
  const handleVideoDurationChange = (e) => {
    setVideoDuration(e.target.value);
  };

  // Handler for scene duration changes
  const handleSceneDurationChange = (e) => {
    setSceneDuration(e.target.value);
  };

  return (
    <div className="tool-panel">
      {/* Panel header with back button */}
      <div className="tool-panel-header">
        <button className="back-button" onClick={onClose} aria-label="Go back">
          <FaArrowLeft />
        </button>
        <h3 className='text-base text-[#FFFFFF] font-bold'>Video Settings</h3>
      </div>

      {/* Tab navigation for settings panel */}
      <div className="settings-tabs" role="tablist">
        <button
          className={`settings-tab ${activeTab === 'format' ? 'active' : ''}`}
          onClick={() => setActiveTab('format')}
          role="tab"
          aria-selected={activeTab === 'format'}
          aria-controls="format-tab"
        >
          Format
        </button>
        <button
          className={`settings-tab ${activeTab === 'branding' ? 'active' : ''}`}
          onClick={() => setActiveTab('branding')}
          role="tab"
          aria-selected={activeTab === 'branding'}
          aria-controls="branding-tab"
        >
          Branding
        </button>
        <button
          className={`settings-tab ${activeTab === 'export' ? 'active' : ''}`}
          onClick={() => setActiveTab('export')}
          role="tab"
          aria-selected={activeTab === 'export'}
          aria-controls="export-tab"
        >
          Export
        </button>
      </div>

      <div className="tool-panel-content">
        {/* Format Tab Content */}
        {activeTab === 'format' && (
          <div id="format-tab" role="tabpanel" className="format-section">
            {/* Video Format/Aspect Ratio Selection */}
            <div className="tool-section">
              <h4>Video Format</h4>
              <p className="section-description">Choose the aspect ratio for your video</p>

              <div className="format-presets">
                {formatPresets.map(format => (
                  <div
                    key={format.id}
                    className={`format-preset ${format.id === selectedFormat ? 'active' : ''}`}
                    onClick={() => handleFormatSelect(format.id)}
                    role="radio"
                    aria-checked={format.id === selectedFormat}
                  >
                    <div className={`format-preview ${format.id}`}></div>
                    <div className="format-details">
                      <div className="format-name">{format.name}</div>
                      <div className="format-dimensions">{format.dimensions}</div>
                      <div className="format-platform">{format.platform}</div>
                    </div>
                    {format.id === selectedFormat && (
                      <div className="format-selected">
                        <FaCheck />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Duration Controls */}
            <div className="tool-section">
              <h4>Duration</h4>
              <div className="duration-control">
                {/* Video Length Slider */}
                <div className="setting-row">
                  <div className="setting-label">Video Length</div>
                  <div className="setting-control with-value">
                    <input
                      type="range"
                      min="5"
                      max="120"
                      value={videoDuration}
                      onChange={handleVideoDurationChange}
                      className="slider"
                      aria-label="Video length in seconds"
                      aria-valuemin="5"
                      aria-valuemax="120"
                      aria-valuenow={videoDuration}
                    />
                    <div className="setting-value">{videoDuration} sec</div>
                  </div>
                </div>

                {/* Scene Duration Slider */}
                <div className="setting-row">
                  <div className="setting-label">Scene Duration</div>
                  <div className="setting-control with-value">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={sceneDuration}
                      onChange={handleSceneDurationChange}
                      className="slider"
                      aria-label="Scene duration in seconds"
                      aria-valuemin="1"
                      aria-valuemax="20"
                      aria-valuenow={sceneDuration}
                    />
                    <div className="setting-value">{sceneDuration} sec</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Branding Tab Content */}
        {activeTab === 'branding' && (
          <div id="branding-tab" role="tabpanel" className="branding-section">
            {/* Brand Colors Section */}
            <div className="tool-section">
              <h4>Brand Colors</h4>
              <div className="color-pickers">
                {/* Primary Color Picker */}
                <div className="color-picker">
                  <div className="color-label">Primary</div>
                  <div className="color-preview" style={{backgroundColor: '#3498db'}}></div>
                  <input
                    type="text"
                    defaultValue="#3498db"
                    className="color-input"
                    aria-label="Primary color hexcode"
                  />
                </div>

                {/* Secondary Color Picker */}
                <div className="color-picker">
                  <div className="color-label">Secondary</div>
                  <div className="color-preview" style={{backgroundColor: '#e74c3c'}}></div>
                  <input
                    type="text"
                    defaultValue="#e74c3c"
                    className="color-input"
                    aria-label="Secondary color hexcode"
                  />
                </div>

                {/* Text Color Picker */}
                <div className="color-picker">
                  <div className="color-label">Text</div>
                  <div className="color-preview" style={{backgroundColor: '#ffffff'}}></div>
                  <input
                    type="text"
                    defaultValue="#ffffff"
                    className="color-input"
                    aria-label="Text color hexcode"
                  />
                </div>
              </div>
            </div>

            {/* Logo Settings Section */}
            <div className="tool-section">
              <h4>Logo</h4>
              <div className="logo-settings">
                {/* Logo Preview */}
                <div className="logo-preview">
                  <div className="logo-placeholder">Your Logo</div>
                </div>

                {/* Logo Controls */}
                <div className="logo-controls">
                  {/* Logo Position Dropdown */}
                  <div className="setting-row">
                    <div className="setting-label">Position</div>
                    <div className="setting-control">
                      <select
                        className="select-input"
                        aria-label="Logo position"
                      >
                        <option>Bottom Right</option>
                        <option>Bottom Left</option>
                        <option>Top Right</option>
                        <option>Top Left</option>
                        <option>Center</option>
                      </select>
                    </div>
                  </div>

                  {/* Logo Size Slider */}
                  <div className="setting-row">
                    <div className="setting-label">Size</div>
                    <div className="setting-control with-value">
                      <input
                        type="range"
                        min="5"
                        max="50"
                        defaultValue="15"
                        className="slider"
                        aria-label="Logo size percentage"
                        aria-valuemin="5"
                        aria-valuemax="50"
                        aria-valuenow="15"
                      />
                      <div className="setting-value">15%</div>
                    </div>
                  </div>

                  {/* Logo Opacity Slider */}
                  <div className="setting-row">
                    <div className="setting-label">Opacity</div>
                    <div className="setting-control with-value">
                      <input
                        type="range"
                        min="10"
                        max="100"
                        defaultValue="100"
                        className="slider"
                        aria-label="Logo opacity percentage"
                        aria-valuemin="10"
                        aria-valuemax="100"
                        aria-valuenow="100"
                      />
                      <div className="setting-value">100%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Export Tab Content */}
        {activeTab === 'export' && (
          <div id="export-tab" role="tabpanel" className="export-section">
            {/* Quality Settings Section */}
            <div className="tool-section">
              <h4>Quality Settings</h4>
              <div className="quality-options" role="radiogroup" aria-label="Video quality">
                {/* Standard Quality Option */}
                <div
                  className="quality-option active"
                  role="radio"
                  aria-checked="true"
                >
                  <div className="quality-name">Standard</div>
                  <div className="quality-info">720p, good for social sharing</div>
                </div>

                {/* High Quality Option */}
                <div
                  className="quality-option"
                  role="radio"
                  aria-checked="false"
                >
                  <div className="quality-name">High</div>
                  <div className="quality-info">1080p, ideal for most uses</div>
                </div>

                {/* Ultra Quality Option */}
                <div
                  className="quality-option"
                  role="radio"
                  aria-checked="false"
                >
                  <div className="quality-name">Ultra</div>
                  <div className="quality-info">4K, for professional distribution</div>
                </div>
              </div>
            </div>

            {/* Output Format Section */}
            <div className="tool-section">
              <h4>Output Format</h4>
              <div className="format-options" role="radiogroup" aria-label="Output format">
                {/* MP4 Format Option */}
                <div
                  className="format-option active"
                  role="radio"
                  aria-checked="true"
                >
                  <div className="format-name">MP4</div>
                  <div className="format-info">Best compatibility</div>
                </div>

                {/* GIF Format Option */}
                <div
                  className="format-option"
                  role="radio"
                  aria-checked="false"
                >
                  <div className="format-name">GIF</div>
                  <div className="format-info">For short, looping clips</div>
                </div>

                {/* WebM Format Option */}
                <div
                  className="format-option"
                  role="radio"
                  aria-checked="false"
                >
                  <div className="format-name">WebM</div>
                  <div className="format-info">For web embedding</div>
                </div>
              </div>
            </div>

            {/* Platforms Section */}
            <div className="tool-section">
              <h4>Platforms</h4>
              <p className="section-description">Generate versions optimized for different platforms</p>

              {/* Platform Checkboxes */}
              <div className="platform-checkboxes">
                <label className="platform-checkbox">
                  <input type="checkbox" defaultChecked aria-label="YouTube platform" />
                  <span className="checkbox-label">YouTube</span>
                </label>

                <label className="platform-checkbox">
                  <input type="checkbox" defaultChecked aria-label="Instagram platform" />
                  <span className="checkbox-label">Instagram</span>
                </label>

                <label className="platform-checkbox">
                  <input type="checkbox" aria-label="TikTok platform" />
                  <span className="checkbox-label">TikTok</span>
                </label>

                <label className="platform-checkbox">
                  <input type="checkbox" aria-label="Facebook platform" />
                  <span className="checkbox-label">Facebook</span>
                </label>

                <label className="platform-checkbox">
                  <input type="checkbox" aria-label="Twitter platform" />
                  <span className="checkbox-label">Twitter</span>
                </label>

                <label className="platform-checkbox">
                  <input type="checkbox" aria-label="LinkedIn platform" />
                  <span className="checkbox-label">LinkedIn</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Panel footer with action buttons */}
      <div className="tool-panel-footer">
        <button className="cancel-button" onClick={onClose}>Cancel</button>
        <button className="apply-button">Apply Settings</button>
      </div>
    </div>
  );
};

export default SettingsPanel;
