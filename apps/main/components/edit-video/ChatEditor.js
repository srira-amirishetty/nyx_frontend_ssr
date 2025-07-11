import React, { useState, useRef, useEffect, useId } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../app/apphome/[workspace]/admanager/campulse/components/ui/tabs";
import {
  FaTimes,
  FaPaperPlane,
  FaImage,
  FaVolumeUp,
  FaCog,
  FaArrowLeft,
} from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import "./ChatEditor.css";
import ImageLoader from "./Imageloader";
import AnimateText2 from "./AnimatedText2";
import ScenesPanel from "./tool-panels/ScenesPanel";
import AudioPanel from "./tool-panels/AudioPanel";
import SettingsPanel from "./tool-panels/SettingsPanel";
import ReactPlayer from "react-player";
import EditVideoChangeButtons from "./EditVideoChangeButtons";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

import {
  updateTextToVideoChat,
  generateUpdateStatus,
  generateStatus,
  updateTextToVideoUpdate,
} from "@nyx-frontend/main/services/videoGenerationServices";
import { admanagerSystemUpload } from "@nyx-frontend/main/services/admanagerServices";


const SECOND = 1000;
const MINUTE = SECOND * 60;

const texts = [
  { name: "Generating image based on your script", time: MINUTE * 1 },
  { name: "Creating animations on the image", time: MINUTE * 1.5 },
  { name: "Merging audio and animations in the video", time: MINUTE * 1 },
  { name: "Generating final video", time: Infinity },
];

/**
 * ChatEditor Component
 *
 * AI-powered video editing interface that uses a chat-based approach to modify videos.
 * Allows users to communicate with AI via text and integrates with specialized editing tools
 * for more precise control.
 *
 * @param {Object} props Component props
 * @param {Function} props.onClose Function to close the editor
 */
const ChatEditor = ({ fileId, videoId, videoDetails, onClose }) => {
  const inputId = useId();
  // Chat messages state
  const [messages, setMessages] = useState([
    {
      id: 0,
      type: "ai",
      content: "What would you like to change about your video?",
      timestamp: new Date(),
    },
  ]);

  // console.log("messages", messages);
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [uploaded, setUploaded] = useState(null);
  const [supported, setSupported] = useState(false);
  const [tab, setTab] = useState("chatpane");


  useEffect(() => {
    setTab(show ? "audio" : "chatpane");
  }, [show]);

  useEffect(() => {
    if (videoDetails) {
      setVideo(videoDetails);
    }
  }, [videoDetails]);

  const updateVideoEdit = useMutation({
    mutationKey: ["Update-video-edit"],
    mutationFn: updateTextToVideoChat,
  });

  const updateVideoStatus = useMutation({
    mutationKey: ["Update-video-status"],
    mutationFn: generateUpdateStatus,
  });

  const updateVideo = useMutation({
    mutationKey: ["Update-video"],
    mutationFn: updateTextToVideoUpdate,
  });

  const uploadImage = useMutation({
    mutationKey: ["upload-image"],
    mutationFn: admanagerSystemUpload,
  });

  // User input state for chat
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Currently active scene
  const [activeScene, setActiveScene] = useState(0);

  // Currently active tool panel (null if no panel is open)
  const [activeToolPanel, setActiveToolPanel] = useState(null);

  // Reference to scroll chat to bottom
  const chatEndRef = useRef(null);

  // Mock video scenes data (would come from API in real app)
  const scenes = [
    {
      id: 1,
      thumbnail: "https://via.placeholder.com/120x68/333/fff?text=Scene+1",
      time: "0:00-0:04",
    },
    {
      id: 2,
      thumbnail: "https://via.placeholder.com/120x68/333/fff?text=Scene+2",
      time: "0:05-0:09",
    },
    {
      id: 3,
      thumbnail: "https://via.placeholder.com/120x68/333/fff?text=Scene+3",
      time: "0:10-0:14",
    },
  ];

  /**
   * Automatically scroll chat to bottom when new messages arrive
   */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /**
   * Process and send the user's message, then generate an AI response
   */

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Create and add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);

    setLoading(true);
    const args = {
      user_question: input,
      video_id: videoId,
    };

    setInput("");

    updateVideoEdit.mutate(args, {
      onSuccess: (res) => {
        let response = res?.chat_response?.response;
        let aiResponse = {
          id: messages.length + 2,
          type: "ai",
          content: response?.Assistant,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setLoading(false);
        setInput("");

        if (response?.goal_status == "complete") {
          updateVideoDetails(res);
        }
      },
      onError: (res) => {
        setLoading(false);
        setInput("");
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
  };

  const updateVideoDetails = (body) => {
    setIsLoading(true);
    
    // Check if AI response includes "start" and set start_img if uploaded image exists
    if (body.chat_response.response.Assistant.toLowerCase().includes("start") && uploaded) {
      body.metadata.brand_plate.start_img = uploaded;
    }
    
    // Check if AI response includes "end" and set end_img if uploaded image exists
    if (body.chat_response.response.Assistant.toLowerCase().includes("end") && uploaded) {
      body.metadata.brand_plate.end_img = uploaded;
    }
    
    updateVideo.mutate(body, {
      onSuccess: (res) => {
        checkVideoStatus(res?.task_id);
      },
      onError: (res) => {
        setInput("");
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
  };

  const checkVideoStatus = (taskId) => {
    updateVideoStatus.mutate(taskId, {
      onSuccess: (res) => {
        if (res.status === "in_progress") {
          setTimeout(() => {
            checkVideoStatus(taskId);
          }, 30000);
        } else if (res?.status === "completed") {
          console.log("res ", res);
          setIsLoading(false);
          setVideo(res?.result);
        } else {
          setError(true);
          setIsLoading(false);
        }
      },
      onError: (res) => {
        setIsLoading(false);
        setInput("");
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
  };

  /**
   * Generate an AI response based on user input
   * In a real app, this would call an API
   *
   * @param {string} userInput - The user's message content
   */
  const generateAIResponse = (userInput) => {
    setTimeout(() => {
      let aiResponse;
      const lowerInput = userInput.toLowerCase();

      // Generate response based on keywords in user input
      if (
        lowerInput.includes("replace") ||
        lowerInput.includes("change scene")
      ) {
        aiResponse = {
          id: messages.length + 2,
          type: "ai",
          content:
            "I can help replace that scene. Here are 3 alternatives I've generated based on your video style:",
          options: [
            {
              type: "scene",
              thumbnail:
                "https://via.placeholder.com/160x90/444/fff?text=Option+1",
            },
            {
              type: "scene",
              thumbnail:
                "https://via.placeholder.com/160x90/444/fff?text=Option+2",
            },
            {
              type: "scene",
              thumbnail:
                "https://via.placeholder.com/160x90/444/fff?text=Option+3",
            },
          ],
          timestamp: new Date(),
        };
      } else if (lowerInput.includes("script") || lowerInput.includes("text")) {
        aiResponse = {
          id: messages.length + 2,
          type: "ai",
          content:
            "Here's the current script for this scene. You can edit it directly:",
          script:
            "Our product helps customers achieve their goals faster and with less effort than traditional methods.",
          timestamp: new Date(),
        };
      } else {
        aiResponse = {
          id: messages.length + 2,
          type: "ai",
          content:
            "I can help you with that. Would you like to: 1) Change scenes, 2) Edit script, or 3) Adjust the storyboard?",
          timestamp: new Date(),
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  /**
   * Handle scene selection
   *
   * @param {number} sceneId - ID of the selected scene
   */
  const handleSceneClick = (sceneId) => {
    setActiveScene(sceneId);
  };

  /**
   * Handle Enter key press in chat input
   *
   * @param {Object} e - Keyboard event
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  /**
   * Open a tool panel
   *
   * @param {string} tool - The tool panel to open ('scenes', 'audio', 'settings')
   */
  const handleToolClick = (tool) => {
    setActiveToolPanel(tool);
  };

  /**
   * Close the currently open tool panel
   */
  const handleCloseToolPanel = () => {
    setActiveToolPanel(null);
  };

  /**
   * Get the appropriate tool panel component based on activeToolPanel state
   *
   * @returns {JSX.Element|null} The tool panel component or null
   */
  const getToolPanel = () => {
    switch (activeToolPanel) {
      case "scenes":
        return (
          <ScenesPanel
            onClose={handleCloseToolPanel}
            scenes={video?.image_urls}
            activeScene={activeScene}
            videoId={videoId}
            updateVideoDetails={updateVideoDetails}
          />
        );
      case "audio":
        return (
          <AudioPanel
            onClose={handleCloseToolPanel}
            updateVideoEdit={updateVideoEdit}
            videoId={videoId}
            updateVideoDetails={updateVideoDetails}
          />
        );
      case "settings":
        return <SettingsPanel onClose={handleCloseToolPanel} />;
      default:
        return null;
    }
  };

  /**
   * Handle click on apply button in script editor
   *
   * @param {string} updatedScript - The updated script content
   */
  const handleApplyScript = (updatedScript) => {
    console.log("Applying script:", updatedScript);
    // In a real app, would save the script and update the video
  };

  const handleOnDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items.length > 1) return;
    const item = event.dataTransfer.items[0];
    if (item.kind !== "file") return;
    const fileDropped = item.getAsFile();
    if (!fileDropped) return;
    const allowedExtensions = ["png", "jpg", "jpeg", "svg", "webp"];
    const extension = fileDropped.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(extension)) {
      setSupported(false);
      return;
    }

    const workspaceId = localStorage.getItem("workspace_id");
    if (!workspaceId) {
      console.error("Workspace ID not found.");
      setSupported(false);
      return;
    }

    const formData = new FormData();
    formData.append("type", "admanager");
    formData.append("workspace_id", workspaceId);
    formData.append("file", fileDropped);

    uploadImage.mutate(formData, {
      onSuccess: (response) => {
        if (response?.data?.signed_image_url) {
          setUploaded(response.data.signed_image_url);

          const userMessage = {
            id: messages.length + 1,
            type: "user",
            content: {
              type: "image",
              image_url: response.data.signed_image_url,
            },
            timestamp: new Date(),
          };

          setMessages([...messages, userMessage]);
          
          setSupported(true);
        } else {
          console.error("No image URL in response");
          setSupported(false);
        }
      },
      onError: (error) => {
        console.error("Upload failed:", error);
        setSupported(false);
      }
    });
  };

  const handleOnDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedExtensions = ["png", "jpg", "jpeg", "svg", "webp"];
    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      // Invalid file extension
      setSupported(false);
      return;
    }

    const workspaceId = localStorage.getItem("workspace_id");
    if (!workspaceId) {
      console.error("Workspace ID not found.");
      setSupported(false);
      return;
    }

    const formData = new FormData();
    formData.append("type", "admanager");
    formData.append("workspace_id", workspaceId);
    formData.append("file", file);

    uploadImage.mutate(formData, {
      onSuccess: (response) => {
        console.log("Upload successful:", response);
        if (response?.data?.signed_image_url) {
          setUploaded(response.data.signed_image_url);

          const userMessage = {
            id: messages.length + 1,
            type: "user",
            content: {
              type: "image",
              image_url: response.data.signed_image_url,
            },
            timestamp: new Date(),
          };

          setMessages([...messages, userMessage]);

          setSupported(true);
        } else {
          console.error("No image URL in response");
          setSupported(false);
        }
      },
      onError: (error) => {
        console.error("Upload failed:", error);
        setSupported(false);
      }
    });
  };


  return (
    <div className="chat-editor-overlay">
      <div className="chat-editor-container">
        {/* Editor header with title and close button */}
        <div className="chat-editor-header">
          <h3 className=" text-[#FFFFFF] mx-auto pt-2 pl-4">
            Edit Video with AI
          </h3>
          <button
            className="close-button pr-4"
            onClick={() => onClose(video)}
            aria-label="Close editor"
          >
            <FaTimes />
          </button>
        </div>

        <div className="chat-editor-content">
          {activeToolPanel ? (
            // Render active tool panel when selected
            getToolPanel()
          ) : (
            <>
              {/* Video preview and scene navigation */}
              <div className="video-preview-pane">
                {(isLoading || updateVideoStatus.isPending) && (
                  <>
                    <div className="flex flex-col justify-between">
                      <div>
                        <ImageLoader />
                      </div>
                      <div className="bg-[#130828] p-3 rounded-full mt-4">
                        <div className="flex gap-2 justify-center">
                          <div>
                            <svg
                              width="24"
                              height="25"
                              className="inline  text-gray-200 text-center animate-spin dark:text-transparent fill-white "
                              viewBox="0 0 24 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 22.5C10.6333 22.5 9.34167 22.2375 8.125 21.7125C6.90833 21.1875 5.84583 20.4708 4.9375 19.5625C4.02917 18.6542 3.3125 17.5917 2.7875 16.375C2.2625 15.1583 2 13.8667 2 12.5C2 11.1167 2.2625 9.82083 2.7875 8.6125C3.3125 7.40417 4.02917 6.34583 4.9375 5.4375C5.84583 4.52917 6.90833 3.8125 8.125 3.2875C9.34167 2.7625 10.6333 2.5 12 2.5C12.2833 2.5 12.5208 2.59583 12.7125 2.7875C12.9042 2.97917 13 3.21667 13 3.5C13 3.78333 12.9042 4.02083 12.7125 4.2125C12.5208 4.40417 12.2833 4.5 12 4.5C9.78333 4.5 7.89583 5.27917 6.3375 6.8375C4.77917 8.39583 4 10.2833 4 12.5C4 14.7167 4.77917 16.6042 6.3375 18.1625C7.89583 19.7208 9.78333 20.5 12 20.5C14.2167 20.5 16.1042 19.7208 17.6625 18.1625C19.2208 16.6042 20 14.7167 20 12.5C20 12.2167 20.0958 11.9792 20.2875 11.7875C20.4792 11.5958 20.7167 11.5 21 11.5C21.2833 11.5 21.5208 11.5958 21.7125 11.7875C21.9042 11.9792 22 12.2167 22 12.5C22 13.8667 21.7375 15.1583 21.2125 16.375C20.6875 17.5917 19.9708 18.6542 19.0625 19.5625C18.1542 20.4708 17.0958 21.1875 15.8875 21.7125C14.6792 22.2375 13.3833 22.5 12 22.5Z"
                                fill="white"
                              />
                            </svg>
                          </div>

                          <AnimateText2 list={texts} />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Main video scene preview */}
                {!(
                  isLoading ||
                  updateVideoStatus.isPending ||
                  error ||
                  updateVideoStatus.error
                ) && (
                    <div className="video-scene">
                      <ReactPlayer
                        url={video?.signed_video_url}
                        controls
                        width="100%"
                        height="100%"
                        playing={false}
                        config={{
                          file: {
                            attributes: {
                              crossOrigin: "true",
                            },
                            ...(video?.signed_srt_url && {
                              tracks: [
                                {
                                  kind: "subtitles",
                                  src: video?.signed_srt_url,
                                  srcLang: "en",
                                  default: false,
                                  label: "English",
                                },
                              ],
                            }),
                          },
                        }}
                      />
                      {/* <img
                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                    alt="Video scene preview"
                    className="scene-preview"
                  /> */}
                    </div>
                  )}

                {(error || updateVideoStatus.error) && (
                  <>
                    <div className="h-[400px] w-full flex justify-center items-center	mb-8 flex-col">
                      <div className="h-[200px] w-[320px] bg-violet-900 flex justify-center items-center rounded-md p-2">
                        <div className="">
                          <p className=" text-white mb-4 text-center ">
                            There is some error occured please generate again
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}



                <div className="flex justify-end items-center mb-2">
                  {/* Gear Icon with data-tooltip-id */}
                 {!(isLoading || updateVideoStatus.isPending) &&( <div className="" data-tooltip-id="document-tooltip" onClick={(e) => setShow(!show)}>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.16745 14.6693L5.90078 12.5359C5.75634 12.4804 5.62023 12.4137 5.49245 12.3359C5.36467 12.2582 5.23967 12.1748 5.11745 12.0859L3.13411 12.9193L1.30078 9.7526L3.01745 8.4526C3.00634 8.37483 3.00078 8.29983 3.00078 8.2276V7.7776C3.00078 7.70538 3.00634 7.63038 3.01745 7.5526L1.30078 6.2526L3.13411 3.08594L5.11745 3.91927C5.23967 3.83038 5.36745 3.74705 5.50078 3.66927C5.63411 3.59149 5.76745 3.52483 5.90078 3.46927L6.16745 1.33594H9.83412L10.1008 3.46927C10.2452 3.52483 10.3813 3.59149 10.5091 3.66927C10.6369 3.74705 10.7619 3.83038 10.8841 3.91927L12.8674 3.08594L14.7008 6.2526L12.9841 7.5526C12.9952 7.63038 13.0008 7.70538 13.0008 7.7776V8.2276C13.0008 8.29983 12.9897 8.37483 12.9674 8.4526L14.6841 9.7526L12.8508 12.9193L10.8841 12.0859C10.7619 12.1748 10.6341 12.2582 10.5008 12.3359C10.3674 12.4137 10.2341 12.4804 10.1008 12.5359L9.83412 14.6693H6.16745ZM7.33412 13.3359H8.65078L8.88411 11.5693C9.22856 11.4804 9.548 11.3498 9.84245 11.1776C10.1369 11.0054 10.4063 10.797 10.6508 10.5526L12.3008 11.2359L12.9508 10.1026L11.5174 9.01927C11.573 8.86371 11.6119 8.69983 11.6341 8.5276C11.6563 8.35538 11.6674 8.18038 11.6674 8.0026C11.6674 7.82483 11.6563 7.64983 11.6341 7.4776C11.6119 7.30538 11.573 7.14149 11.5174 6.98594L12.9508 5.9026L12.3008 4.76927L10.6508 5.46927C10.4063 5.21372 10.1369 4.99983 9.84245 4.8276C9.548 4.65538 9.22856 4.52483 8.88411 4.43594L8.66745 2.66927H7.35078L7.11745 4.43594C6.773 4.52483 6.45356 4.65538 6.15911 4.8276C5.86467 4.99983 5.59523 5.20816 5.35078 5.4526L3.70078 4.76927L3.05078 5.9026L4.48411 6.96927C4.42856 7.13594 4.38967 7.3026 4.36745 7.46927C4.34523 7.63594 4.33411 7.81371 4.33411 8.0026C4.33411 8.18038 4.34523 8.3526 4.36745 8.51927C4.38967 8.68594 4.42856 8.8526 4.48411 9.01927L3.05078 10.1026L3.70078 11.2359L5.35078 10.5359C5.59523 10.7915 5.86467 11.0054 6.15911 11.1776C6.45356 11.3498 6.773 11.4804 7.11745 11.5693L7.33412 13.3359ZM8.03411 10.3359C8.67856 10.3359 9.22856 10.1082 9.68412 9.6526C10.1397 9.19705 10.3674 8.64705 10.3674 8.0026C10.3674 7.35816 10.1397 6.80816 9.68412 6.3526C9.22856 5.89705 8.67856 5.66927 8.03411 5.66927C7.37856 5.66927 6.82578 5.89705 6.37578 6.3526C5.92578 6.80816 5.70078 7.35816 5.70078 8.0026C5.70078 8.64705 5.92578 9.19705 6.37578 9.6526C6.82578 10.1082 7.37856 10.3359 8.03411 10.3359Z" fill={show ? '#FFC01D' : '#A2A2A2'} className="hover:fill-white" />
                    </svg>
                  </div>)}

                  {/* Tooltip component */}
                  <Tooltip
                    id="document-tooltip"
                    place="bottom-end"
                    // content="Video Settings"
                    className="!bg-[#130828] !text-white !text-sm !rounded-md !py-2 !px-3"
                    delayShow={100}
                  >
                    <div className="flex items-center gap-2">
                      {/* Video Icon SVG */}
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 15.5438V14.0063C11.625 13.6813 12.5312 13.0563 13.2188 12.1313C13.9063 11.2063 14.25 10.1563 14.25 8.98126C14.25 7.80626 13.9063 6.75626 13.2188 5.83126C12.5312 4.90626 11.625 4.28126 10.5 3.95626V2.41876C12.05 2.76876 13.3125 3.55314 14.2875 4.77189C15.2625 5.99064 15.75 7.39376 15.75 8.98126C15.75 10.5688 15.2625 11.9719 14.2875 13.1906C13.3125 14.4094 12.05 15.1938 10.5 15.5438ZM2.25 11.25V6.75001H5.25L9 3.00001V15L5.25 11.25H2.25ZM10.5 12V5.96251C11.0875 6.23751 11.5469 6.65001 11.8781 7.20001C12.2094 7.75001 12.375 8.35001 12.375 9.00001C12.375 9.63751 12.2094 10.2281 11.8781 10.7719C11.5469 11.3156 11.0875 11.725 10.5 12ZM7.5 6.63751L5.8875 8.25001H3.75V9.75001H5.8875L7.5 11.3625V6.63751Z" fill="white" />
                      </svg>
                      <span>Audio Settings</span>
                    </div>
                  </Tooltip>
                </div>

                {/* Scene thumbnails navigation */}
                {!(
                  isLoading ||
                  updateVideoStatus.isPending ||
                  error ||
                  updateVideoStatus.error
                ) && (
                    <div className="scene-thumbnails bg-[#211649] p-2 rounded-md">
                      {video?.image_urls.map((scene, key) => (
                        <><div
                          key={key}
                          className={`scene-thumbnail ml-2 -mr-[2px] ${activeScene === scene ? "active" : ""
                            }`}
                          onClick={() => handleSceneClick(scene)}
                          role="button"
                          aria-label={`Select scene ${scene}`}
                          aria-pressed={activeScene === scene}
                        >
                          <img src={scene} alt={`Scene ${scene}`} />
                          {/* <div className="scene-time">{video?.duration / video?.image_urls.length}</div> */}
                        </div>
                          <div>

                          </div>
                          {/* <div className="bg-white rounded-full my-auto x-auto p-1 -mx-2 ml-[2px]  z-1"> */}
                          {/* <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
                          {/* <path d="M3.875 5.125H0.125V3.875H3.875V0.125H5.125V3.875H8.875V5.125H5.125V8.875H3.875V5.125Z" fill="black"/> */}
                          {/* </svg> */}
                          {/* </div> */}

                          {/* <div
                          key={scene.id}
                          className={`scene-thumbnail ${activeScene === scene.id ? 'active' : ''}`}
                          onClick={() => handleSceneClick(scene.id)}
                          role="button"
                          aria-label={`Select scene ${scene.id}`}
                          aria-pressed={activeScene === scene.id}
                         >
                          <img src={scene.thumbnail} alt={`Scene ${scene.id}`} />
                           <div className="scene-time">{scene.time}</div>
                         </div> */}
                        </>
                      ))}
                    </div>
                  )}

                {/* Editing tool buttons */}
                {!(
                  isLoading ||
                  updateVideoStatus.isPending ||
                  error ||
                  updateVideoStatus.error
                ) && (
                    <div className="editing-tools">
                      {/* <button
                        className="tool-button"
                        onClick={() => handleToolClick("scenes")}
                        aria-label="Scene management tool"
                      >
                        <FaImage /> Scenes
                      </button> */}
                      {/* <button
                        className="tool-button"
                        onClick={() => handleToolClick("audio")}
                        aria-label="Audio settings tool"
                      >
                        <FaVolumeUp /> Audio
                      </button> */}
                      {/* <button
                    className="tool-button"
                    onClick={() => handleToolClick('settings')}
                    aria-label="Video settings tool"
                  >
                    <FaCog /> Settings
                  </button> */}
                    </div>
                  )}
              </div>


              {/* Chat interaction pane */}
              <div className="chat-pane">
                <Tabs defaultValue="chatpane" value={tab} onValueChange={setTab} className="w-full">
                  <TabsList className="flex w-full justify-center border-[#6D28D9]/20 h-auto p-0 bg-[#130828]">
                    <TabsTrigger
                      value="chatpane"
                      className={`relative ${show ? "w-1/2 data-[state=active]:rounded-tl-lg" : "w-full data-[state=active]:rounded-t-lg"} py-2  text-center text-[14px] font-medium text-purple-300/60 hover:text-purple-300 data-[state=active]:text-purple-300 data-[state=active]:bg-[#5E32FF] data-[state=active]:shadow-none border-0 transition-all duration-200 `}
                    >
                      Chat With AI
                    </TabsTrigger>
                    {show && (<TabsTrigger
                      value="audio"
                      className="relative w-1/2 py-2 data-[state=active]:rounded-tr-lg text-[14px] font-medium text-purple-300/60 hover:text-purple-300 data-[state=active]:text-purple-300 data-[state=active]:bg-[#5E32FF] data-[state=active]:shadow-none border-0 transition-all duration-200 "
                    >
                      <div className=" text-center">
                        Audio Settings
                      </div>
                      <div className="absolute right-4 " onClick={() => setShow(!show)}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="white" />
                        </svg>

                      </div>
                    </TabsTrigger>)}
                  </TabsList>

                  <TabsContent value="chatpane" className=" overflow-y-scroll">
                    <div className="flex flex-col justify-between chat-width"
                      onDrop={handleOnDrop}
                      onDragOver={handleOnDragOver}
                    >
                      {/* Message history area */}
                      <div className="chat-messages" aria-live="polite">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`message ${message.type}`}
                            aria-label={`${message.type === "user" ? "You" : "AI"
                              } said`}
                          >
                            <div className="message-content">
                              {message.content.type === "image" ? <img src={message.content.image_url} alt="Uploaded" className="w-[150px]" /> : message.content }

                              {/* AI-generated scene options */}
                              {message.options && (
                                <div className="option-grid">
                                  {message.options.map((option, index) => (
                                    <div
                                      key={index}
                                      className="option-item"
                                      role="button"
                                      aria-label={`Scene option ${index + 1}`}
                                    >
                                      <img
                                        src={option.thumbnail}
                                        alt={`Option ${index + 1}`}
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Script editor within chat */}
                              {message.script && (
                                <div className="script-editor">
                                  <textarea
                                    defaultValue={message.script}
                                    rows={4}
                                    placeholder="Edit script text here..."
                                    aria-label="Edit script text"
                                  />
                                  <button
                                    className="apply-script"
                                    onClick={() =>
                                      handleApplyScript(
                                        document.querySelector(
                                          ".script-editor textarea"
                                        ).value
                                      )
                                    }
                                  >
                                    Apply Changes
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="message-time">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        ))}
                        <div ref={chatEndRef} />
                      </div>

                      {/* Chat input area */}
                      {!isLoading && (
                        <div className="chat-input-area">
                          <div className=" flex w-full rounded-3xl z-1  items-center justify-center ">
                            <div className="bg-[#CEC0FF] flex justify-between items-center w-full rounded-3xl">
                              <input
                                className="placeholder-black  bg-[#CEC0FF] text-black focus:outline-none focus:ring-0 focus:border-transparent flex items-center h-[48px] w-[92%] pl-5 border-[#CEC0FF] rounded-3xl"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Describe what you want to change..."
                                rows={1}
                                aria-label="Message input"
                              />

                              <label htmlFor={inputId}>
                                <div data-tooltip-id="settings-tooltip">

                                  <input
                                    id={inputId}
                                    type="file"
                                    className="hidden"
                                    accept=".png,.jpg,.jpeg,.svg,.webp"
                                    onChange={handleFileUpload}

                                  />
                                  <svg className="mr-3" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.0763 7.37961C0.850643 8.60526 0.237817 10.0784 0.237817 11.799C0.237818 13.5197 0.850643 14.9928 2.0763 16.2184C3.30195 17.4441 4.77509 18.0569 6.49571 18.0569C8.21634 18.0569 9.68948 17.4441 10.9151 16.2184L17.4559 9.67771C18.3398 8.79382 18.7817 7.73316 18.7817 6.49573C18.7817 5.25829 18.3398 4.19763 17.4559 3.31375C16.572 2.42986 15.5113 1.98792 14.2739 1.98792C13.0365 1.98792 11.9758 2.42986 11.0919 3.31375L4.90472 9.50093C4.36261 10.043 4.09155 10.6912 4.09155 11.4455C4.09155 12.1997 4.36261 12.8479 4.90472 13.39C5.44684 13.9321 6.09502 14.2032 6.84927 14.2032C7.60351 14.2032 8.25169 13.9321 8.79381 13.39L15.3345 6.84928L13.9203 5.43507L7.3796 11.9758C7.22639 12.129 7.04961 12.2056 6.84927 12.2056C6.64892 12.2056 6.47214 12.129 6.31894 11.9758C6.16573 11.8226 6.08913 11.6458 6.08913 11.4455C6.08913 11.2451 6.16573 11.0684 6.31894 10.9151L12.5061 4.72796C13.0129 4.24477 13.6051 4.00023 14.2827 3.99434C14.9604 3.98844 15.5467 4.23299 16.0417 4.72796C16.5366 5.22294 16.7841 5.81219 16.7841 6.49573C16.7841 7.17926 16.5366 7.76852 16.0417 8.26349L9.50092 14.8042C8.67596 15.6528 7.67717 16.0741 6.50455 16.0682C5.33193 16.0623 4.32725 15.641 3.49051 14.8042C2.66555 13.9793 2.25602 12.9864 2.26191 11.8255C2.2678 10.6647 2.67734 9.65414 3.49051 8.79382L10.3848 1.89953L8.97059 0.48532L2.0763 7.37961Z" fill='#A68FFA' className="hover:fill-[#5E32FF]" />
                                  </svg>

                                  <Tooltip
                                    id="settings-tooltip"
                                    place="bottom-end"
                                    // content="Video Settings"
                                    className="!bg-[#130828] !text-white !text-sm !rounded-md !py-2 !px-3"
                                    delayShow={100}
                                  >
                                    <div className="flex items-center gap-2">
                                      {/* Video Icon SVG */}
                                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.0763 7.37961C0.850643 8.60526 0.237817 10.0784 0.237817 11.799C0.237818 13.5197 0.850643 14.9928 2.0763 16.2184C3.30195 17.4441 4.77509 18.0569 6.49571 18.0569C8.21634 18.0569 9.68948 17.4441 10.9151 16.2184L17.4559 9.67771C18.3398 8.79382 18.7817 7.73316 18.7817 6.49573C18.7817 5.25829 18.3398 4.19763 17.4559 3.31375C16.572 2.42986 15.5113 1.98792 14.2739 1.98792C13.0365 1.98792 11.9758 2.42986 11.0919 3.31375L4.90472 9.50093C4.36261 10.043 4.09155 10.6912 4.09155 11.4455C4.09155 12.1997 4.36261 12.8479 4.90472 13.39C5.44684 13.9321 6.09502 14.2032 6.84927 14.2032C7.60351 14.2032 8.25169 13.9321 8.79381 13.39L15.3345 6.84928L13.9203 5.43507L7.3796 11.9758C7.22639 12.129 7.04961 12.2056 6.84927 12.2056C6.64892 12.2056 6.47214 12.129 6.31894 11.9758C6.16573 11.8226 6.08913 11.6458 6.08913 11.4455C6.08913 11.2451 6.16573 11.0684 6.31894 10.9151L12.5061 4.72796C13.0129 4.24477 13.6051 4.00023 14.2827 3.99434C14.9604 3.98844 15.5467 4.23299 16.0417 4.72796C16.5366 5.22294 16.7841 5.81219 16.7841 6.49573C16.7841 7.17926 16.5366 7.76852 16.0417 8.26349L9.50092 14.8042C8.67596 15.6528 7.67717 16.0741 6.50455 16.0682C5.33193 16.0623 4.32725 15.641 3.49051 14.8042C2.66555 13.9793 2.25602 12.9864 2.26191 11.8255C2.2678 10.6647 2.67734 9.65414 3.49051 8.79382L10.3848 1.89953L8.97059 0.48532L2.0763 7.37961Z" fill="#A68FFA" />
                                      </svg>
                                      <span>Upload Media</span>
                                    </div>
                                  </Tooltip>
                                </div>
                              </label>

                            </div>
                            <button
                              className="send-button my-auto ml-1"
                              onClick={handleSendMessage}
                              disabled={input.trim() === ""}
                              aria-label="Send message"
                            >
                              {loading ? <FiLoader /> :
                                <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <ellipse cx="20.3132" cy="20" rx="20.3132" ry="20" fill="#5E32FF" />
                                  <path d="M11.1724 28V12L30.4699 20L11.1724 28ZM13.2037 25L25.2393 20L13.2037 15V18.5L19.2976 20L13.2037 21.5V25Z" fill="#CEC0FF" />
                                </svg>
                              }
                            </button>
                          </div>
                        </div>
                      )}
                      <div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="audio" className="chat-width overflow-y-scroll">
                    <AudioPanel
                      onClose={handleCloseToolPanel}
                      updateVideoEdit={updateVideoEdit}
                      videoId={videoId}
                      updateVideoDetails={updateVideoDetails}
                    />
                  </TabsContent>
                </Tabs>

              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatEditor;
