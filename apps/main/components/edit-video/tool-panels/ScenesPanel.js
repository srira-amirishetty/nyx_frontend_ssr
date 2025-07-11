import React from 'react';
import { FaArrowLeft, FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaCopy, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './ToolPanels.css';


/**
 * ScenesPanel Component
 *
 * Provides an interface for managing video scenes including:
 * - Reordering, deleting, and duplicating existing scenes
 * - Configuring transitions between scenes
 *
 * @param {Object} props Component props
 * @param {Function} props.onClose Function to close the panel
 * @param {Array} props.scenes List of current video scenes
 * @param {Number} props.activeScene ID of the currently active scene
 */
const ScenesPanel = ({ onClose, scenes, activeScene, videoId, updateVideoDetails }) => {
  // Handlers would be implemented here in a real application
  const handleMoveScene = (direction, sceneId) => {
    // Logic to move scene up or down
    console.log(`Move scene ${sceneId} ${direction}`);
  };

  const handleDuplicateScene = (sceneId) => {
    // Logic to duplicate a scene
    console.log(`Duplicate scene ${sceneId}`);
  };

  const handleDeleteScene = (sceneId) => {
    // Logic to delete a scene
    console.log(`Delete scene ${sceneId}`);
  };

  const handleAddScene = () => {
    // Logic to add a new blank scene
    console.log('Add new scene');
  };

  const [transitionsEnabled, setTransitionsEnabled] = React.useState(true);

  const toggleTransitions = () => {
    setTransitionsEnabled(!transitionsEnabled);
    console.log('Transitions enabled:', !transitionsEnabled);
  };

  return (
    <div className="tool-panel">
      {/* Panel header with back button */}
      <div className="tool-panel-header">
        <button className="back-button" onClick={onClose} aria-label="Go back">
          <FaArrowLeft />
        </button>
        <h3 className='text-base text-[#FFFFFF] font-bold'>Scene Management</h3>
      </div>

      <div className="tool-panel-content">
        {/* Current Scenes Section */}
        <div className="tool-section">
          <h4>Current Scenes</h4>
          <p className="section-description">Rearrange scenes or edit individual scenes</p>

          <div className="current-scenes">
            {/* Map through and render each existing scene */}
            {scenes.map(scene => (
              <div
                key={scene}
                className={`scene-item ${scene === activeScene ? 'active' : ''}`}
                aria-label={`Scene ${scene}`}
              >
                <img src={scene} alt={`Scene ${scene}`} />
                <div className="scene-item-overlay">
                  {/* <span className="scene-number">Scene {scene}</span> */}
                  <div className="scene-actions">
                    <button
                      className="scene-action-btn"
                      onClick={() => handleMoveScene('up', scene)}
                      aria-label="Move scene up"
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      className="scene-action-btn"
                      onClick={() => handleMoveScene('down', scene)}
                      aria-label="Move scene down"
                    >
                      <FaArrowDown />
                    </button>
                    <button
                      className="scene-action-btn"
                      onClick={() => handleDuplicateScene(scene)}
                      aria-label="Duplicate scene"
                    >
                      <FaCopy />
                    </button>
                    <button
                      className="scene-action-btn"
                      onClick={() => handleDeleteScene(scene)}
                      aria-label="Delete scene"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {/* Add new scene button */}
            <div
              className="add-scene"
              onClick={handleAddScene}
              role="button"
              aria-label="Add new scene"
            >
              <FaPlus />
              <span>Add Scene</span>
            </div>
          </div>
        </div>

        {/* Scene Transitions Section - Simplified to toggle */}
        <div className="tool-section">
          <h4>Scene Transitions</h4>
          <p className="section-description">Enable or disable transitions between scenes</p>

          <div className="transition-toggle">
            <button
              className="toggle-button"
              onClick={toggleTransitions}
              aria-pressed={transitionsEnabled}
              aria-label="Toggle scene transitions"
            >
              {transitionsEnabled ? <FaToggleOn size={24} /> : <FaToggleOff size={24} />}
              <span className="toggle-label">
                Transitions {transitionsEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Panel footer with action buttons */}
      <div className="tool-panel-footer">
        <button className="cancel-button" onClick={onClose}>Cancel</button>
        <button className="apply-button">Apply Changes</button>
      </div>
    </div>
  );
};

export default ScenesPanel;
