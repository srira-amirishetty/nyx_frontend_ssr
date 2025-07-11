import React from 'react';
import { FaHome, FaPaintBrush, FaImages, FaPlug, FaImage, FaVideo, FaBullhorn, FaQuestionCircle } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavItem icon={<FaHome />} label="Home" />
      <NavItem icon={<FaPaintBrush />} label="My Brand" />
      <NavItem icon={<FaImages />} label="Assets" />
      <NavItem icon={<FaPlug />} label="Integrations" />
      <NavItem icon={<FaImage />} label="ImageCraft AI" />
      <NavItem icon={<FaVideo />} label="VideoVista AI" active />
      <NavItem icon={<FaBullhorn />} label="Campulse AI" />
      <div className="sidebar-spacer"></div>
      <NavItem icon={<FaQuestionCircle />} label="Help" />
    </div>
  );
};

const NavItem = ({ icon, label, active }) => {
  return (
    <div className={`nav-item ${active ? 'active' : ''}`}>
      <div className="nav-icon">{icon}</div>
      <div className="nav-label">{label}</div>
    </div>
  );
};

export default Sidebar; 