import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import './ConfigPanel.css';

const ConfigPanel = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const sections = [
    { id: 'brand', title: 'Brand Details - (Start New)' },
    { id: 'campaign', title: 'Campaign Overview' },
    { id: 'script', title: 'Script' },
    { id: 'content', title: 'Video Content' },
    { id: 'settings', title: 'Video Settings' },
    { id: 'slate', title: 'Add Startslate/Endslate' }
  ];

  return (
    <div className="config-panel">
      {sections.map(section => (
        <div key={section.id} className="config-section">
          <div 
            className="section-header" 
            onClick={() => toggleSection(section.id)}
          >
            <h3>{section.title}</h3>
            <FaChevronDown className={`chevron ${expandedSection === section.id ? 'rotate' : ''}`} />
          </div>
          {expandedSection === section.id && (
            <div className="section-content">
              <p>Configuration options for {section.title}</p>
            </div>
          )}
        </div>
      ))}
      <button className="generate-btn">Generate</button>
    </div>
  );
};

export default ConfigPanel; 