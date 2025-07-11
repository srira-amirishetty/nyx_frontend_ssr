import React, { useState } from 'react';
import { FaArrowLeft, FaPlay, FaPause, FaMusic, FaMicrophone, FaPlus } from 'react-icons/fa';
import { IMAGE_URL } from "@nyx-frontend/main/components/constants";
import WaveCustom from "./WaveCustom";
import './ToolPanels.css';

/**
 * AudioPanel Component
 *
 * Provides an interface for managing all audio aspects of the video:
 * - Voice over recording and text-to-speech generation
 * - Background music selection and customization
 *
 * @param {Object} props Component props
 * @param {Function} props.onClose Function to close the panel
 */
const AudioPanel = ({ onClose, updateVideoEdit, videoId, updateVideoDetails }) => {
  // Active tab state for the audio panel sections
  const [activeTab, setActiveTab] = useState('voice');
  // Playing state to track currently playing audio preview
  const [playing, setPlaying] = useState(null);
  // Voice script state for text-to-speech
  const [script, setScript] = useState(
    "Our product helps customers achieve their goals faster and with less effort than traditional methods."
  );

  // Sample voice synthesis options
  const voiceOptions = [
    { id: 'v1', name: 'Professional Male', sample: 'sample1.mp3' },
    { id: 'v2', name: 'Professional Female', sample: 'sample2.mp3' },
    { id: 'v3', name: 'Casual Male', sample: 'sample3.mp3' },
    { id: 'v4', name: 'Casual Female', sample: 'sample4.mp3' },
    { id: 'v5', name: 'Energetic', sample: 'sample5.mp3' },
    { id: 'v6', name: 'Soft Spoken', sample: 'sample6.mp3' },
  ];

  // Sample music tracks
  const musicTracks = [
    { id: 'm1', name: 'Inspiring Corporate', duration: '2:30', category: 'Corporate' },
    { id: 'm2', name: 'Upbeat Pop', duration: '3:15', category: 'Energetic' },
    { id: 'm3', name: 'Emotional Piano', duration: '2:45', category: 'Emotional' },
    { id: 'm4', name: 'Tech Innovation', duration: '3:05', category: 'Technology' },
    { id: 'm5', name: 'Ambient Chill', duration: '4:20', category: 'Relaxed' },
  ];

  const applyAudioChanges = () => {
    if (playing) {

      const args = {
        "user_question": `update audio to ${playing}, nothing lese, done`,
        "video_id": videoId
      };

      updateVideoEdit.mutate(args, {
        onSuccess: (res) => {
          let response = res?.chat_response?.response
          console.log(response)
          if (response?.goal_status == "complete") {
            updateVideoDetails(res)
            onClose()
          }
        },
        onError: (res) => {
          setLoading(false);
          setInput('');
          toast.error(
            <>
              <span className="text-white text-[20px]">Bad Request</span>
              <br />
              <span className="text-white text-[16px]">
                {res?.response?.data?.message}
              </span>
              <br />
            </>,
            { autoClose: 5000 }
          );
        },
      });
    }

  }

  const musicUrls = {
    music1: {
      id: "mCQMfsqGDT6IDkEKR20a",
      name: "Voice 1",
      url: IMAGE_URL + "/voiceover/voice1.mp3",
    },
    music2: {
      id: "VZyYADHcMi33m0wO9zD1",
      name: "Voice 2",
      url: IMAGE_URL + "/voiceover/voice2.mp3",
    },
    music3: {
      id: "bUTE2M5LdnqaUCd5tJB3",
      name: "Voice 3",
      url: IMAGE_URL + "/voiceover/voice3.mp3",
    },
    music4: {
      id: "zs7UfyHqCCmny7uTxCYi",
      name: "Voice 4",
      url: IMAGE_URL + "/voiceover/voice4.mp3",
    },
    music5: {
      id: "tTZ0TVc9Q1bbWngiduLK",
      name: "Voice 5",
      url: IMAGE_URL + "/voiceover/voice5.mp3",
    },
    music6: {
      id: "P7vsEyTOpZ6YUTulin8m",
      name: "Voice 6",
      url: IMAGE_URL + "/voiceover/voice6.mp3",
    },
    music7: {
      id: "jNoQBSsAUV0DpAYKDl4u",
      name: "Voice 7",
      url: IMAGE_URL + "/voiceover/voice7.mp3",
    },
    music8: {
      id: "LHJy3mhZWsvhUjy0zUM1",
      name: "Voice 8",
      url: IMAGE_URL + "/voiceover/voice8.mp3",
    },
    music9: {
      id: "ftDdhfYtmfGP0tFlBYA1",
      name: "Voice 9",
      url: IMAGE_URL + "/voiceover/voice9.mp3",
    },
    music10: {
      id: "vghiSqG5ezdhd8F3tKAD",
      name: "Voice 10",
      url: IMAGE_URL + "/voiceover/voice10.mp3",
    },
    music11: {
      id: "HBwtuRG9VQfaoE2YVMYf",
      name: "Voice 11",
      url: IMAGE_URL + "/voiceover/voice11.mp3",
    },
    music12: {
      id: "ynkbQM1aYB3vamJqvwzD",
      name: "Voice 12",
      url: IMAGE_URL + "/voiceover/voice12.mp3",
    },
  };

  // Audio playback handlers
  const handlePlayVoice = (voiceId) => {
    if (playing === voiceId) {
      setPlaying(null);
    } else {
      setPlaying(voiceId);
      // In a real app, would play the actual voice sample
      console.log(`Playing voice sample ${voiceId}`);

      // Auto-stop after 3 seconds (simulating short sample)
      setTimeout(() => {
        // setPlaying(null);
      }, 3000);
    }
  };

  const handlePlayMusic = (trackId) => {
    if (playing === trackId) {
      setPlaying(null);
    } else {
      setPlaying(trackId);
      // In a real app, would play the actual music sample
      console.log(`Playing music track ${trackId}`);
    }
  };

  // Handler for script changes
  const handleScriptChange = (e) => {
    setScript(e.target.value);
  };

  // Handler for uploading custom music
  const handleMusicUpload = (files) => {
    // Logic to handle music file upload
    console.log('Music files uploaded', files);
  };

  return (
    <div className="tool-panel">
      {/* Panel header with back button */}
      <div className="tool-panel-header">
        <button className="back-button" onClick={onClose} aria-label="Go back">
          <FaArrowLeft />
        </button>
        <h3 className='text-base text-[#FFFFFF] font-bold'>Audio Settings</h3>
      </div>

      {/* Tab navigation for audio panel sections */}
      <div className="audio-tabs" role="tablist">
        <button
          className={`audio-tab ${activeTab === 'voice' ? 'active' : ''}`}
          onClick={() => setActiveTab('voice')}
          role="tab"
          aria-selected={activeTab === 'voice'}
          aria-controls="voice-tab"
        >
          <FaMicrophone /> Voice Over
        </button>
        {/* <button
          className={`audio-tab ${activeTab === 'music' ? 'active' : ''}`}
          onClick={() => setActiveTab('music')}
          role="tab"
          aria-selected={activeTab === 'music'}
          aria-controls="music-tab"
        >
          <FaMusic /> Background Music
        </button> */}
      </div>

      <div className="tool-panel-content">
        {/* Voice Over Tab Content */}
        {activeTab === 'voice' && (
          <div id="voice-tab" role="tabpanel" className="voice-section">
            {/* Script Editor Section */}
            <div className="tool-section">
              <h4>Script</h4>
              <textarea
                className="script-textarea"
                placeholder="Enter or edit your voiceover script here..."
                value={script}
                onChange={handleScriptChange}
                rows={6}
                aria-label="Voice over script"
              />
            </div>

            {/* Voice Selection Section */}
            <div className="tool-section">
              <h4>Standard Voices</h4>
              {/* <p className="section-description">Choose a voice style for your video</p> */}

              <div className="voice-options ">
                {Object.keys(musicUrls).map((key, index) => (
                  <div
                    key={musicUrls[key].id}
                    className={`voice-option ${musicUrls[key].id === playing ? 'active' : ''}`}
                    role="radio"
                    aria-checked={musicUrls[key].id === playing}
                  >
                    <div className="voice-info ">
                      <button
                        className="voice-play-bt h-[25px] flex justify-center items-center gap-3 "
                        onClick={() => handlePlayVoice(musicUrls[key].id)}

                      >
                        {/* {playing === voice.id ? <FaPause /> : <FaPlay />} */}
                        <WaveCustom
                          url={musicUrls[key].url}
                          id={key + 1}
                          title={"text"}
                        />
                        <span className='flex ml-1 items-center'>{musicUrls[key].name}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Settings Section */}
            {/* <div className="tool-section">
              <h4>Voice Settings</h4>


              <div className="settings-row">
                <div className="setting-label">Speed</div>
                <div className="setting-control">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="slider"
                    aria-label="Voice speed"
                  />
                </div>
              </div>


              <div className="settings-row">
                <div className="setting-label">Pitch</div>
                <div className="setting-control">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="slider"
                    aria-label="Voice pitch"
                  />
                </div>
              </div>


              <div className="settings-row">
                <div className="setting-label">Emphasis</div>
                <div className="setting-control">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="slider"
                    aria-label="Voice emphasis"
                  />
                </div>
              </div>
            </div> */}
          </div>
        )}

        {/* Background Music Tab Content */}
        {activeTab === 'music' && (
          <div id="music-tab" role="tabpanel" className="music-section">
            {/* Music Search and Filters */}
            <div className="music-search">
              <input
                type="text"
                placeholder="Search music tracks..."
                className="search-input"
                aria-label="Search music tracks"
              />
              <div className="music-filters" role="radiogroup" aria-label="Music category filter">
                <button className="music-filter active" role="radio" aria-checked="true">All</button>
                <button className="music-filter" role="radio" aria-checked="false">Corporate</button>
                <button className="music-filter" role="radio" aria-checked="false">Energetic</button>
                <button className="music-filter" role="radio" aria-checked="false">Emotional</button>
              </div>
            </div>

            {/* Music Tracks List */}
            <div className="music-tracks">
              {musicTracks.map(track => (
                <div
                  key={track.id}
                  className={`music-track ${track.id === 'm1' ? 'active' : ''}`}
                  role="radio"
                  aria-checked={track.id === 'm1'}
                >
                  <div className="track-info">
                    <div>
                      <div className="track-name">{track.name}</div>
                      <div className="track-category">{track.category}</div>
                    </div>
                    <div className="track-duration">{track.duration}</div>
                  </div>
                  <div className="track-controls">
                    <button
                      className="track-play-btn"
                      onClick={() => handlePlayMusic(track.id)}
                      aria-label={`Play ${track.name}`}
                    >
                      {playing === track.id ? <FaPause /> : <FaPlay />}
                    </button>
                    <button
                      className="track-add-btn"
                      aria-label={`Add ${track.name} to video`}
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Music Upload */}
            <div className="tool-section">
              <h4>Custom Music</h4>
              <div
                className="upload-area small"
                onClick={() => document.getElementById('music-upload').click()}
              >
                <input
                  type="file"
                  id="music-upload"
                  accept="audio/*"
                  style={{ display: 'none' }}
                  onChange={(e) => handleMusicUpload(e.target.files)}
                />
                <div className="upload-box">
                  <FaMusic className="upload-icon" />
                  <div>Upload your own music track</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Panel footer with action buttons */}
      <div className="tool-panel-footer">
        <button className="px-7 py-2 border bottom-2 border-[#FFC01D] rounded-3xl font-semibold hover:bg-white/10 text-[#FFC01D]" onClick={onClose}>Cancel</button>
        <button className="rounded-3xl px-7 py-2 bg-[#FFC01D] text-black font-semibold transition duration-200 hover:brightness-110" onClick={applyAudioChanges}>Apply</button>
      </div>
    </div>
  );
};

export default AudioPanel;
