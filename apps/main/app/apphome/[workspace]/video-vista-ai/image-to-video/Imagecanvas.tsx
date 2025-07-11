/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import BgColorButton from "./BgColorButton";
import TextColorButton from "./TextColorButton";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import useFont from "@nyx-frontend/main/hooks/useFont";

interface FabricEditorProps {
  imageUrl: string;
  titleline: string;
  titleSetText: React.Dispatch<any>;
}

type TTextObject = {
  fontStyle?: "italic" | "normal";
  fontWeight?: "bold" | "normal";
  fontSize?: number;
  fill?: string;
  text?: string;
  backgroundColor?: string;
  fontFamily?: string;
};

const textProperties: TTextObject = {
  fontWeight: "normal",
  fontStyle: "normal",
  fontSize: 20,
  fill: "black",
};

const Imagecanvas: React.FC<FabricEditorProps> = ({
  imageUrl,
  titleline,
  titleSetText,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [undoStack, setUndoStack] = useState<fabric.Object[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const [currentColor, setCurrentColor] = useState<any>(textProperties.fill);
  const fonts = useFont();
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState<string>("transparent");
  const [currentFontFamily, setCurrentFontFamily] = useState<string>("Arial");
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(
    null
  );
  const [currentTextColor, setCurrentTextColor] = useState<any>(
    textProperties.fill
  );

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current!, {});
    fabricCanvas.on("text:changed", onTextChange);
    fabricCanvas.on("selection:created", updateSelectedObject);
    fabricCanvas.on("selection:updated", updateSelectedObject);
    fabricCanvas.on("selection:cleared", () => setSelectedObject(null));
    setCanvas(fabricCanvas);

    return () => {
      // Clean up fabric.js canvas when the component is unmounted
      fabricCanvas.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBlob = async (url: string) => {
    const image = await axios(`/api/image/${url}`);
    const uri = `data:image/jpeg;base64,${image.data}`;

    fabric.Image.fromURL(`${uri}`, (img) => {
      const targetWidth = 450;
      const targetHeight = 450;

      if (canvas) {
        canvas.setWidth(targetWidth);
        canvas.setHeight(targetHeight);

        img.scaleToWidth(canvas.getWidth());
        img.scaleToHeight(canvas.getHeight());
        img.selectable = false;
        canvas.add(img).renderAll();
      }

      // Update undoStack when a new background image is added
      setUndoStack([...undoStack, img]);
    });
  };

  useEffect(() => {
    if (canvas && imageUrl) {
      fetchBlob(imageUrl);
    }
  }, [canvas, imageUrl]);

  useEffect(() => {
    if (canvas && logoFile) {
      fabric.Image.fromURL(URL.createObjectURL(logoFile), (img) => {
        img.set({ left: 100, top: 100, scaleX: 0.5, scaleY: 0.5 });
        canvas.add(img);
        canvas.renderAll();

        // Update undoStack when a new logo is added
        setUndoStack([...undoStack, img]);
      });
    }
  }, [canvas, logoFile]);

  const onChangeBackgroundColor = (value: string) => {
    const activeObject = canvas?.getActiveObject() as fabric.Object &
      Pick<TTextObject, "backgroundColor">;
    if (activeObject?.type === "i-text") {
      setProp(activeObject, "backgroundColor", value);
      setCurrentBackgroundColor(value);
    }
  };

  const onTextChange = (e: any) => {
    titleSetText(e?.target?.text);
  };

  const handleLogoUpload = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      if (logoInputRef.current) {
        logoInputRef.current.value = "";
      }
      // Update undoStack when a logo is added
      if (canvas) {
        // @ts-ignore
        const newLogo = new fabric.Image();
        canvas.add(newLogo).renderAll();
        setUndoStack([...undoStack, newLogo]);
      }
    }
  };

  const addText = () => {
    if (canvas) {
      const text = titleline || "Type here";
      console.log(text);
      const newText = new fabric.IText(text, {
        ...textProperties,
        left: 50,
        top: 50,
      });

      canvas.add(newText).renderAll();
      canvas.setActiveObject(newText);
      setUndoStack([...undoStack, newText]);
    }
  };

  const setProp = (active: fabric.Object, name: string, value: any): void => {
    active.set({ [name]: value, dirty: true });
    canvas?.renderAll();
  };

  const onChangeTextColor = (value: string) => {
    const activeObject = canvas?.getActiveObject() as fabric.Object &
      Pick<TTextObject, "fill">;
    if (activeObject?.type === "i-text") {
      setProp(activeObject, "fill", value);
      setCurrentColor(value);
    }
  };

  const toggleBold = () => {
    const activeObject = canvas?.getActiveObject() as fabric.Object &
      Pick<TTextObject, "fontWeight">;
    if (activeObject?.type === "i-text") {
      const isBold = activeObject["fontWeight"] === "bold";
      const value = isBold ? "normal" : "bold";
      setProp(activeObject, "fontWeight", value);
    }
  };

  const toggleItalic = () => {
    const activeObject = canvas?.getActiveObject() as fabric.Object &
      Pick<TTextObject, "fontStyle">;
    if (activeObject?.type === "i-text") {
      const isItalic = activeObject["fontStyle"] === "italic";
      const value = isItalic ? "normal" : "italic";
      setProp(activeObject, "fontStyle", value);
    }
  };

  const updateSelectedObject = () => {
    const activeObject: any = canvas?.getActiveObject();
    setSelectedObject(activeObject);
    if (activeObject?.type === "i-text") {
      setCurrentTextColor(activeObject.fill as string);
      setCurrentBackgroundColor(activeObject.backgroundColor as string);
      setCurrentFontFamily(activeObject.fontFamily as string);
    }
  };
  const onChangeFontFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const activeObject = canvas?.getActiveObject() as fabric.Object &
      Pick<TTextObject, "fontFamily">;
    if (activeObject?.type === "i-text") {
      setProp(activeObject, "fontFamily", e.target.value);
      setCurrentFontFamily(e.target.value);
    }
  };

  /**
   * Increase Font Size with `+2`
   */
  const increaseFontSize = () => {
    updateFontSize(+2);
  };

  /**
   * Decrease Font Size with `-2`, minimum `8` Pixel
   */
  const decreaseFontSize = () => {
    updateFontSize(-2);
  };

  /**
   * Update font size based on size, minimum `8` Pixel
   * @param size number
   */
  const updateFontSize = (size: number) => {
    const activeObject: any = canvas?.getActiveObject() as fabric.Object &
      Pick<TTextObject, "fontSize">;
    if (activeObject?.type === "i-text") {
      const value = Math.max(8, activeObject["fontSize"] + size);
      setProp(activeObject, "fontSize", value);
    }
  };

  const undo = () => {
    if (canvas && undoStack.length > 0) {
      const lastObject: any = undoStack.pop();
      canvas.remove(lastObject);
      canvas.renderAll();
      setUndoStack([...undoStack]);
    }
  };

  const saveAndDownload = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
      });

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "edited_image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (canvas) {
      const activeObject = canvas.getActiveObject() as fabric.Object &
        Pick<TTextObject, "text">;
      if (activeObject?.type === "i-text") {
        setProp(activeObject, "text", titleline);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, titleline]);

  return (
    <div className="editor-container">
      <div className="editor-buttons min-w-[500px] text-white flex justify-between bg-black mb-2.5 rounded-md px-1 py-2.5">
        <button
          onClick={addText}
          data-tooltip-id="editor-tooltip"
          data-tooltip-content="add text box"
          className="pl-1"
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-current text-white w-6"
          >
            <path d="M3 18h7v1H2V2h17v7h-1V3H3zm15.917 0h-4.834l-1.756 4h-1.093l4.808-10.951h.916L21.766 22h-1.093zm-.439-1L16.5 12.494 14.522 17z" />
            <path fill="none" d="M0 0h24v24H0z" />
          </svg>
          <span className="sr-only">add text box</span>
        </button>
        <BgColorButton onChange={onChangeBackgroundColor} />
        <TextColorButton onChange={onChangeTextColor} />

        <button
          onClick={toggleBold}
          data-tooltip-id="editor-tooltip"
          data-tooltip-content="Text Bold"
        >
          B <span className="sr-only">Text Blod</span>
        </button>
        <button
          onClick={toggleItalic}
          data-tooltip-id="editor-tooltip"
          data-tooltip-content="Text Italic"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
          >
            <path
              d="M0.75 11.25V9.375H3.75L6 2.625H3V0.75H10.5V2.625H7.875L5.625 9.375H8.25V11.25H0.75Z"
              fill="white"
            />
          </svg>
          <span className="sr-only">Text Italic</span>
        </button>
        <select
          value={currentFontFamily}
          onChange={onChangeFontFamily}
          className="text-white w-24 appearance-none bg-transparent border border-white/40 px-1 rounded text-sm"
        >
          {fonts.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
        <button
          onClick={increaseFontSize}
          data-tooltip-id="editor-tooltip"
          data-tooltip-content="Text Size Increase"
        >
          A+
        </button>
        <button
          onClick={decreaseFontSize}
          data-tooltip-id="editor-tooltip"
          data-tooltip-content="Text Size Decrease"
        >
          A-
        </button>
        {/* Hidden file input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="logoInput"
          ref={logoInputRef}
          style={{ display: "none" }}
        />
        <button
          onClick={undo}
          title="Undo"
          data-tooltip-id="editor-tooltip"
          data-tooltip-content="Undo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 fill-current"
          >
            <path
              fillRule="evenodd"
              d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={handleLogoUpload}
          data-tooltip-id="editor-tooltip"
          data-tooltip-content="Upload Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={saveAndDownload}
          data-tooltip-id="editor-tooltip"
          data-tooltip-content="Download Image"
          className="pr-1.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="editor-canvas">
        <canvas ref={canvasRef} className="size-full " />
      </div>
      <Tooltip id="editor-tooltip" />
    </div>
  );
};

export default Imagecanvas;
