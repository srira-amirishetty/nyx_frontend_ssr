import { makeAutoObservable } from "mobx";
import { fabric } from "fabric";
import {
  getUid,
  isHtmlAudioElement,
  isHtmlImageElement,
  isHtmlVideoElement,
} from "@nyx-frontend/main/utils";
import anime, { get } from "animejs";
import {
  MenuOption,
  EditorElement,
  Animation,
  TimeFrame,
  VideoEditorElement,
  AudioEditorElement,
  Placement,
  ImageEditorElement,
  EmojiEditorElement,
  Effect,
  TextEditorElement,
  CircleEditorElement,
  TriangleEditorElement,
  SquareEditorElement,
  LineEditorElement,
  HexagonEditorElement,
  SemiCircleEditorElement,
  ParallelogramEditorElement,
  IconEditorElement,
} from "../types";
import { FabricUitls } from "@nyx-frontend/main/utils/fabric-utils";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { getRandomInt, updateProps } from "./utils";

class Memento {
  constructor(public readonly editorElements: EditorElement[]) {}
}
type AspectRatio = "4:5" | "16:9" | "2:3" | "1:1" | "19:4";
export class Store {
  canvas: fabric.Canvas | null;

  backgroundColor: string;
  resolution: { height: number; width: number };
  selectedMenuOption: MenuOption;
  audios: string[];
  videos: string[];
  images: string[];
  emojis: string[];
  editorElements: EditorElement[];
  selectedElement: EditorElement | null;

  maxTime: number;
  animations: Animation[];
  animationTimeLine: anime.AnimeTimelineInstance;
  playing: boolean;

  currentKeyFrame: number;
  fps: number;

  possibleVideoFormats: string[] = ["mp4", "webm"];
  selectedVideoFormat: "mp4" | "webm";

  private stack: Memento[] = [];
  private currentIndex = -1;

  constructor() {
    this.canvas = null;
    this.resolution = { height: 400, width: 1900 };
    this.videos = [];
    this.images = [];
    this.emojis = [];
    this.audios = [];
    this.editorElements = [];
    this.backgroundColor = "#111111";
    this.maxTime = 30 * 1000;
    this.playing = false;
    this.currentKeyFrame = 0;
    this.selectedElement = null;
    this.fps = 60;
    this.animations = [];
    this.animationTimeLine = anime.timeline();
    this.selectedMenuOption = "Video";
    this.selectedVideoFormat = "webm";
    makeAutoObservable(this);
    this.groupSelectedObjects()
    this.ungroupSelectedObjects()
  }
  setResolution(aspectRatio: AspectRatio) {
    switch (aspectRatio) {
      case "4:5":
        this.resolution = { width: 320, height: 400 };
        break;
      case "16:9":
        this.resolution = { width: 700, height: 400 };
        break;
      case "2:3":
        this.resolution = { width: 270, height: 400 };
        break;
      case "1:1":
        this.resolution = { width: 400, height: 400 };
        break;
      case "19:4":
        this.resolution = { width: 700, height: 250 };
        break;
    }
  }

  
  groupSelectedObjects() {
    if (!this.canvas) return;
    const activeObjects = this.canvas.getActiveObjects();
    if (true) {
      const group = new fabric.Group(activeObjects);
      this.canvas.remove(...activeObjects);
      console.log("group elements",group)
      this.canvas.add(group);
      this.canvas.setActiveObject(group);
      this.canvas.requestRenderAll();
    }
  }

  ungroupSelectedObjects() {
    if (!this.canvas) return;
  
    const activeObject = this.canvas.getActiveObject();
    console.log("bbbbbbbbbbbh",activeObject)
   
    if (activeObject ) {
      
      const group = activeObject as fabric.Group;
      console.log("ungroup",group)
      const items = group.getObjects();
  
      // Remove group but keep its position for individual items
      group._restoreObjectsState(); // Restores the original positions of group elements
      this.canvas.remove(group);
  
      items.forEach((item) => {
        this.canvas?.add(item);
        console.log("item",item)
      });
      this.canvas.requestRenderAll();
      this.refreshElements();
    }
  }


  get currentTimeInMs() {
    return (this.currentKeyFrame * 1000) / this.fps;
  }

  setCurrentTimeInMs(time: number) {
    this.currentKeyFrame = Math.floor((time / 1000) * this.fps);
  }

  setSelectedMenuOption(selectedMenuOption: MenuOption) {
    this.selectedMenuOption = selectedMenuOption;
  }

  setCanvas(canvas: fabric.Canvas | null) {
    this.canvas = canvas;
    if (canvas) {
      canvas.backgroundColor = this.backgroundColor;
    }
  }

  setBackgroundColor(backgroundColor: string) {
    this.backgroundColor = backgroundColor;
    if (this.canvas) {
      this.canvas.backgroundColor = backgroundColor;
    }
  }

  updateEffect(id: string, effect: Effect) {
    const index = this.editorElements.findIndex((element) => element.id === id);
    const element = this.editorElements[index];
    if (
      isEditorVideoElement(element) ||
      isEditorImageElement(element) ||
      isEditorEmojiElement(element)
    ) {
      element.properties.effect = effect;
    }
    this.refreshElements();
    this.pushMemento();
  }

  setVideos(videos: string[]) {
    this.videos = videos;
  }

  addVideoResource(video: string) {
    this.videos = [...this.videos, video];
  }
  addAudioResource(audio: string) {
    this.audios = [...this.audios, audio];
  }
  addImageResource(image: string) {
    this.images = [...this.images, image];
  }
  addEmojiResource(emoji: string) {
    this.emojis = [...this.emojis, emoji];
  }

  addAnimation(animation: Animation) {
    this.animations = [...this.animations, animation];
    this.refreshAnimations();
  }
  updateAnimation(id: string, animation: Animation) {
    const index = this.animations.findIndex((a) => a.id === id);
    this.animations[index] = animation;
    this.refreshAnimations();
  }

  refreshAnimations() {
    anime.remove(this.animationTimeLine);
    this.animationTimeLine = anime.timeline({
      duration: this.maxTime,
      autoplay: false,
    });
    for (let i = 0; i < this.animations.length; i++) {
      const animation = this.animations[i];
      const editorElement = this.editorElements.find(
        (element) => element.id === animation.targetId,
      );
      const fabricObject = editorElement?.fabricObject;
      if (!editorElement || !fabricObject) {
        continue;
      }
      fabricObject.clipPath = undefined;
      switch (animation.type) {
        case "fadeIn": {
          this.animationTimeLine.add(
            {
              opacity: [0, 1],
              duration: animation.duration,
              targets: fabricObject,
              easing: "linear",
            },
            editorElement.timeFrame.start,
          );
          break;
        }
        case "fadeOut": {
          this.animationTimeLine.add(
            {
              opacity: [1, 0],
              duration: animation.duration,
              targets: fabricObject,
              easing: "linear",
            },
            editorElement.timeFrame.end - animation.duration,
          );
          break;
        }
        case "slideIn": {
          const direction = animation.properties.direction;
          const targetPosition = {
            left: editorElement.placement.x,
            top: editorElement.placement.y,
          };
          const startPosition = {
            left:
              direction === "left"
                ? -editorElement.placement.width
                : direction === "right"
                  ? this.canvas?.width
                  : editorElement.placement.x,
            top:
              direction === "top"
                ? -editorElement.placement.height
                : direction === "bottom"
                  ? this.canvas?.height
                  : editorElement.placement.y,
          };
          if (animation.properties.useClipPath) {
            const clipRectangle = FabricUitls.getClipMaskRect(
              editorElement,
              50,
            );
            fabricObject.set("clipPath", clipRectangle);
          }
          if (
            editorElement.type === "text" &&
            animation.properties.textType === "character"
          ) {
            this.canvas?.remove(...editorElement.properties.splittedTexts);
            // @ts-ignore
            editorElement.properties.splittedTexts =
              getTextObjectsPartitionedByCharacters(
                //@ts-ignore
                editorElement.fabricObject,
                editorElement,
              );
            editorElement.properties.splittedTexts.forEach((textObject) => {
              this.canvas!.add(textObject);
            });
            const duration = animation.duration / 2;
            const delay =
              duration / editorElement.properties.splittedTexts.length;
            for (
              let i = 0;
              i < editorElement.properties.splittedTexts.length;
              i++
            ) {
              const splittedText = editorElement.properties.splittedTexts[i];
              const offset = {
                left: splittedText.left! - editorElement.placement.x,
                top: splittedText.top! - editorElement.placement.y,
              };
              this.animationTimeLine.add(
                {
                  left: [
                    startPosition.left! + offset.left,
                    targetPosition.left + offset.left,
                  ],
                  top: [
                    startPosition.top! + offset.top,
                    targetPosition.top + offset.top,
                  ],
                  delay: i * delay,
                  duration: duration,
                  targets: splittedText,
                },
                editorElement.timeFrame.start,
              );
            }
            this.animationTimeLine.add(
              {
                opacity: [1, 0],
                duration: 1,
                targets: fabricObject,
                easing: "linear",
              },
              editorElement.timeFrame.start,
            );
            this.animationTimeLine.add(
              {
                opacity: [0, 1],
                duration: 1,
                targets: fabricObject,
                easing: "linear",
              },
              editorElement.timeFrame.start + animation.duration,
            );

            this.animationTimeLine.add(
              {
                opacity: [0, 1],
                duration: 1,
                targets: editorElement.properties.splittedTexts,
                easing: "linear",
              },
              editorElement.timeFrame.start,
            );
            this.animationTimeLine.add(
              {
                opacity: [1, 0],
                duration: 1,
                targets: editorElement.properties.splittedTexts,
                easing: "linear",
              },
              editorElement.timeFrame.start + animation.duration,
            );
          }
          this.animationTimeLine.add(
            {
              left: [startPosition.left, targetPosition.left],
              top: [startPosition.top, targetPosition.top],
              duration: animation.duration,
              targets: fabricObject,
              easing: "linear",
            },
            editorElement.timeFrame.start,
          );
          break;
        }
        case "slideOut": {
          const direction = animation.properties.direction;
          const startPosition = {
            left: editorElement.placement.x,
            top: editorElement.placement.y,
          };
          const targetPosition = {
            left:
              direction === "left"
                ? -editorElement.placement.width
                : direction === "right"
                  ? this.canvas?.width
                  : editorElement.placement.x,
            top:
              direction === "top"
                ? -100 - editorElement.placement.height
                : direction === "bottom"
                  ? this.canvas?.height
                  : editorElement.placement.y,
          };
          if (animation.properties.useClipPath) {
            const clipRectangle = FabricUitls.getClipMaskRect(
              editorElement,
              50,
            );
            fabricObject.set("clipPath", clipRectangle);
          }
          this.animationTimeLine.add(
            {
              left: [startPosition.left, targetPosition.left],
              top: [startPosition.top, targetPosition.top],
              duration: animation.duration,
              targets: fabricObject,
              easing: "linear",
            },
            editorElement.timeFrame.end - animation.duration,
          );
          break;
        }
        case "breathe": {
          const itsSlideInAnimation = this.animations.find(
            (a) => a.targetId === animation.targetId && a.type === "slideIn",
          );
          const itsSlideOutAnimation = this.animations.find(
            (a) => a.targetId === animation.targetId && a.type === "slideOut",
          );
          const timeEndOfSlideIn = itsSlideInAnimation
            ? editorElement.timeFrame.start + itsSlideInAnimation.duration
            : editorElement.timeFrame.start;
          const timeStartOfSlideOut = itsSlideOutAnimation
            ? editorElement.timeFrame.end - itsSlideOutAnimation.duration
            : editorElement.timeFrame.end;
          if (timeEndOfSlideIn > timeStartOfSlideOut) {
            continue;
          }
          const duration = timeStartOfSlideOut - timeEndOfSlideIn;
          const easeFactor = 4;
          const suitableTimeForHeartbeat = ((1000 * 60) / 72) * easeFactor;
          const upScale = 1.05;
          const currentScaleX = fabricObject.scaleX ?? 1;
          const currentScaleY = fabricObject.scaleY ?? 1;
          const finalScaleX = currentScaleX * upScale;
          const finalScaleY = currentScaleY * upScale;
          const totalHeartbeats = Math.floor(
            duration / suitableTimeForHeartbeat,
          );
          if (totalHeartbeats < 1) {
            continue;
          }
          const keyframes = [];
          for (let i = 0; i < totalHeartbeats; i++) {
            keyframes.push({ scaleX: finalScaleX, scaleY: finalScaleY });
            keyframes.push({ scaleX: currentScaleX, scaleY: currentScaleY });
          }

          this.animationTimeLine.add(
            {
              duration: duration,
              targets: fabricObject,
              keyframes,
              easing: "linear",
              loop: true,
            },
            timeEndOfSlideIn,
          );

          break;
        }
      }
    }
  }

  removeAnimation(id: string) {
    this.animations = this.animations.filter(
      (animation) => animation.id !== id,
    );
    this.refreshAnimations();
  }

  setSelectedElement(selectedElement: EditorElement | null) {
    this.selectedElement = selectedElement;
    if (this.canvas) {
      if (selectedElement?.fabricObject)
        this.canvas.setActiveObject(selectedElement.fabricObject);
      else this.canvas.discardActiveObject();
    }
  }
  updateSelectedElement() {
    this.selectedElement =
      this.editorElements.find(
        (element) => element.id === this.selectedElement?.id,
      ) ?? null;
  }

  setEditorElements(editorElements: EditorElement[]) {
    this.editorElements = editorElements;
    this.updateSelectedElement();
    this.refreshElements();
    this.pushMemento();
    // this.refreshAnimations();
  }

  updateEditorElement(editorElement: EditorElement) {
    this.setEditorElements(
      this.editorElements.map((element) =>
        element.id === editorElement.id ? editorElement : element,
      ),
    );
  }

  updateEditorElementTimeFrame(
    editorElement: EditorElement,
    timeFrame: Partial<TimeFrame>,
  ) {
    if (timeFrame.start != undefined && timeFrame.start < 0) {
      timeFrame.start = 0;
    }
    if (timeFrame.end != undefined && timeFrame.end > this.maxTime) {
      timeFrame.end = this.maxTime;
    }
    const newEditorElement = {
      ...editorElement,
      timeFrame: {
        ...editorElement.timeFrame,
        ...timeFrame,
      },
    };
    this.updateVideoElements();
    this.updateAudioElements();
    this.updateEditorElement(newEditorElement);
    this.refreshAnimations();
    this.pushMemento();
  }

  addEditorElement(editorElement: EditorElement) {
    this.setEditorElements([...this.editorElements, editorElement]);
    this.refreshElements();
    this.setSelectedElement(
      this.editorElements[this.editorElements.length - 1],
    );
    this.pushMemento();
  }

  removeEditorElement(id: string) {
    this.setEditorElements(
      this.editorElements.filter((editorElement) => editorElement.id !== id),
    );
    this.refreshElements();
    this.pushMemento();
  }

  setMaxTime(maxTime: number) {
    this.maxTime = maxTime;
  }

  setPlaying(playing: boolean) {
    this.playing = playing;
    this.updateVideoElements();
    this.updateAudioElements();
    if (playing) {
      this.startedTime = Date.now();
      this.startedTimePlay = this.currentTimeInMs;
      requestAnimationFrame(() => {
        this.playFrames();
      });
    }
  }

  startedTime = 0;
  startedTimePlay = 0;

  playFrames() {
    if (!this.playing) {
      return;
    }
    const elapsedTime = Date.now() - this.startedTime;
    const newTime = this.startedTimePlay + elapsedTime;
    this.updateTimeTo(newTime);
    if (newTime > this.maxTime) {
      this.currentKeyFrame = 0;
      this.setPlaying(false);
    } else {
      requestAnimationFrame(() => {
        this.playFrames();
      });
    }
  }
  updateTimeTo(newTime: number) {
    this.setCurrentTimeInMs(newTime);
    this.animationTimeLine.seek(newTime);
    if (this.canvas) {
      this.canvas.backgroundColor = this.backgroundColor;
    }
    this.editorElements.forEach((e) => {
      if (!e.fabricObject) return;
      const isInside =
        e.timeFrame.start <= newTime && newTime <= e.timeFrame.end;
      e.fabricObject.visible = isInside;
    });
  }

  handleSeek(seek: number) {
    if (this.playing) {
      this.setPlaying(false);
    }
    this.updateTimeTo(seek);
    this.updateVideoElements();
    this.updateAudioElements();
  }

  addVideo(index: number) {
    const videoElement = document.getElementById(`video-${index}`);
    if (!isHtmlVideoElement(videoElement)) {
      return;
    }
    const videoDurationMs = videoElement.duration * 1000;
    const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
    const id = getUid();
    this.addEditorElement({
      id,
      name: `Media(video) ${index + 1}`,
      type: "video",
      placement: {
        x: getRandomInt(0, 100),
        y: getRandomInt(0, 100),
        width: 100 * aspectRatio,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      },
      timeFrame: {
        start: 0,
        end: videoDurationMs,
      },
      properties: {
        elementId: `video-${id}`,
        src: videoElement.src,
        effect: {
          type: "none",
        },
      },
    });
  }

  addImage(index: number) {
    const imageElement = document.getElementById(`image-${index}`);
    if (!isHtmlImageElement(imageElement)) {
      return;
    }
    const aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
    const id = getUid();
    this.addEditorElement({
      id,
      name: `Media(image) ${index + 1}`,
      type: "image",
      placement: {
        x: getRandomInt(0, 100),
        y: getRandomInt(0, 100),
        width: 100 * aspectRatio,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      },
      timeFrame: {
        start: 0,
        end: this.maxTime,
      },
      properties: {
        elementId: `image-${id}`,
        src: imageElement.src,
        effect: {
          type: "none",
        },
      },
    });
  }

  // addImageOnSelect(activeObject: EditorElement, image: string) {
  //   console.log("activeObject", activeObject);
  //   if (!activeObject) return;

  //   const left = activeObject.placement.x || getRandomInt(0, 100);
  //   const top = activeObject.placement.y || getRandomInt(0, 100);
  //   const scaleX = activeObject.placement.scaleX || 1;
  //   const scaleY = activeObject.placement.scaleY || 1;
  //   const angle = activeObject.placement.rotation || 0;
  //   const width = activeObject.placement.width;
  //   const height = activeObject.placement.height;
  //   this.removeEditorElement(activeObject.id);
  //   const id = getUid();
  //   this.addEditorElement({
  //     id,
  //     name: `Media(image) ${id}`,
  //     type: "image",
  //     placement: {
  //       x: left,
  //       y: top,
  //       width: width,
  //       height: height,
  //       rotation: angle,
  //       scaleX: scaleX,
  //       scaleY: scaleY,
  //     },
  //     timeFrame: {
  //       start: 0,
  //       end: this.maxTime,
  //     },
  //     properties: {
  //       elementId: `image-${id}`,
  //       src: image,
  //       effect: {
  //         type: "none",
  //       },
  //     },
  //   });
  //   this.selectedElement?.fabricObject?.scaleToWidth(width);
  //   this.selectedElement?.fabricObject?.scaleToHeight(height);
  //   this.canvas?.requestRenderAll();
  // }
  addImageOnSelect(activeObject: EditorElement, image: string) {
    if (!activeObject) return;

    // Create a new image to get its natural dimensions
    const img = new Image();
    img.src = image;

    // Set the image load event to ensure natural dimensions are available
    img.onload = () => {
      // Scale down the natural dimensions to a smaller size
      const scaleFactor = 0.1; // Adjust this factor as needed (0.5 = 50% of original size)
      const naturalWidth = img.naturalWidth * scaleFactor;
      const naturalHeight = img.naturalHeight * scaleFactor;

      // Fallback to the provided width and height if activeObject has them
      const left = activeObject.placement.x || getRandomInt(0, 100);
      const top = activeObject.placement.y || getRandomInt(0, 100);
      const scaleX = 5;
      const scaleY =  5;
      const angle = activeObject.placement.rotation || 0;

      // Remove old editor element and add a new one with updated dimensions
      this.removeEditorElement(activeObject.id);
      const id = getUid();
      this.addEditorElement({
        id,
        name: `Media(image) ${id}`,
        type: "image",
        placement: {
          x: left,
          y: top,
          width: naturalWidth,
          height: naturalHeight,
          rotation: angle,
          scaleX: scaleX,
          scaleY: scaleY,
        },
        timeFrame: {
          start: 0,
          end: this.maxTime,
        },
        properties: {
          elementId: `image-${id}`,
          src: image,
          effect: {
            type: "none",
          },
        },
      });

      // Set dimensions on the selected fabric object
      this.selectedElement?.fabricObject?.scaleToWidth(naturalWidth);
      this.selectedElement?.fabricObject?.scaleToHeight(naturalHeight);
      this.canvas?.requestRenderAll();
    };
}

  


  
  addVideoFromBlob(blob: Blob, duration:number) {
    const videoElement = document.createElement("video");
    const videoURL = URL.createObjectURL(blob);
    videoElement.src = videoURL;
  
    videoElement.addEventListener("loadedmetadata", () => {
      const videoDurationMs = duration * 1000;
      const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
      const id = getUid();
  
      // Add the video element to the editor
      this.addEditorElement({
        id,
        name: `Media(video) ${id}`,
        type: "video",
        placement: {
          x: getRandomInt(0, 100),
          y: getRandomInt(0, 100),
          width: 100 * aspectRatio,
          height: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        },
        timeFrame: {
          start: 0,
          end: videoDurationMs,
        },
        properties: {
          elementId: `video-${id}`,
          src: videoURL,
          effect: {
            type: "none",
          },
        },
      });
  
      this.setMaxTime(videoDurationMs)
      // Render the video element on the canvas
      this.canvas?.requestRenderAll();
    });
  
   videoElement.load(); // Trigger loading of video metadata
  }

  addAudioFromBlob(blob: Blob, duration: number) {
    const audioElement = document.createElement("audio");
    const audioURL = URL.createObjectURL(blob);
    audioElement.src = audioURL;
  
    audioElement.addEventListener("loadedmetadata", () => {
      const audioDurationMs = duration * 1000;
      const id = getUid();
  
      // Add the audio element to the editor
      this.addEditorElement({
        id,
        name: `Media(audio) ${id}`,
        type: "audio",
        placement: {
          x: getRandomInt(0, 100), // Adjust as needed
          y: getRandomInt(0, 100), // Adjust as needed
          width: 100, // Set default width for the audio element visualization
          height: 30, // Default height for the audio element visualization
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        },
        timeFrame: {
          start: 0,
          end: audioDurationMs,
        },
        properties: {
          elementId: `audio-${id}`,
          src: audioURL,
        
        },
      });
  
      this.setMaxTime(audioDurationMs);
      // Render the audio element on the canvas or relevant container
      this.canvas?.requestRenderAll();
    });
  
    audioElement.load(); // Trigger loading of audio metadata
  }
  

  // addEmoji(index: number) {
  //   const imageElement = document.getElementById(`emoji-${index}`);
  //   if (!isHtmlImageElement(imageElement)) {
  //     return;
  //   }
  //   const aspectRatio = imageElement.naturalWidth / imageElement.naturalHeight;
  //   const id = getUid();
  //   this.addEditorElement({
  //     id,
  //     name: `Media(emoji) ${index + 1}`,
  //     type: "image",
  //     placement: {
  //       x: 0,
  //       y: 0,
  //       width: 100 * aspectRatio,
  //       height: 100,
  //       rotation: 0,
  //       scaleX: 1,
  //       scaleY: 1,
  //     },
  //     timeFrame: {
  //       start: 0,
  //       end: this.maxTime,
  //     },
  //     properties: {
  //       elementId: `emoji-${id}`,
  //       src: imageElement.src,
  //       effect: {
  //         type: "none",
  //       },
  //     },
  //   });
  // }
  addEmoji(url: string) {
    // Create a new image element
    const imageElement = new Image();
    imageElement.src = url;

    imageElement.onload = () => {
      // Calculate the aspect ratio
      const aspectRatio =
        imageElement.naturalWidth / imageElement.naturalHeight;
      const id = getUid();

      // Add the emoji as an editor element
      this.addEditorElement({
        id,
        name: `Media(emoji)`,
        type: "image",
        placement: {
          x: 0,
          y: 0,
          width: 100 * aspectRatio, // Maintain aspect ratio
          height: 100,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
        },
        timeFrame: {
          start: 0,
          end: this.maxTime,
        },
        properties: {
          elementId: `emoji-${id}`,
          src: url, // Store the URL of the image
          effect: {
            type: "none",
          },
        },
      });

      // Refresh the editor or canvas
      this.refreshElements();
    };

    imageElement.onerror = () => {
      console.error("Failed to load image from URL:", url);
    };
  }

  addAudio(index: number) {
    const audioElement = document.getElementById(`audio-${index}`);
    if (!isHtmlAudioElement(audioElement)) {
      return;
    }
    const audioDurationMs = audioElement.duration * 1000;
    const id = getUid();
    this.addEditorElement({
      id,
      name: `Media(audio) ${index + 1}`,
      type: "audio",
      placement: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      },
      timeFrame: {
        start: 0,
        end: audioDurationMs,
      },
      properties: {
        elementId: `audio-${id}`,
        src: audioElement.src,
      },
    });
  }
  addText(options: {
    text: string;
    fontSize: number;
    fontWeight: number;
    textAlign: string;
    fill: string;
    backgroundColor: string;
    fontFamily: string;
    underline: boolean;
    fontStyle: string;
  }) {
    const id = getUid();
    const index = this.editorElements.length;
    this.addEditorElement({
      id,
      name: `Text ${index + 1}`,
      type: "text",
      placement: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
      },
      timeFrame: {
        start: 0,
        end: this.maxTime,
      },
      properties: {
        text: options.text,
        fontSize: options.fontSize,
        fontWeight: options.fontWeight,
        textAlign: options.textAlign,
        fill: options.fill || "#fff",
        //@ts-ignore
        backgroundColor: options.backgroundColor,
        fontFamily: options.fontFamily,
        underline: options.underline,
        //@ts-ignore
        fontStyle: options.fontStyle,
        splittedTexts: [],
      },
    });
  }

  updateVideoElements() {
    this.editorElements
      .filter(
        (element): element is VideoEditorElement => element.type === "video",
      )
      .forEach((element) => {
        const video = document.getElementById(element.properties.elementId);
        if (isHtmlVideoElement(video)) {
          const videoTime =
            (this.currentTimeInMs - element.timeFrame.start) / 1000;
          video.currentTime = videoTime;
          if (this.playing) {
            video.play();
          } else {
            video.pause();
          }
        }
      });
  }
  updateAudioElements() {
    this.editorElements
      .filter(
        (element): element is AudioEditorElement => element.type === "audio",
      )
      .forEach((element) => {
        const audio = document.getElementById(element.properties.elementId);
        if (isHtmlAudioElement(audio)) {
          const audioTime =
            (this.currentTimeInMs - element.timeFrame.start) / 1000;
          audio.currentTime = audioTime;
          if (this.playing) {
            audio.play();
          } else {
            audio.pause();
          }
        }
      });
  }
  // saveCanvasToVideo() {
  //   const video = document.createElement("video");
  //   const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  //   const stream = canvas.captureStream();
  //   video.srcObject = stream;
  //   video.play();
  //   const mediaRecorder = new MediaRecorder(stream);
  //   const chunks: Blob[] = [];
  //   mediaRecorder.ondataavailable = function (e) {
  //     console.log("data available");
  //     console.log(e.data);
  //     chunks.push(e.data);
  //   };
  //   mediaRecorder.onstop = function (e) {
  //     const blob = new Blob(chunks, { type: "video/webm" });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "video.webm";
  //     a.click();
  //   };
  //   mediaRecorder.start();
  //   setTimeout(() => {
  //     mediaRecorder.stop();
  //   }, this.maxTime);

  // }

  setVideoFormat(format: "mp4" | "webm") {
    this.selectedVideoFormat = format;
  }

  saveCanvasToVideoWithAudio() {
    this.saveCanvasToVideoWithAudioWebmMp4();
  }

  saveCanvasToVideoWithAudioWebmMp4() {
    console.log("modified");
    let mp4 = this.selectedVideoFormat === "mp4";
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.canvas?.setDimensions({
      width: this.resolution.width,
      height: this.resolution.height,
    });
    this.canvas?.renderAll();
    const stream = canvas.captureStream(30);
    const audioElements = this.editorElements.filter(isEditorAudioElement);
    const audioStreams: MediaStream[] = [];
    audioElements.forEach((audio) => {
      const audioElement = document.getElementById(
        audio.properties.elementId,
      ) as HTMLAudioElement;
      let ctx = new AudioContext();
      let sourceNode = ctx.createMediaElementSource(audioElement);
      let dest = ctx.createMediaStreamDestination();
      sourceNode.connect(dest);
      sourceNode.connect(ctx.destination);
      audioStreams.push(dest.stream);
    });
    audioStreams.forEach((audioStream) => {
      stream.addTrack(audioStream.getAudioTracks()[0]);
    });
    const video = document.createElement("video");
    video.srcObject = stream;
    // video.height = 500;
    // video.width = 800;
    // video.controls = true;
    // document.body.appendChild(video);
    video.play().then(() => {
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
        console.log("data available");
      };
      mediaRecorder.onstop = async function (e) {
        const blob = new Blob(chunks, { type: "video/webm" });

        if (mp4) {
          // lets use ffmpeg to convert webm to mp4
          const data = new Uint8Array(await blob.arrayBuffer());
          const ffmpeg = new FFmpeg();
          const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
          await ffmpeg.load({
            coreURL: await toBlobURL(
              `${baseURL}/ffmpeg-core.js`,
              "text/javascript",
            ),
            wasmURL: await toBlobURL(
              `${baseURL}/ffmpeg-core.wasm`,
              "application/wasm",
            ),
            // workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
          });
          await ffmpeg.writeFile("video.webm", data);
          await ffmpeg.exec([
            "-y",
            "-i",
            "video.webm",
            "-c",
            "copy",
            "video.mp4",
          ]);
          // await ffmpeg.exec(["-y", "-i", "video.webm", "-c:v", "libx264", "copy", "video.mp4"]);

          const output = await ffmpeg.readFile("video.mp4");
          const outputBlob = new Blob([output], { type: "video/mp4" });
          const outputUrl = URL.createObjectURL(outputBlob);
          const a = document.createElement("a");
          a.download = "video.mp4";
          a.href = outputUrl;
          a.click();
        } else {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "video.webm";
          a.click();
        }
      };
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
        this.canvas?.setDimensions({
          height: 400,
          width: 700,
        });
        this.canvas?.renderAll();
        this.updateTimeTo(0);
      }, this.maxTime);
      video.remove();
    });
  }

  refreshElements() {
    const store = this;
    if (!store.canvas) return;
    const canvas = store.canvas;
    store.canvas.remove(...store.canvas.getObjects());
    for (let index = 0; index < store.editorElements.length; index++) {
      const element = store.editorElements[index];
      switch (element.type) {
        case "video": {
          console.log("elementid", element.properties.elementId);
          if (document.getElementById(element.properties.elementId) == null)
            continue;
          const videoElement = document.getElementById(
            element.properties.elementId,
          );
          if (!isHtmlVideoElement(videoElement)) continue;
          // const filters = [];
          // if (element.properties.effect?.type === "blackAndWhite") {
          //   filters.push(new fabric.Image.filters.Grayscale());
          // }
          const videoObject = new fabric.CoverVideo(videoElement, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            width: element.placement.width,
            height: element.placement.height,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
            // filters: filters,
            // @ts-ignore
            customFilter: element.properties.effect.type,
          });

          element.fabricObject = videoObject;
          element.properties.imageObject = videoObject;
          videoElement.width = 100;
          videoElement.height =
            (videoElement.videoHeight * 100) / videoElement.videoWidth;
          canvas.add(videoObject);
          // fix video frame to set 0
          // default not define
          setTimeout(() => {
            if (videoObject.getElement()) {
              // @ts-ignore
              videoObject.getElement().currentTime = 0;
            }
          }, 10);
          console.log("videoObject.getElement()");
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target != videoObject) return;
            const placement = element.placement;
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              width:
                target.width && target.scaleX
                  ? target.width * target.scaleX
                  : placement.width,
              height:
                target.height && target.scaleY
                  ? target.height * target.scaleY
                  : placement.height,
              scaleX: 1,
              scaleY: 1,
            };
            const newElement = {
              ...element,
              placement: newPlacement,
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "image": {
          if (document.getElementById(element.properties.elementId) == null)
            continue;
          const imageElement = document.getElementById(
            element.properties.elementId,
          );
          if (!isHtmlImageElement(imageElement)) continue;
          // const filters = [];
          // if (element.properties.effect?.type === "blackAndWhite") {
          //   filters.push(new fabric.Image.filters.Grayscale());
          // }
          const imageObject = new fabric.CoverImage(imageElement, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
            // filters
            // @ts-ignore
            customFilter: element.properties.effect.type,
          });
          // imageObject.applyFilters();
          element.fabricObject = imageObject;
          element.properties.imageObject = imageObject;
          const image = {
            w: imageElement.naturalWidth,
            h: imageElement.naturalHeight,
          };

          imageObject.width = image.w;
          imageObject.height = image.h;
          imageElement.width = image.w;
          imageElement.height = image.h;
          imageObject.scaleToHeight(image.w);
          imageObject.scaleToWidth(image.h);
          const toScale = {
            x: element.placement.width / image.w,
            y: element.placement.height / image.h,
          };
          imageObject.scaleX = toScale.x * element.placement.scaleX;
          imageObject.scaleY = toScale.y * element.placement.scaleY;
          canvas.add(imageObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target != imageObject) return;
            const placement = element.placement;
            let fianlScale = 1;
            if (target.scaleX && target.scaleX > 0) {
              fianlScale = target.scaleX / toScale.x;
            }
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: fianlScale,
              scaleY: fianlScale,
            };
            const newElement = {
              ...element,
              placement: newPlacement,
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "emoji": {
          if (document.getElementById(element.properties.elementId) == null)
            continue;
          const imageElement = document.getElementById(
            element.properties.elementId,
          );
          if (!isHtmlImageElement(imageElement)) continue;
          // const filters = [];
          // if (element.properties.effect?.type === "blackAndWhite") {
          //   filters.push(new fabric.Image.filters.Grayscale());
          // }
          const imageObject = new fabric.CoverImage(imageElement, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
            // filters
            // @ts-ignore
            customFilter: element.properties.effect.type,
          });
          // imageObject.applyFilters();
          element.fabricObject = imageObject;
          element.properties.imageObject = imageObject;
          const image = {
            w: imageElement.naturalWidth,
            h: imageElement.naturalHeight,
          };

          imageObject.width = image.w;
          imageObject.height = image.h;
          imageElement.width = image.w;
          imageElement.height = image.h;
          imageObject.scaleToHeight(image.w);
          imageObject.scaleToWidth(image.h);
          const toScale = {
            x: element.placement.width / image.w,
            y: element.placement.height / image.h,
          };
          imageObject.scaleX = toScale.x * element.placement.scaleX;
          imageObject.scaleY = toScale.y * element.placement.scaleY;
          canvas.add(imageObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target != imageObject) return;
            const placement = element.placement;
            let fianlScale = 1;
            if (target.scaleX && target.scaleX > 0) {
              fianlScale = target.scaleX / toScale.x;
            }
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: fianlScale,
              scaleY: fianlScale,
            };
            const newElement = {
              ...element,
              placement: newPlacement,
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "audio": {
          break;
        }
        case "text": {
          const defaultTextAlign = "left";
          const textObject = new fabric.Textbox(element.properties.text, {
            name: element.id,
            left: element.placement.x,
            top: element.placement.y,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            width: element.placement.width,
            height: element.placement.height,
            angle: element.placement.rotation,
            fontSize: element.properties.fontSize,
            fontWeight: element.properties.fontWeight,
            // ["textAlign" as keyof fabric.Textbox]: defaultTextAlign,
            textAlign: element.properties.textAlign || defaultTextAlign,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
            fill: element.properties.fill || "#ffffff",
            //@ts-ignore
            backgroundColor: element.properties.backgroundColor,
            //@ts-ignore
            fontFamily: element.properties.fontFamily,
            //@ts-ignore
            underline: element.properties.underline,
            //@ts-ignore
            fontStyle: element.properties.fontStyle,
            // @ts-ignore
            fontWeight: element.properties.fontWeight,
          });
          element.fabricObject = textObject;
          canvas.add(textObject);
          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target != textObject) return;
            const placement = element.placement;
            const newPlacement: Placement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              width: target.width ?? placement.width,
              height: target.height ?? placement.height,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
            };
            const newElement: TextEditorElement = {
              ...element,
              placement: newPlacement,
              properties: {
                ...element.properties,
                // @ts-ignore
                text: target?.text,
                // @ts-ignore
                textAlign: target?.textAlign,
                // @ts-ignore
                fontSize: target?.fontSize,
                // @ts-ignore
                fill: target?.fill || "#ffffff",
                // @ts-ignore
                backgroundColor: target.backgroundColor,
                // @ts-ignore
                fontFamily: target.fontFamily,
                // @ts-ignore
                underline: target.underline,
                // @ts-ignore
                fontStyle: target.fontStyle,
                // @ts-ignore
                fontWeight: target.fontWeight,
              },
            };
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "icon": {
          fabric.loadSVGFromString(
            element.properties.path,
            (objects, options) => {
              const svgObject = fabric.util.groupSVGElements(objects, options);
              svgObject.set({
                left: element.placement.x,
                top: element.placement.y,
                scaleX: element.placement.scaleX,
                scaleY: element.placement.scaleY,
                angle: element.placement.rotation,
                fill: element.properties.fill,
                objectCaching: false,
                selectable: true,
                lockUniScaling: true,
              });

              element.fabricObject = svgObject;
              canvas.add(svgObject);

              canvas.on("object:modified", (e) => {
                if (!e.target) return;
                const target = e.target;
                if (target !== svgObject) return;

                const placement = element.placement;
                const newPlacement = {
                  ...placement,
                  x: target.left ?? placement.x,
                  y: target.top ?? placement.y,
                  rotation: target.angle ?? placement.rotation,
                  scaleX: target.scaleX ?? placement.scaleX,
                  scaleY: target.scaleY ?? placement.scaleY,
                };

                const newElement = {
                  ...element,
                  placement: newPlacement,
                  properties: {
                    ...element.properties,
                    fill: target.fill,
                  },
                };
                //@ts-ignore
                store.updateEditorElement(newElement);
              });
            },
          );
          break;
        }
        case "circle": {
          const circleObject = new fabric.Circle({
            radius: element.properties.radius,
            fill: element.properties.fill,
            left: element.placement.x,
            top: element.placement.y,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
          });

          element.fabricObject = circleObject;
          canvas.add(circleObject);

          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target !== circleObject) return;

            const placement = element.placement;
            const newPlacement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
            };

            const newElement = {
              ...element,
              placement: newPlacement,
              properties: {
                ...element.properties,
                //@ts-ignore
                radius: target.radius,
                fill: target.fill,
              },
            };
            //@ts-ignore
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "triangle": {
          const triangleObject = new fabric.Triangle({
            width: element.properties.sideLength,
            height: (Math.sqrt(3) / 2) * element.properties.sideLength,
            fill: element.properties.fill,
            left: element.placement.x,
            top: element.placement.y,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
          });

          element.fabricObject = triangleObject;
          canvas.add(triangleObject);

          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target !== triangleObject) return;

            const placement = element.placement;
            const newPlacement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
            };

            const newElement = {
              ...element,
              placement: newPlacement,
              properties: {
                ...element.properties,
                fill: target.fill,
              },
            };
            //@ts-ignore
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "square": {
          const squareObject = new fabric.Rect({
            width: element.properties.sideLength,
            height: element.properties.sideLength,
            fill: element.properties.fill,
            left: element.placement.x,
            top: element.placement.y,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
          });

          element.fabricObject = squareObject;
          canvas.add(squareObject);

          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target !== squareObject) return;

            const placement = element.placement;
            const newPlacement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
            };

            const newElement = {
              ...element,
              placement: newPlacement,
              properties: {
                ...element.properties,
                fill: target.fill,
              },
            };
            //@ts-ignore
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "line": {
          const lineObject = new fabric.Line(
            [
              element.properties.x1,
              element.properties.y1,
              element.properties.x2,
              element.properties.y2,
            ],
            {
              stroke: element.properties.stroke,
              strokeWidth: element.properties.strokeWidth,
              left: element.placement.x,
              top: element.placement.y,
              scaleX: element.placement.scaleX,
              scaleY: element.placement.scaleY,
              angle: element.placement.rotation,
              objectCaching: false,
              selectable: true,
              lockUniScaling: true,
            },
          );

          element.fabricObject = lineObject;
          canvas.add(lineObject);

          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target !== lineObject) return;

            const placement = element.placement;
            const newPlacement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
            };

            const newElement = {
              ...element,
              placement: newPlacement,
              properties: {
                ...element.properties,
                stroke: target.stroke,
                strokeWidth: target.strokeWidth,
              },
            };
            //@ts-ignore
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "hexagon": {
          const hexagonObject = new fabric.Polygon(
            [
              { x: 30, y: 0 },
              { x: 60, y: 15 },
              { x: 60, y: 45 },
              { x: 30, y: 60 },
              { x: 0, y: 45 },
              { x: 0, y: 15 },
            ],
            {
              fill: element.properties.fill,
              left: element.placement.x,
              top: element.placement.y,
              scaleX: element.placement.scaleX,
              scaleY: element.placement.scaleY,
              angle: element.placement.rotation,
              objectCaching: false,
              selectable: true,
              lockUniScaling: true,
            },
          );

          element.fabricObject = hexagonObject;
          canvas.add(hexagonObject);

          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target !== hexagonObject) return;

            const placement = element.placement;
            const newPlacement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
            };

            const newElement = {
              ...element,
              placement: newPlacement,
              properties: {
                fill: target.fill,
              },
            };
            //@ts-ignore
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "semiCircle": {
          const semiCircleObject = new fabric.Path(
            "M 0 0 A 50 50 0 1 0 100 0 Z",
            {
              fill: element.properties.fill,
              left: element.placement.x,
              top: element.placement.y,
              scaleX: element.placement.scaleX,
              scaleY: element.placement.scaleY,
              angle: element.placement.rotation,
              objectCaching: false,
              selectable: true,
              lockUniScaling: true,
            },
          );

          element.fabricObject = semiCircleObject;
          canvas.add(semiCircleObject);

          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target !== semiCircleObject) return;

            const placement = element.placement;
            const newPlacement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
            };

            const newElement = {
              ...element,
              placement: newPlacement,
              properties: {
                radius: element.properties.radius,
                fill: target.fill,
              },
            };
            //@ts-ignore
            store.updateEditorElement(newElement);
          });
          break;
        }
        case "parallelogram": {
          const points = [
            { x: 50, y: 0 },
            { x: 150, y: 0 },
            { x: 100, y: 100 },
            { x: 0, y: 100 },
          ];

          const parallelogramObject = new fabric.Polygon(points, {
            fill: element.properties.fill,
            left: element.placement.x,
            top: element.placement.y,
            scaleX: element.placement.scaleX,
            scaleY: element.placement.scaleY,
            angle: element.placement.rotation,
            objectCaching: false,
            selectable: true,
            lockUniScaling: true,
          });

          element.fabricObject = parallelogramObject;
          canvas.add(parallelogramObject);

          canvas.on("object:modified", function (e) {
            if (!e.target) return;
            const target = e.target;
            if (target !== parallelogramObject) return;

            const placement = element.placement;
            const newPlacement = {
              ...placement,
              x: target.left ?? placement.x,
              y: target.top ?? placement.y,
              rotation: target.angle ?? placement.rotation,
              scaleX: target.scaleX ?? placement.scaleX,
              scaleY: target.scaleY ?? placement.scaleY,
            };

            const newElement = {
              ...element,
              placement: newPlacement,
              properties: {
                fill: target.fill,
              },
            };
            //@ts-ignore
            store.updateEditorElement(newElement);
          });
          break;
        }
        default: {
          throw new Error("Not implemented");
        }
      }
      if (element.fabricObject) {
        element.fabricObject.on("selected", function (e) {
          store.setSelectedElement(element);
        });
      }
    }
    const selectedEditorElement = store.selectedElement;
    if (selectedEditorElement && selectedEditorElement.fabricObject) {
      canvas.setActiveObject(selectedEditorElement.fabricObject);
    }
    this.refreshAnimations();
    this.updateTimeTo(this.currentTimeInMs);
    store.canvas.renderAll();
  }

  pushMemento() {
    const currentElements = [...this.editorElements]; // Copy by value
    this.stack.push(new Memento(currentElements));
    this.currentIndex = this.stack.length - 1; // Update current position
  }

  undo() {
    if (this.canUndo()) {
      this.currentIndex = this.currentIndex - 1;
      const memento = this.stack[this.currentIndex];
      this.editorElements = memento ? memento.editorElements : [];
      this.updateSelectedElement();
      this.refreshElements();
      if (this.canvas) {
        this.canvas.renderAll(); // Update canvas after undo
      }
    }
  }

  redo() {
    if (this.canRedo()) {
      this.currentIndex++;
      const memento = this.stack[this.currentIndex];
      if (memento) {
        this.editorElements = memento.editorElements;
        this.updateSelectedElement();
        this.refreshElements();
        if (this.canvas) {
          this.canvas.renderAll(); // Update canvas after redo
        }
      }
    }
  }

  canUndo(): boolean {
    return this.currentIndex >= 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.stack.length - 1;
  }

  bringToFront(element: EditorElement): void {
    const activeObject = this.getFabricObject(element);
    if (!activeObject) return;

    if (!this.canvas) return;
    const objects = this.canvas.getObjects();
    this.canvas.moveTo(activeObject, objects.length - 1);
    this.canvas.renderAll();
    // Update editorElements list in the store
    const elementToUpdate = this.editorElements.find(
      (storeElement) => storeElement === element,
    ); // Assuming elements have direct equality comparison
    if (elementToUpdate) {
      const updatedElements = [...this.editorElements];
      const currentIndex = updatedElements.indexOf(elementToUpdate);
      updatedElements.splice(currentIndex, 1); // Remove from current position
      updatedElements.push(elementToUpdate); // Insert at the end
      this.editorElements = updatedElements;
      this.updateSelectedElement();
      this.refreshElements();
      this.pushMemento();
    }
  }

  bringForward(element: EditorElement): void {
    const activeObject = this.getFabricObject(element);
    if (!activeObject) return;
    if (!this.canvas) return;
    const objects = this.canvas.getObjects();
    const currentIndex = objects.indexOf(activeObject);
    if (currentIndex === objects.length - 1) return;

    this.canvas.moveTo(activeObject, currentIndex + 1);
    this.canvas.renderAll();
    // Update editorElements list in the store
    const elementToUpdate = this.editorElements.find(
      (storeElement) => storeElement === element,
    ); // Assuming elements have direct equality comparison
    if (elementToUpdate) {
      const updatedElements = [...this.editorElements];
      updatedElements.splice(currentIndex, 1); // Remove from current position
      updatedElements.splice(currentIndex + 1, 0, elementToUpdate); // Insert at new position
      this.editorElements = updatedElements;
      this.updateSelectedElement();
      this.refreshElements();
      this.pushMemento();
    }
  }

  sendToBack(element: EditorElement): void {
    const activeObject = this.getFabricObject(element);
    if (!activeObject) return;
    if (!this.canvas) return;
    this.canvas.moveTo(activeObject, 0);
    this.canvas.renderAll();
    // Update editorElements list in the store
    const elementToUpdate = this.editorElements.find(
      (storeElement) => storeElement === element,
    ); // Assuming elements have direct equality comparison
    if (elementToUpdate) {
      const updatedElements = [...this.editorElements];
      const currentIndex = updatedElements.indexOf(elementToUpdate);
      updatedElements.splice(currentIndex, 1); // Remove from current position
      updatedElements.unshift(elementToUpdate); // Insert at the beginning
      this.editorElements = updatedElements;
      this.updateSelectedElement();
      this.refreshElements();
      this.pushMemento();
    }
  }

  sendBackward(element: EditorElement): void {
    const activeObject = this.getFabricObject(element);
    if (!activeObject) return;
    if (!this.canvas) return;
    const objects = this.canvas.getObjects();
    const currentIndex = objects.indexOf(activeObject);
    if (currentIndex === 0) return;

    this.canvas.moveTo(activeObject, currentIndex - 1);
    this.canvas.renderAll();
    const elementToUpdate = this.editorElements.find(
      (storeElement) => storeElement === element,
    ); // Assuming elements have direct equality comparison
    if (elementToUpdate) {
      const updatedElements = [...this.editorElements];
      updatedElements.splice(currentIndex, 1); // Remove from current position
      updatedElements.splice(currentIndex - 1, 0, elementToUpdate); // Insert at new position
      this.editorElements = updatedElements;
      this.updateSelectedElement();
      this.refreshElements();
      this.pushMemento();
    }
  }

  private getFabricObject(element: EditorElement): fabric.Object | null {
    if (!element.fabricObject) return null;
    return element.fabricObject;
  }

  addIcon(svgPath: string, fillColor: string) {
    if (!this.canvas) return;

    fabric.loadSVGFromString(svgPath, (objects, options) => {
      const svgObject = fabric.util.groupSVGElements(objects, options);
      svgObject.set({
        left: 0,
        top: 0,
        fill: fillColor,
        objectCaching: false,
        selectable: true,
        lockUniScaling: true,
      });
      //@ts-ignore
      this.canvas.add(svgObject);

      const id = getUid();

      this.editorElements.push({
        id,
        name: `Media(Icon)`,
        type: "icon",
        fabricObject: svgObject,
        placement: {
          //@ts-ignore
          x: svgObject.left,
          //@ts-ignore
          y: svgObject.top,
          //@ts-ignore
          width: svgObject.width,
          //@ts-ignore
          height: svgObject.height,
          //@ts-ignore
          scaleX: svgObject.scaleX,
          //@ts-ignore
          scaleY: svgObject.scaleY,
          rotation: 0,
        },
        properties: {
          path: svgPath,
          fill: fillColor,
        },
        timeFrame: { start: 0, end: this.maxTime },
      });

      this.refreshElements();
    });
  }

  addCircle() {
    if (!this.canvas) return;

    const circle = new fabric.Circle({
      radius: 50,
      fill: `rgba(255,255,255,1)`,
      left: 0,
      top: 0,
      scaleX: 1,
      scaleY: 1,
      selectable: true,
      objectCaching: false,
      lockUniScaling: true,
    });

    this.canvas.add(circle);

    const id = getUid();
    const index = this.editorElements.length;
    this.addEditorElement({
      id,
      name: `Media(Circle) ${index + 1}`,
      type: "circle",
      fabricObject: circle,
      placement: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
      },
      properties: {
        radius: 50,
        fill: `rgba(255,255,255,1)`,
      },
      timeFrame: { start: 0, end: this.maxTime },
    });
  }

  addTriangle() {
    if (!this.canvas) return;

    const sideLength = 100;
    const triangle = new fabric.Triangle({
      width: sideLength,
      height: (Math.sqrt(3) / 2) * sideLength,
      fill: `rgba(255,255,255,1)`,
      left: 0,
      top: 0,
      scaleX: 1,
      scaleY: 1,
      selectable: true,
      objectCaching: false,
      lockUniScaling: true,
    });

    this.canvas.add(triangle);

    const id = getUid();

    this.editorElements.push({
      id,
      name: `Media(Triangle)`,
      type: "triangle",
      fabricObject: triangle,
      placement: {
        //@ts-ignore
        x: triangle.left,
        //@ts-ignore
        y: triangle.top,
        //@ts-ignore
        width: triangle.width,
        //@ts-ignore
        height: triangle.height,
        //@ts-ignore
        scaleX: triangle.scaleX,
        //@ts-ignore
        scaleY: triangle.scaleY,
        rotation: 0, // default rotation
      },
      properties: {
        sideLength,
        //@ts-ignore
        fill: triangle.fill || `rgba(255,255,255,1)`,
      },
      timeFrame: { start: 0, end: this.maxTime },
    });

    this.refreshElements();
  }

  addSquare() {
    if (!this.canvas) return;

    const sideLength = 100;
    const square = new fabric.Rect({
      width: sideLength,
      height: sideLength,
      fill: `rgba(255,255,255,1)`,
      left: 0,
      top: 0,
      scaleX: 1,
      scaleY: 1,
      selectable: true,
      objectCaching: false,
      lockUniScaling: true,
    });

    this.canvas.add(square);

    const id = getUid();

    this.editorElements.push({
      id,
      name: `Media(Square)`,
      type: "square",
      fabricObject: square,
      placement: {
        //@ts-ignore
        x: square.left,
        //@ts-ignore
        y: square.top,
        //@ts-ignore
        width: square.width,
        //@ts-ignore
        height: square.height,
        //@ts-ignore
        scaleX: square.scaleX,
        //@ts-ignore
        scaleY: square.scaleY,
        rotation: 0, // default rotation
      },
      properties: {
        sideLength,
        //@ts-ignore
        fill: square.fill || `rgba(255,255,255,1)`,
      },
      timeFrame: { start: 0, end: this.maxTime },
    });

    this.refreshElements();
  }

  addLine() {
    if (!this.canvas) return;

    const line = new fabric.Line([50, 50, 200, 200], {
      stroke: `rgba(255,255,255,1)`,
      strokeWidth: 2,
      selectable: true,
      objectCaching: false,
      lockUniScaling: true,
    });

    this.canvas.add(line);

    const id = getUid();

    this.editorElements.push({
      id,
      name: `Media(Line)`,
      type: "line",
      fabricObject: line,
      placement: {
        //@ts-ignore
        x: line.left,
        //@ts-ignore
        y: line.top,
        //@ts-ignore
        width: line.width,
        //@ts-ignore
        height: line.height,
        //@ts-ignore
        scaleX: line.scaleX,
        //@ts-ignore
        scaleY: line.scaleY,
        rotation: 0, // default rotation
      },
      properties: {
        //@ts-ignore
        x1: line.x1,
        //@ts-ignore
        y1: line.y1,
        //@ts-ignore
        x2: line.x2,
        //@ts-ignore
        y2: line.y2,
        stroke: line.stroke || `rgba(255,255,255,1)`,
        //@ts-ignore
        strokeWidth: line.strokeWidth,
      },
      timeFrame: { start: 0, end: this.maxTime },
    });

    this.refreshElements();
  }

  addHexagon() {
    if (!this.canvas) return;

    const hexagon = new fabric.Polygon(
      [
        { x: 30, y: 0 },
        { x: 60, y: 15 },
        { x: 60, y: 45 },
        { x: 30, y: 60 },
        { x: 0, y: 45 },
        { x: 0, y: 15 },
      ],
      {
        fill: `rgba(255,255,255,1)`,
        left: 0,
        top: 0,
        scaleX: 1,
        scaleY: 1,
        selectable: true,
        objectCaching: false,
        lockUniScaling: true,
      },
    );

    this.canvas.add(hexagon);

    const id = getUid();

    this.editorElements.push({
      id,
      name: `Media(Hexagon)`,
      type: "hexagon",
      fabricObject: hexagon,
      placement: {
        //@ts-ignore
        x: hexagon.left,
        //@ts-ignore
        y: hexagon.top,
        width: 60,
        height: 60,
        //@ts-ignore
        scaleX: hexagon.scaleX,
        //@ts-ignore
        scaleY: hexagon.scaleY,
        rotation: 0, // default rotation
      },
      properties: {
        //@ts-ignore
        fill: hexagon.fill || `rgba(255,255,255,1)`,
      },
      timeFrame: { start: 0, end: this.maxTime },
    });

    this.refreshElements();
  }

  addSemiCircle() {
    if (!this.canvas) return;

    const semiCircle = new fabric.Path("M 0 0 A 50 50 0 1 0 100 0 Z", {
      fill: "rgba(255,255,255,1)",
      left: 0,
      top: 0,
      scaleX: 1,
      scaleY: 1,
      selectable: true,
      objectCaching: false,
      lockUniScaling: true,
    });

    this.canvas.add(semiCircle);

    const id = getUid();

    this.editorElements.push({
      id,
      name: `Media(SemiCircle)`,
      type: "semiCircle",
      fabricObject: semiCircle,
      placement: {
        //@ts-ignore
        x: semiCircle.left,
        //@ts-ignore
        y: semiCircle.top,
        //@ts-ignore
        width: semiCircle.width,
        //@ts-ignore
        height: semiCircle.height,
        //@ts-ignore
        scaleX: semiCircle.scaleX,
        //@ts-ignore
        scaleY: semiCircle.scaleY,
        rotation: semiCircle.angle || 0,
      },
      properties: {
        radius: 50,
        //@ts-ignore
        fill: semiCircle.fill || `rgba(255,255,255,1)`,
      },
      timeFrame: { start: 0, end: this.maxTime },
    });

    this.refreshElements();
  }

  addParallelogram() {
    if (!this.canvas) return;

    // Define the points for a parallelogram
    const points = [
      { x: 50, y: 0 },
      { x: 150, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ];

    const parallelogram = new fabric.Polygon(points, {
      fill: `rgba(255,255,255,1)`,
      left: 0,
      top: 0,
      scaleX: 1,
      scaleY: 1,
      selectable: true,
      objectCaching: false,
      lockUniScaling: true,
    });

    this.canvas.add(parallelogram);

    const id = getUid();

    this.editorElements.push({
      id,
      name: `Media(Parallelogram)`,
      type: "parallelogram",
      fabricObject: parallelogram,
      placement: {
        //@ts-ignore
        x: parallelogram.left,
        //@ts-ignore
        y: parallelogram.top,
        //@ts-ignore
        width: parallelogram.width,
        //@ts-ignore
        height: parallelogram.height,
        //@ts-ignore
        scaleX: parallelogram.scaleX,
        //@ts-ignore
        scaleY: parallelogram.scaleY,
        //@ts-ignore
        rotation: parallelogram.angle, // default rotation
      },
      properties: {
        //@ts-ignore
        width: parallelogram.width,
        //@ts-ignore
        height: parallelogram.height,
        //@ts-ignore
        fill: parallelogram.fill || `rgba(255,255,255,1)`,
      },
      timeFrame: { start: 0, end: this.maxTime },
    });

    this.refreshElements();
  }

  // Properties for copy-paste
  copiedElement = null;

  // Copy the selected element
  copy() {
    if (this.selectedElement) {
      //@ts-ignore
      this.copiedElement = { ...this.selectedElement }; // Deep copy the selected element
    }
  }

  // Paste the copied element
  paste() {
    if (this.copiedElement) {
      //@ts-ignore
      const newElement = { ...this.copiedElement, id: this.generateUniqueId() }; // Ensure the new element has a unique ID
      this.editorElements.push(newElement);
      this.pushState({ editorElements: [...this.editorElements] });
      this.updateSelectedElement();
      this.refreshElements();
      if (this.canvas) {
        this.canvas.renderAll();
      }
    }
  }

  // Push the current state to the stack for undo/redo functionality
  pushState(newState: any) {
    if (this.currentIndex < this.stack.length - 1) {
      this.stack = this.stack.slice(0, this.currentIndex + 1);
    }
    this.stack.push(newState);
    this.currentIndex = this.stack.length - 1;
  }

  // Helper method to generate unique IDs for elements
  generateUniqueId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }

  updateProps(key: string, value: unknown) {
    const selectedElement = this.selectedElement;
    updateProps(selectedElement, key, value);
  }
}

export function isEditorAudioElement(
  element: EditorElement,
): element is AudioEditorElement {
  return element.type === "audio";
}
export function isEditorVideoElement(
  element: EditorElement,
): element is VideoEditorElement {
  return element.type === "video";
}

export function isEditorImageElement(
  element: EditorElement,
): element is ImageEditorElement {
  return element.type === "image";
}
export function isEditorEmojiElement(
  element: EditorElement,
): element is EmojiEditorElement {
  return element.type === "emoji";
}

export function isEditorCircleElement(
  element: EditorElement,
): element is CircleEditorElement {
  return element.type === "circle";
}
export function isEditorTriangleelement(
  element: EditorElement,
): element is TriangleEditorElement {
  return element.type === "triangle";
}
export function isEditorSquareelement(
  element: EditorElement,
): element is SquareEditorElement {
  return element.type === "square";
}
export function isEditorLineelement(
  element: EditorElement,
): element is LineEditorElement {
  return element.type === "line";
}

export function isEditorHexagonelement(
  element: EditorElement,
): element is HexagonEditorElement {
  return element.type === "hexagon";
}

export function isEditorSemiCircleelement(
  element: EditorElement,
): element is SemiCircleEditorElement {
  return element.type === "semiCircle";
}

export function isEditorParallelogramelement(
  element: EditorElement,
): element is ParallelogramEditorElement {
  return element.type === "parallelogram";
}

export function isEditorIconelement(
  element: EditorElement,
): element is IconEditorElement {
  return element.type === "icon";
}

function getTextObjectsPartitionedByCharacters(
  textObject: fabric.Text,
  element: TextEditorElement,
): fabric.Text[] {
  let copyCharsObjects: fabric.Text[] = [];
  // replace all line endings with blank
  const characters = (textObject.text ?? "")
    .split("")
    .filter((m) => m !== "\n");
  const charObjects = textObject.__charBounds;
  if (!charObjects) return [];
  const charObjectFixed = charObjects
    .map((m, index) => m.slice(0, m.length - 1).map((m) => ({ m, index })))
    .flat();
  const lineHeight = textObject.getHeightOfLine(0);
  for (let i = 0; i < characters.length; i++) {
    if (!charObjectFixed[i]) continue;
    const { m: charObject, index: lineIndex } = charObjectFixed[i];
    const char = characters[i];
    const scaleX = textObject.scaleX ?? 1;
    const scaleY = textObject.scaleY ?? 1;
    const charTextObject = new fabric.Text(char, {
      left: charObject.left * scaleX + element.placement.x,
      scaleX: scaleX,
      scaleY: scaleY,
      top: lineIndex * lineHeight * scaleY + element.placement.y,
      fontSize: textObject.fontSize,
      fontWeight: textObject.fontWeight,
      fill: "#fff",
    });
    copyCharsObjects.push(charTextObject);
  }
  return copyCharsObjects;
}
