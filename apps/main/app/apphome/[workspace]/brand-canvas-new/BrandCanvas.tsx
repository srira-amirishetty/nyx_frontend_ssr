"use client";
import React, { useRef, useState, useEffect } from "react";
import { fabric } from "fabric";
import {
  Upload,
  Image,
  Video,
  Undo,
  Redo,
  Save,
  Download,
  Plus,
  Search,
  Layout,
  Type,
  Shapes,
  ImageIcon,
  VideoIcon,
  Music,
  Grid,
  ZoomIn,
  ZoomOut,
  Move,
  ChevronLeft,
  ChevronRight,
  Settings,
  Share,
  MoreVertical,
  Clock,
  Folder,
  Star,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronDown,
  Menu,
  MousePointerClick,
  Square,
  Minus,
  DownloadCloud,
  Maximize2,
  Group,
  Ungroup,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { cn } from "./lib/utils";
import TextEditor from "./canvas/TextEditor";
import ShapeEditor from "./canvas/ShapeEditor";
import ShapePopover from "./canvas/ShapePopover";
import ImagePopover from "./canvas/ImagePopover";
import MediaPopover from "./canvas/MediaPopover";
import MediaEditor from "./canvas/MediaEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { LayerMenu } from "./canvas/LayerMenu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import CanvasTimeline from "./canvas/CanvasTimeline";
import { toast } from "./ui/use-toast";
import BrandCanvasAssetsUpload from "@nyx-frontend/main/components/BrandCanvasAssetsUpload";
import { useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverAnchor } from "@radix-ui/react-popover";

const BrandCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(
    null
  );
  const [canvasSize, setCanvasSize] = useState({ width: 1080, height: 1080 });
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedShape, setSelectedShape] = useState("rect");
  const [selectedTool, setSelectedTool] = useState("select");
  const [isDragging, setIsDragging] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const isUndoRedoOperation = useRef(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);
  const [selectedMediaType, setSelectedMediaType] = useState<
    "image" | "video" | "audio" | null
  >(null);

  const [duration, setDuration] = useState(0);

  // Predefined canvas sizes
  const canvasSizePresets = {
    "Instagram Post": { width: 1080, height: 1080 },
    "Instagram Story": { width: 1080, height: 1920 },
    "Facebook Post": { width: 1200, height: 630 },
    "Twitter Post": { width: 1200, height: 675 },
    "LinkedIn Post": { width: 1200, height: 627 },
    "YouTube Thumbnail": { width: 1280, height: 720 },
    A4: { width: 2480, height: 3508 },
  };

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const container = canvasRef.current.parentElement;
      if (!container) return;

      // Get container dimensions
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Calculate canvas size based on container while maintaining aspect ratio
      const aspectRatio = canvasSize.width / canvasSize.height;
      let newWidth = containerWidth;
      let newHeight = containerWidth / aspectRatio;

      if (newHeight > containerHeight) {
        newHeight = containerHeight;
        newWidth = containerHeight * aspectRatio;
      }

      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        width: newWidth,
        height: newHeight,
        backgroundColor: "#ffffff",
        preserveObjectStacking: true,
        stopContextMenu: true,
      });

      const canvas = fabricCanvasRef.current;

      // Event listeners - only save history when not in the middle of undo/redo
      const handleModified = () => {
        if (!isUndoRedoOperation.current) {
          saveToHistory();
        }
        canvas.requestRenderAll();
      };

      const handleAdded = () => {
        if (!isUndoRedoOperation.current) {
          saveToHistory();
        }
        canvas.requestRenderAll();
      };

      const handleRemoved = () => {
        if (!isUndoRedoOperation.current) {
          saveToHistory();
        }
        canvas.requestRenderAll();
      };

      canvas.on("object:modified", handleModified);
      canvas.on("object:added", handleAdded);
      canvas.on("object:removed", handleRemoved);

      // Selection events
      canvas.on("selection:created", (e: fabric.IEvent) => {
        if (!e.selected) return;
        const selectedObj = e.selected[0];
        setSelectedObject(selectedObj);

        // Determine the media type
        if (selectedObj.data?.type === "video") {
          setSelectedMediaType("video");
        } else if (selectedObj.data?.type === "audio") {
          setSelectedMediaType("audio");
        } else if (selectedObj.type === "image") {
          setSelectedMediaType("image");
        } else {
          setSelectedMediaType(null);
        }

        setIsRightSidebarOpen(true);
      });

      canvas.on("selection:updated", (e: fabric.IEvent) => {
        if (!e.selected) return;
        const selectedObj = e.selected[0];
        setSelectedObject(selectedObj);

        // Determine the media type
        if (selectedObj.data?.type === "video") {
          setSelectedMediaType("video");
        } else if (selectedObj.data?.type === "audio") {
          setSelectedMediaType("audio");
        } else if (selectedObj.type === "image") {
          setSelectedMediaType("image");
        } else {
          setSelectedMediaType(null);
        }

        setIsRightSidebarOpen(true);
      });

      canvas.on("selection:cleared", () => {
        setSelectedObject(null);
        setSelectedMediaType(null);
      });

      // Initialize with blank canvas state
      const initialJson = JSON.stringify(canvas.toJSON());
      setUndoStack([initialJson]);
      setRedoStack([]);

      // Cleanup media elements when objects are removed
      canvas.on("object:removed", (e: fabric.IEvent) => {
        const removedObject = e.target;
        if (!removedObject) return;

        // Check if it's a media object
        if (
          removedObject.data?.type === "video" ||
          removedObject.data?.type === "audio"
        ) {
          // Get the media element
          const mediaElement = (removedObject as any).mediaElement as
            | HTMLVideoElement
            | HTMLAudioElement;

          if (mediaElement) {
            // Pause playback
            mediaElement.pause();

            // Reset src to release resources
            mediaElement.src = "";

            // Remove any event listeners
            mediaElement.onloadedmetadata = null;
            mediaElement.onerror = null;

            // Release object URL if it was created
            if ((removedObject as any).file) {
              const objectURL = mediaElement.src;
              if (objectURL.startsWith("blob:")) {
                URL.revokeObjectURL(objectURL);
              }
            }
          }
        }
      });

      // Cleanup
      return () => {
        if (canvas) {
          canvas.off("object:modified", handleModified);
          canvas.off("object:added", handleAdded);
          canvas.off("object:removed", handleRemoved);
          canvas.off("selection:created", handleSelection);
          canvas.off("selection:cleared", handleDeselection);
          // canvas.dispose();
          // fabricCanvasRef.current = null;
        }
      };
    }
  }, [canvasSize]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsLeftSidebarOpen(false);
        setIsRightSidebarOpen(false);
      }
      updateCanvasScale();
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSelection = (e: fabric.IEvent) => {
    const selected = fabricCanvasRef.current?.getActiveObject();
    setSelectedObject(selected || null);
  };

  const handleDeselection = () => {
    setSelectedObject(null);
  };

  // Improved saveToHistory function
  const saveToHistory = () => {
    if (fabricCanvasRef.current) {
      const json = JSON.stringify(fabricCanvasRef.current.toJSON());

      // If the current state is the same as the last state, don't save it
      if (undoStack.length > 0 && json === undoStack[undoStack.length - 1]) {
        return;
      }

      // Add current state to undo stack
      setUndoStack((prev) => {
        const newStack = [...prev, json];
        // Limit stack size to prevent memory issues
        if (newStack.length > 50) {
          return newStack.slice(newStack.length - 50);
        }
        return newStack;
      });

      // Clear redo stack when a new action is performed
      if (redoStack.length > 0) {
        setRedoStack([]);
      }
    }
  };

  // Improved handleUndo function
  const handleUndo = () => {
    if (!fabricCanvasRef.current || undoStack.length < 2) return;

    // Set flag to prevent event handlers from saving history
    isUndoRedoOperation.current = true;

    try {
      // Get the current state before undoing
      const currentState = undoStack[undoStack.length - 1];

      // Get the previous state to restore
      const previousState = undoStack[undoStack.length - 2];

      // Update stacks
      setUndoStack((prev) => prev.slice(0, -1));
      setRedoStack((prev) => [...prev, currentState]);

      // Restore canvas to previous state
      fabricCanvasRef.current.loadFromJSON(previousState, () => {
        fabricCanvasRef.current?.renderAll();
        // Reset flag after rendering is complete
        isUndoRedoOperation.current = false;
      });
    } catch (error) {
      console.error("Error in handleUndo:", error);
      isUndoRedoOperation.current = false;
    }
  };

  // Improved handleRedo function
  const handleRedo = () => {
    if (!fabricCanvasRef.current || redoStack.length === 0) return;

    // Set flag to prevent event handlers from saving history
    isUndoRedoOperation.current = true;

    try {
      // Get the next state to restore
      const nextState = redoStack[redoStack.length - 1];

      // Update stacks
      setRedoStack((prev) => prev.slice(0, -1));
      setUndoStack((prev) => [...prev, nextState]);

      // Restore canvas to next state
      fabricCanvasRef.current.loadFromJSON(nextState, () => {
        fabricCanvasRef.current?.renderAll();
        // Reset flag after rendering is complete
        isUndoRedoOperation.current = false;
      });
    } catch (error) {
      console.error("Error in handleRedo:", error);
      isUndoRedoOperation.current = false;
    }
  };

  // Add keyboard shortcuts in a separate useEffect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't process if an input element is focused
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Check for Ctrl/Cmd + Z (Undo)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Check for Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y (Redo)
      if ((e.ctrlKey || e.metaKey) && ((e.key.toLowerCase() === 'y') || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUndo, handleRedo]); // Add dependencies to ensure the latest functions are used

  // Update canvas scale
  const updateCanvasScale = () => {
    if (canvasContainerRef.current && fabricCanvasRef.current) {
      const container = canvasContainerRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const scaleX = (containerWidth - 40) / canvasSize.width;
      const scaleY = (containerHeight - 40) / canvasSize.height;
      const scale = Math.min(scaleX, scaleY);

      setZoomLevel(Math.round(scale * 100));

      // Update viewport transform to maintain center position
      const vpt = fabricCanvasRef.current.viewportTransform;
      if (vpt) {
        const currentCenterX = -vpt[4] / vpt[0] + containerWidth / (2 * vpt[0]);
        const currentCenterY =
          -vpt[5] / vpt[0] + containerHeight / (2 * vpt[0]);

        fabricCanvasRef.current.setZoom(scale);

        const newVpt = fabricCanvasRef.current.viewportTransform;
        if (newVpt) {
          newVpt[4] = -currentCenterX * scale + containerWidth / 2;
          newVpt[5] = -currentCenterY * scale + containerHeight / 2;
          fabricCanvasRef.current.setViewportTransform(newVpt);
        }
      }

      fabricCanvasRef.current.renderAll();
    }
  };

  // Handle zoom
  const handleZoom = (newZoom: number) => {
    const zoom = Math.min(Math.max(newZoom, 10), 400);
    setZoomLevel(zoom);

    if (fabricCanvasRef.current) {
      const center = fabricCanvasRef.current.getCenter();
      fabricCanvasRef.current.zoomToPoint(
        new fabric.Point(center.left, center.top),
        zoom / 100
      );
      fabricCanvasRef.current.requestRenderAll();
    }
  };

  // Handle adding new text
  const handleAddText = () => {
    if (fabricCanvasRef.current) {
      const text = new fabric.IText("Double click to edit", {
        // // left: canvasSize.width / 2,
        // // top: canvasSize.height / 2,
        // fontSize: 40,
        fill: "#000000",
        fontFamily: "Arial",
        originX: "center",
        originY: "center",
      });

      fabricCanvasRef.current.add(text);
      text.initDimensions();
      text.set({
        left: canvasSize.width / 2,
        top: canvasSize.height / 2,
      });
      fabricCanvasRef.current.setActiveObject(text);
      fabricCanvasRef.current.centerObject(text);
      text.enterEditing();

      fabricCanvasRef.current.renderAll();
      setSelectedObject(text);
      setIsRightSidebarOpen(true);
      saveToHistory(); // Save state after adding text
    }
  };

  // Handle shape selection and addition
  const handleShapeSelect = (shape: string) => {
    setSelectedShape(shape);
    handleAddShape(shape); // Pass the shape directly to handleAddShape
  };

  // Add shape to canvas
  const handleAddShape = (shape: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const center = canvas.getCenter();
    let fabricObject;

    const commonProps = {
      left: center.left,
      top: center.top,
      fill: "#7C3AED", // Purple-600
      stroke: "#6D28D9", // Purple-700
      strokeWidth: 1,
      originX: "center",
      originY: "center",
    };

    switch (shape) {
      case "rect":
        fabricObject = new fabric.Rect({
          ...commonProps,
          width: 100,
          height: 100,
        });
        break;
      case "circle":
        fabricObject = new fabric.Circle({
          ...commonProps,
          radius: 50,
        });
        break;
      case "triangle":
        fabricObject = new fabric.Triangle({
          ...commonProps,
          width: 100,
          height: 100,
        });
        break;
      case "line":
        fabricObject = new fabric.Line([0, 0, 100, 0], {
          ...commonProps,
          stroke: "#7C3AED",
          strokeWidth: 2,
        });
        break;
      case "pentagon":
        fabricObject = new fabric.Polygon(
          [
            { x: 50, y: 0 },
            { x: 100, y: 40 },
            { x: 80, y: 100 },
            { x: 20, y: 100 },
            { x: 0, y: 40 },
          ],
          {
            ...commonProps,
            width: 100,
            height: 100,
          }
        );
        break;
      case "hexagon":
        fabricObject = new fabric.Polygon(
          [
            { x: 50, y: 0 },
            { x: 100, y: 25 },
            { x: 100, y: 75 },
            { x: 50, y: 100 },
            { x: 0, y: 75 },
            { x: 0, y: 25 },
          ],
          {
            ...commonProps,
            width: 100,
            height: 100,
          }
        );
        break;
      case "star":
        const points = 5;
        const outerRadius = 50;
        const innerRadius = 25;
        const starPoints: any[] = [];
        for (let i = 0; i < points * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / points;
          starPoints.push({
            x: radius * Math.sin(angle) + 50,
            y: radius * Math.cos(angle) + 50,
          });
        }
        fabricObject = new fabric.Polygon(starPoints, {
          ...commonProps,
          width: 100,
          height: 100,
        });
        break;
      case "diamond":
        fabricObject = new fabric.Polygon(
          [
            { x: 50, y: 0 },
            { x: 100, y: 50 },
            { x: 50, y: 100 },
            { x: 0, y: 50 },
          ],
          {
            ...commonProps,
            width: 100,
            height: 100,
          }
        );
        break;
      default:
        return;
    }

    if (fabricObject) {
      canvas.add(fabricObject);
      canvas.setActiveObject(fabricObject);
      canvas.requestRenderAll();
      setSelectedObject(fabricObject);
      setIsRightSidebarOpen(true);
      saveToHistory(); // Save state after adding shape
    }
  };

  // Handle image upload
  const handleImageUpload = (file: File | any) => {
    if (!fabricCanvasRef.current) return;

    // Check if the file is not a File object and instead has a signed_image_url
    if (!(file instanceof File)) {
      const signedImageUrl = file.signed_image_url;

      if (!signedImageUrl) {
        console.error("No signed_image_url provided");
        return;
      }

      // Use fetch to get the image and load it into fabric
      fetch(signedImageUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch image");
          }
          return response.blob(); // Convert to a Blob
        })
        .then((blob) => {
          // Create a local URL for the Blob
          const imageUrl = URL.createObjectURL(blob);

          // Load the image into fabric.js
          fabric.Image.fromURL(imageUrl, (img) => {
            if (!fabricCanvasRef.current) return;

            const canvas = fabricCanvasRef.current;

            // Store file information
            (img as any).file = file;
            img.data = { name: file.name || signedImageUrl };

            // Scale image to reasonable size if needed
            const maxSize = 500;
            if (img.width && img.height) {
              if (img.width > maxSize || img.height > maxSize) {
                const scale = maxSize / Math.max(img.width, img.height);
                img.scale(scale);
              }
            }

            // Add image to canvas
            canvas.add(img);
            canvas.setActiveObject(img);
            canvas.centerObject(img);

            // Request a render to update canvas
            canvas.requestRenderAll();

            // Set selected object and media type
            setSelectedObject(img);
            setSelectedMediaType("image");
            setIsRightSidebarOpen(true);

            // Save the state to history
            saveToHistory();
          });
        })
        .catch((error) => {
          console.error("Error loading image:", error);
        });

      return;
    }

    // Handle the case when the file is a File (FileReader)
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      console.log("Image URL:", imageUrl); // Debugging line to check if the URL is correct

      fabric.Image.fromURL(imageUrl, (img) => {
        if (!fabricCanvasRef.current) return;

        const canvas = fabricCanvasRef.current;

        // Store file information
        (img as any).file = file;
        img.data = { name: file.name };

        // Scale image to reasonable size if needed
        const maxSize = 500;
        if (img.width && img.height) {
          if (img.width > maxSize || img.height > maxSize) {
            const scale = maxSize / Math.max(img.width, img.height);
            img.scale(scale);
          }
        }

        // Add image to canvas
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.centerObject(img);

        // Request a render to update canvas
        canvas.requestRenderAll();

        // Set selected object and media type
        setSelectedObject(img);
        setSelectedMediaType("image");
        setIsRightSidebarOpen(true);

        // Save the state to history
        saveToHistory();
      });
    };
    reader.readAsDataURL(file);
  };

  // Handle video upload
  const handleVideoUpload = (file: File | any) => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    setIsLoading(true);

    // Handle case when 'file' is an object with a video_url (non-File)
    if (!(file instanceof File)) {
      const videoUrl = file.signed_video_url;
      if (!videoUrl) {
        console.error("No signed_video_url provided");
        setIsLoading(false);
        return;
      }

      // Use fetch to get the video and load it into fabric
      fetch(videoUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch video");
          }
          return response.blob(); // Convert to a Blob
        })
        .then((blob) => {
          // Create a local URL for the Blob
          const videoUrl = URL.createObjectURL(blob);
          const videoEl = document.createElement("video");
          videoEl.controls = false;
          videoEl.crossOrigin = "anonymous";
          videoEl.src = videoUrl;

          // Wait for the video to be loaded
          videoEl.onloadedmetadata = () => {
            videoEl
              .play()
              .then(() => {
                videoEl.pause();

                // Get the video dimensions
                const vidWidth = videoEl.videoWidth;
                const vidHeight = videoEl.videoHeight;

                // Create a fabric image using the video element
                const fabricVideo = new fabric.Image(videoEl, {
                  left: canvasSize.width / 2,
                  top: canvasSize.height / 2,
                  originX: "center",
                  originY: "center",
                  objectCaching: false,
                  width: vidWidth,
                  height: vidHeight,
                  // Ensure proper source dimensions
                  srcFromAttribute: true,
                });

                // Scale video to reasonable size while maintaining aspect ratio
                const maxSize = 500;
                if (vidWidth > maxSize || vidHeight > maxSize) {
                  const scale = maxSize / Math.max(vidWidth, vidHeight);
                  fabricVideo.scaleX = scale;
                  fabricVideo.scaleY = scale;
                }

                // Enhance rendering - crucial for fixing the cropping issue
                const originalRender = fabricVideo._render;
                fabricVideo._render = function (ctx) {
                  // Draw video with proper source dimensions
                  if (videoEl.readyState >= 2) {
                    ctx.save();
                    // Use native drawImage to ensure proper video rendering
                    ctx.drawImage(
                      videoEl,
                      -this.width! / 2,
                      -this.height! / 2,
                      this.width!,
                      this.height!
                    );
                    ctx.restore();
                  } else {
                    // Fallback to original render if video not ready
                    originalRender.call(this, ctx);
                  }
                };

                // Set up animation for when the video is playing
                const updateVideoFrame = () => {
                  if (videoEl.paused || videoEl.ended) return;
                  canvas.requestRenderAll();
                  requestAnimationFrame(updateVideoFrame);
                };

                // Hook up play listener
                videoEl.addEventListener("play", () => {
                  updateVideoFrame();
                });

                // Store video element and file info
                (fabricVideo as any).mediaElement = videoEl;
                (fabricVideo as any).file = file;
                (fabricVideo as any).getElement = () => videoEl;
                fabricVideo.data = {
                  name: file.name,
                  type: "video",
                  originalWidth: vidWidth,
                  originalHeight: vidHeight,
                  duration: videoEl.duration || 0,
                };
                setDuration((d) => Math.max(d, videoEl.duration) * 1000);

                // Add to canvas
                canvas.add(fabricVideo);
                canvas.setActiveObject(fabricVideo);
                canvas.renderAll();
                saveToHistory();
                setIsLoading(false);

                // Automatically open the timeline when adding a video
                setTimeout(() => {
                  setShowTimeline(true);
                }, 100);

                // Force an additional render to ensure first frame appears
                setTimeout(() => {
                  canvas.requestRenderAll();
                }, 100);
              })
              .catch((err) => {
                console.error(
                  "Error playing video to initialize first frame:",
                  err
                );
                setIsLoading(false);
              });
          };

          videoEl.onerror = () => {
            console.error("Error loading video");
            setIsLoading(false);
          };
        })
        .catch((error) => {
          console.error("Error loading video:", error);
          setIsLoading(false);
        });

      return;
    }

    // Handle case when 'file' is a File (video file object)
    const videoEl = document.createElement("video");
    videoEl.controls = false;
    videoEl.crossOrigin = "anonymous";
    videoEl.src = URL.createObjectURL(file);

    // Wait for the video to be loaded
    videoEl.onloadedmetadata = () => {
      videoEl
        .play()
        .then(() => {
          videoEl.pause();

          // Get the video dimensions
          const vidWidth = videoEl.videoWidth;
          const vidHeight = videoEl.videoHeight;

          // Create a fabric image using the video element
          const fabricVideo = new fabric.Image(videoEl, {
            left: canvasSize.width / 2,
            top: canvasSize.height / 2,
            originX: "center",
            originY: "center",
            objectCaching: false,
            width: vidWidth,
            height: vidHeight,
            // Ensure proper source dimensions
            srcFromAttribute: true,
          });

          // Scale video to reasonable size while maintaining aspect ratio
          const maxSize = 500;
          if (vidWidth > maxSize || vidHeight > maxSize) {
            const scale = maxSize / Math.max(vidWidth, vidHeight);
            fabricVideo.scaleX = scale;
            fabricVideo.scaleY = scale;
          }

          // Enhance rendering - crucial for fixing the cropping issue
          const originalRender = fabricVideo._render;
          fabricVideo._render = function (ctx) {
            // Draw video with proper source dimensions
            if (videoEl.readyState >= 2) {
              ctx.save();
              // Use native drawImage to ensure proper video rendering
              ctx.drawImage(
                videoEl,
                -this.width! / 2,
                -this.height! / 2,
                this.width!,
                this.height!
              );
              ctx.restore();
            } else {
              // Fallback to original render if video not ready
              originalRender.call(this, ctx);
            }
          };

          // Set up animation for when the video is playing
          const updateVideoFrame = () => {
            if (videoEl.paused || videoEl.ended) return;
            canvas.requestRenderAll();
            requestAnimationFrame(updateVideoFrame);
          };

          // Hook up play listener
          videoEl.addEventListener("play", () => {
            updateVideoFrame();
          });

          // Store video element and file info
          (fabricVideo as any).mediaElement = videoEl;
          (fabricVideo as any).file = file;
          (fabricVideo as any).getElement = () => videoEl;
          fabricVideo.data = {
            name: file.name,
            type: "video",
            originalWidth: vidWidth,
            originalHeight: vidHeight,
            duration: videoEl.duration || 0,
          };
          setDuration((d) => Math.max(d, videoEl.duration) * 1000);

          // Add to canvas
          canvas.add(fabricVideo);
          canvas.setActiveObject(fabricVideo);
          canvas.renderAll();
          saveToHistory();
          setIsLoading(false);

          // Automatically open the timeline when adding a video
          setTimeout(() => {
            setShowTimeline(true);
          }, 100);

          // Force an additional render to ensure first frame appears
          setTimeout(() => {
            canvas.requestRenderAll();
          }, 100);
        })
        .catch((err) => {
          console.error("Error playing video to initialize first frame:", err);
          setIsLoading(false);
        });
    };

    videoEl.onerror = () => {
      console.error("Error loading video");
      setIsLoading(false);
    };
  };

  // Handle audio upload
  const handleAudioUpload = (file: File) => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;

    // Create an audio element
    const audioEl = document.createElement("audio");
    audioEl.controls = false; // We'll use our custom controls
    audioEl.crossOrigin = "anonymous";
    audioEl.src = URL.createObjectURL(file);

    // Set additional attributes
    audioEl.loop = false;
    audioEl.muted = false;

    // Wait for the audio to be loaded
    audioEl.onloadedmetadata = () => {
      // Generate a unique ID for the audio track
      const uniqueId = `audio-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      // Create an invisible audio object that will only be used for timeline
      // This object is not visible on canvas but can be tracked in the timeline
      const audioObj: any = new fabric.Object({
        width: 0,
        height: 0,
        left: -1000, // Position off-canvas
        top: -1000, // Position off-canvas
        selectable: false,
        evented: false,
        visible: false,
      });

      // Store audio element and file info
      audioObj.mediaElement = audioEl;
      audioObj.file = file;
      audioObj.data = {
        name: file.name,
        type: "audio",
        duration: audioEl.duration || 0,
      };
      setDuration((d) => Math.max(d, audioEl.duration) * 1000);

      audioObj.id = uniqueId;

      // Add to canvas but make it invisible and non-interactive
      canvas.add(audioObj);
      canvas.renderAll();
      saveToHistory();

      // Automatically open the timeline when adding audio
      setShowTimeline(true);

      // Show notification or toast that audio was added to timeline
      toast({
        title: "Audio added to timeline",
        description: `${file.name} has been added to the timeline.`,
        variant: "default",
      });
    };

    // Handle errors
    audioEl.onerror = () => {
      console.error("Error loading audio");
      toast({
        title: "Error loading audio",
        description: "There was a problem loading the audio file.",
        variant: "destructive",
      });
    };

    // Load the audio
    audioEl.load();
  };

  const [datanotloaded, setDatanotLoaded] = useState(false);
  const [driveClickedArray, setDriveClickedArray] = useState<any[]>([]);
  const [driveVideoClickedArray, setDriveVideoClickedArray] = useState<any[]>(
    []
  );
  const [uploadType, setUploadType] = useState("");
  const [showNyxAssets, setShowNyxAssets] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null); // Reference for file input

  useEffect(() => {
    if (driveClickedArray.length > 0) {
      let item = driveClickedArray.slice(-1)[0];
      handleImageUpload(item);
    }
  }, [driveClickedArray]);

  useEffect(() => {
    if (driveVideoClickedArray.length > 0) {
      let item = driveVideoClickedArray.slice(-1)[0];
      handleVideoUpload(item);
    }
  }, [driveVideoClickedArray]);

  // Handle Nyx asset selection
  const handleNyxAssetSelect = (type: string) => {
    setUploadType(type);
    setShowNyxAssets(true);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Delete" && selectedObject) {
        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.remove(selectedObject);
          setSelectedObject(null);
          setIsRightSidebarOpen(false);
          saveToHistory(); // Save state after deleting object
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedObject]);

  // Group selected objects
  const handleGroup = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const activeSelection = canvas.getActiveObject();

    if (activeSelection && activeSelection.type === "activeSelection") {
      // Group the objects - using the proper fabric.js method with correct type
      const group = (activeSelection as fabric.ActiveSelection).toGroup();

      // Set the group as the active object
      canvas.setActiveObject(group);
      canvas.requestRenderAll();
      saveToHistory();
    }
  };

  // Ungroup selected group
  const handleUngroup = () => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === "group") {
      // Ungroup the objects
      const items = (activeObject as fabric.Group).getObjects();
      (activeObject as fabric.Group).destroy();
      canvas.remove(activeObject);

      // Add the individual objects back to canvas
      canvas.add(...items);

      // Select all the ungrouped objects
      canvas.setActiveObject(new fabric.ActiveSelection(items, { canvas }));
      canvas.requestRenderAll();
      saveToHistory();
    }
  };

  // Handle canvas size change
  const handleCanvasSizeChange = (preset: keyof typeof canvasSizePresets) => {
    const newSize = canvasSizePresets[preset];
    setCanvasSize(newSize);

    // Save current canvas state
    if (fabricCanvasRef.current) {
      //   const currentState = fabricCanvasRef.current.toJSON();

      // Create new canvas with new dimensions
      fabricCanvasRef.current.setDimensions({
        width: newSize.width,
        height: newSize.height,
      });

      // Restore canvas state
      // fabricCanvasRef.current.loadFromJSON(currentState, () => {
      //   // After loading the JSON, render all objects
      //   fabricCanvasRef.current?.renderAll();
      // });
    }
  };

  const toolbarButtons = [
    {
      icon: MousePointerClick,
      label: "Select",
      onClick: () => setSelectedTool("select"),
    },
    { icon: Move, label: "Move", onClick: () => setSelectedTool("move") },
    { icon: Square, label: "Shapes" },
    {
      icon: ImageIcon,
      label: "Media",
      component: (
        <MediaPopover
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="group relative hover:bg-purple-500/20 hover:scale-105 transition-all duration-200 ease-in-out"
            >
              <ImageIcon className="h-4 w-4 transition-transform group-hover:scale-110" />
            </Button>
          }
          onImageSelect={handleImageUpload}
          onVideoSelect={handleVideoUpload}
          onAudioSelect={handleAudioUpload}
          onNyxAssetSelect={handleNyxAssetSelect}
        />
      ),
    },
    { icon: Type, label: "Text", onClick: handleAddText },
    {
      icon: Group,
      label: "Group",
      onClick: handleGroup,
      disabled: !fabricCanvasRef.current
        ?.getActiveObject()
        ?.type?.includes("activeSelection"),
      tooltip: "Group Objects (Ctrl+G)",
    },
    {
      icon: Ungroup,
      label: "Ungroup",
      onClick: handleUngroup,
      disabled: !fabricCanvasRef.current
        ?.getActiveObject()
        ?.type?.includes("group"),
      tooltip: "Ungroup Objects (Ctrl+Shift+G)",
    },
    {
      icon: Trash2,
      label: "Delete",
      onClick: () => {
        if (
          fabricCanvasRef.current &&
          fabricCanvasRef.current.getActiveObject()
        ) {
          fabricCanvasRef.current.remove(
            fabricCanvasRef.current.getActiveObject()!
          );
          fabricCanvasRef.current.requestRenderAll();
          saveToHistory();
        }
      },
      disabled: !fabricCanvasRef.current?.getActiveObject(),
      tooltip: "Delete (Del)",
    },
    {
      icon: Undo,
      label: "Undo",
      onClick: handleUndo,
      disabled: undoStack.length < 2,
      tooltip: "Undo (Ctrl+Z)",
    },
    {
      icon: Redo,
      label: "Redo",
      onClick: handleRedo,
      disabled: redoStack.length === 0,
      tooltip: "Redo (Ctrl+Y)",
    },
  ];

  // Update button states when selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      // Force a re-render to update toolbar button states
      setSelectedObject(fabricCanvasRef.current?.getActiveObject() || null);
    };

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.on("selection:created", handleSelectionChange);
      fabricCanvasRef.current.on("selection:updated", handleSelectionChange);
      fabricCanvasRef.current.on("selection:cleared", handleSelectionChange);
    }

    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.off("selection:created", handleSelectionChange);
        fabricCanvasRef.current.off("selection:updated", handleSelectionChange);
        fabricCanvasRef.current.off("selection:cleared", handleSelectionChange);
      }
    };
  }, []);

  type TimelineRef = {
    exportImage: () => void;
    exportVideo: (d?: number) => void;
  };
  const timelineRef = useRef<TimelineRef>(null);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.get("imageID")) {
      const imageURL = localStorage.getItem(`${searchParams.get("imageID")}`);
      handleImageUpload({ signed_image_url: imageURL });
    } else if (searchParams.get("videoID")) {
      setUploadType("video");
      const videoURL = localStorage.getItem(`${searchParams.get("videoID")}`);
      handleVideoUpload({ signed_video_url: videoURL });
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen overflow-hidden text-white">
      {/* Left Sidebar */}
      <div className="flex-1 flex">
        {/* Top Controls */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 flex items-center space-x-4">
          {/* Canvas Size Selector */}
          <Select
            value={Object.keys(canvasSizePresets).find(
              (key) =>
                canvasSizePresets[key as keyof typeof canvasSizePresets]
                  .width === canvasSize.width &&
                canvasSizePresets[key as keyof typeof canvasSizePresets]
                  .height === canvasSize.height
            )}
            onValueChange={(value: keyof typeof canvasSizePresets) =>
              handleCanvasSizeChange(value)
            }
          >
            <SelectTrigger className="w-[180px] bg-[#1A0B2E]/90 backdrop-blur-lg border-purple-500/20">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(canvasSizePresets).map((preset) => (
                <SelectItem key={preset} value={preset}>
                  {preset} (
                  {
                    canvasSizePresets[preset as keyof typeof canvasSizePresets]
                      .width
                  }
                  x
                  {
                    canvasSizePresets[preset as keyof typeof canvasSizePresets]
                      .height
                  }
                  )
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Toolbar */}
          <div className="bg-[#1A0B2E]/90 backdrop-blur-lg rounded-lg p-1 flex items-center space-x-1">
            {toolbarButtons.map((button, index) => {
              if (button.label === "Shapes") {
                return (
                  <ShapePopover
                    key={index}
                    selectedShape={selectedShape}
                    onShapeSelect={handleShapeSelect}
                    trigger={
                      <Button
                        variant="ghost"
                        size="icon"
                        className="group relative hover:bg-purple-500/20 hover:scale-105 transition-all duration-200 ease-in-out"
                      >
                        <button.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                      </Button>
                    }
                  />
                );
              }

              if (button.component) {
                return (
                  <React.Fragment key={index}>
                    {button.component}
                  </React.Fragment>
                );
              }

              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={button.onClick}
                        disabled={button.disabled}
                        className={cn(
                          "group relative hover:bg-purple-500/20 hover:scale-105 transition-all duration-200 ease-in-out",
                          selectedTool === button.label.toLowerCase() &&
                            "bg-purple-500/20",
                          button.disabled &&
                            "opacity-50 cursor-not-allowed hover:bg-transparent hover:scale-100"
                        )}
                      >
                        <button.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      align="center"
                      className="bg-[#1A0B2E] text-white border-purple-500/20"
                    >
                      <p>{button.tooltip || button.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>

        {/* Canvas Container */}
        <div
          ref={canvasContainerRef}
          className={cn(
            "relative flex-1 overflow-auto flex items-center justify-center",
            isDragging && "cursor-grabbing"
          )}
          style={{
            background:
              "linear-gradient(52.6deg, #650B92 0.83%, #1D5C9C 100.51%)",
          }}
          onWheel={(e: React.WheelEvent<HTMLDivElement>) => {
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              if (!fabricCanvasRef.current) return;

              const delta = e.deltaY;

              // Create a custom point based on cursor position instead of using getPointer
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const point = new fabric.Point(x, y);

              // Calculate new zoom level
              const newZoomLevel = Math.min(
                Math.max(zoomLevel - delta / 2, 10),
                400
              );

              // Apply zoom
              if (fabricCanvasRef.current) {
                fabricCanvasRef.current.zoomToPoint(point, newZoomLevel / 100);
                setZoomLevel(newZoomLevel);
                fabricCanvasRef.current.requestRenderAll();
              }
            }
          }}
          onMouseDown={(e) => {
            // Rest of your existing mousedown handler
            // ...
          }}
        >
          {/* Canvas with Shadow and Border */}
          <div
            className="absolute transition-transform duration-200"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "center",
              width: canvasSize.width,
              height: canvasSize.height,
              left: `calc(50% - ${canvasSize.width / 2}px)`,
              top: `calc(50% - ${canvasSize.height / 2}px)`,
            }}
          >
            <div className="absolute inset-0 bg-white rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.3)]">
              <canvas ref={canvasRef} className="absolute inset-0" />
            </div>
          </div>

          {/* Settings Button */}
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black rounded-md">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleAddText}
                    className={cn(
                      "group relative hover:bg-purple-500/20 hover:scale-105 transition-all duration-200 ease-in-out",
                      isRightSidebarOpen && "bg-purple-500/20"
                    )}
                  >
                    <ChevronLeft className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="left"
                  align="center"
                  className="bg-[#1A0B2E] text-white border-purple-500/20"
                >
                  <p>Properties</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Rulers */}
          {/* <div className="absolute top-0 left-0 w-full h-6 bg-[#1A0B2E]/80 backdrop-blur-sm border-b border-purple-500/10" />
          <div className="absolute top-0 left-0 w-6 h-full bg-[#1A0B2E]/80 backdrop-blur-sm border-r border-purple-500/10" /> */}
        </div>

        {/* Bottom Controls with Zoom */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-[#1A0B2E]/90 backdrop-blur-lg rounded-lg px-3 py-1.5 text-sm border border-purple-500/10">
          {/* EXPORT */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-4 w-4">
                <DownloadCloud className="h-full w-full" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="bg-[#1A0B2E]/90 text-white  w-auto">
              <div className="flex flex-col ">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => timelineRef.current?.exportImage()}
                  disabled={zoomLevel <= 10}
                  className="flex w-auto"
                >
                  <ImageIcon className="h-3 w-3" />
                  <span>Export Image</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => timelineRef.current?.exportVideo(duration)}
                  disabled={zoomLevel >= 200}
                  className="flex w-auto"
                >
                  <VideoIcon className="h-3 w-3" />
                  <span>Export Video</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Canvas Size */}
          <div className="flex items-center space-x-2">
            <span>
              {canvasSize.width} × {canvasSize.height}
            </span>
          </div>

          <Separator orientation="vertical" className="h-4 bg-purple-500/20" />

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleZoom(zoomLevel - 10)}
              disabled={zoomLevel <= 10}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <Select
              value={zoomLevel.toString()}
              onValueChange={(value) => handleZoom(Number(value))}
            >
              <SelectTrigger className="w-[85px] h-6 px-2 bg-transparent border-none">
                <SelectValue>{Math.round(zoomLevel)}%</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {[10, 25, 50, 75, 100, 125, 150, 200, 300, 400].map((zoom) => (
                  <SelectItem key={zoom} value={zoom.toString()}>
                    {zoom}%
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => handleZoom(zoomLevel + 10)}
              disabled={zoomLevel >= 400}
            >
              <Plus className="h-3 w-3" />
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => {
                      if (
                        !canvasContainerRef.current ||
                        !fabricCanvasRef.current
                      )
                        return;

                      const container = canvasContainerRef.current;
                      const containerWidth = container.clientWidth;
                      const containerHeight = container.clientHeight;

                      const scaleX = (containerWidth - 100) / canvasSize.width;
                      const scaleY =
                        (containerHeight - 100) / canvasSize.height;
                      const scale = Math.min(scaleX, scaleY, 1);

                      handleZoom(scale * 100);
                    }}
                  >
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Fit to screen</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className={cn(
          "w-96 bg-[#1A0B2E]/90 backdrop-blur-lg border-purple-500/20 fixed right-0 top-0 bottom-0 transform transition-all duration-300 z-10",
          isRightSidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="h-full">
          <div className="h-16 border-b border-gray-700 flex items-center justify-between px-4">
            <h3 className="text-lg font-semibold text-white">Properties</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsRightSidebarOpen(false)}
              className="hover:bg-gray-700"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {selectedObject && (
            <>
              {selectedMediaType === "video" && (
                <MediaEditor
                  selectedObject={selectedObject}
                  canvas={fabricCanvasRef.current}
                  onSave={saveToHistory}
                  type="video"
                />
              )}
              {selectedMediaType === "audio" && (
                <MediaEditor
                  selectedObject={selectedObject}
                  canvas={fabricCanvasRef.current}
                  onSave={saveToHistory}
                  type="audio"
                />
              )}
              {selectedObject.type === "i-text" && (
                <TextEditor
                  selectedObject={selectedObject as fabric.IText}
                  canvas={fabricCanvasRef.current}
                />
              )}
              {(selectedObject.type === "rect" ||
                selectedObject.type === "circle" ||
                selectedObject.type === "triangle" ||
                selectedObject.type === "polygon" ||
                selectedObject.type === "path" ||
                (selectedObject.type === "image" &&
                  selectedMediaType !== "video")) && (
                <ShapeEditor
                  selectedObject={selectedObject}
                  canvas={fabricCanvasRef.current}
                  onSave={saveToHistory}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Canvas Timeline */}
      <CanvasTimeline
        ref={timelineRef}
        canvas={fabricCanvasRef.current}
        visible={showTimeline}
        onToggle={() => setShowTimeline(!showTimeline)}
      />
      {showNyxAssets && (
        <BrandCanvasAssetsUpload
          datanotloaded={false}
          onClose={() => setShowNyxAssets(false)}
          handleSystemButtonClick={() => fileInputRef?.current?.click()}
          handleDriveButtonClick={console.log}
          fileInputRef={fileInputRef}
          uploadType={uploadType}
          generateVideoButtonClick={console.log}
          setDriveClickedArray={setDriveClickedArray}
          setDriveVideoClickedArray={setDriveVideoClickedArray}
          driveClickedArray={driveClickedArray}
          driveVideoClickedArray={driveVideoClickedArray}
        />
      )}
      {/* Timeline Toggle Button - only show when timeline is hidden */}
      {!showTimeline && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 h-10 w-10 rounded-full bg-[#1A0B2E]/90 backdrop-blur-lg shadow-lg z-50"
          onClick={() => setShowTimeline(true)}
        >
          <Clock className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default BrandCanvas;
