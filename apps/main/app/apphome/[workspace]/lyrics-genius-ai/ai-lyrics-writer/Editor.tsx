/* eslint-disable @next/next/no-img-element */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { VECTORS } from "@nyx-frontend/main/utils/utils";
import { useContext, useEffect, useRef, useState } from "react";
import { EDITOR_JS_TOOLS } from "./tools";
import { useMutation } from "@tanstack/react-query";
import { getClosestSong, saveNotePad } from "@nyx-frontend/main/services/uploadService";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { OPEN_FILE, SAVE_AS } from "@nyx-frontend/main/utils/modalstyles";
import { toast } from "react-toastify";
import classNames from "@nyx-frontend/main/utils/classNames";
import Image from "next/image";

export default function Editor(props: any) {
  const [show, setshow] = useState(true);
  const [isHovered, setHovered] = useState(false); // Hover state for filename
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editorcontent, seteditorcontent] = useState("");
  const defaultText = `<div><h3 style="color: white; font-style: italic;">${props.data[currentIndex].content} </h3></div>`;
  const [activeBold, setActiveBold] = useState(false);
  const quillRef = useRef<any>(null);
  const [retrieveLyrics, setLyrics] = useState("");
  const [triggerClosestSong, setTriggerClosestSong] = useState(false);
  const { setModalConfig, setHoveredFileMenu, hoverFileMenu } =
    useContext(UseContextData);
  const [title, setTitle] = useState("file");
  const [padId, setPadId] = useState(null);

  const mutateProcessNotePad = useMutation({
    mutationKey: ["save-notepad"],
    mutationFn: saveNotePad,
  });

  const mutateProcessClosestSong = useMutation({
    mutationKey: ["closest-song"],
    mutationFn: getClosestSong,
  });

  useEffect(() => {
    const divElement: any = document.getElementById("trackedDiv");
    divElement?.addEventListener("click", handleClick);

    return () => {
      // Cleanup: remove event listener when the component is unmounted
      divElement?.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e: any) => {
    const divElement: any = document.getElementById("testDiv");

    if (divElement) {
      // Check if the click event occurred inside the testDiv
      if (divElement.contains(e.target)) {
        // Clicked inside testDiv, do nothing or handle accordingly
      } else {
        // Clicked outside testDiv, setTriggerClosestSong to false
        setTriggerClosestSong(false);
      }
    }
  };

  const saveNote = async () => {
    if (editorcontent.length == 0) {
      toast.error("Enter text in notepad");
    } else {
      if (title != "file") {
        let payload = {
          operation: "SAVE_FILE",
          title: props.data[currentIndex].title,
          content: editorcontent,
          formatting: {},
        };
        mutateProcessNotePad.mutate(payload, {
          onSuccess: async (response: any) => {
            props.onAction();
          },
          onError: (errorResponse: any) => {},
        });
        toast.success("successfully saved");
      } else {
        let handler = {
          data: editorcontent,
          onClose: closeSaveAs,
          type: "save_whole_file",
          title: "filename",
          padId: padId,
        };
        setModalConfig(SAVE_AS(handler));
      }
    }
    // let payload = {
    //   operation: "SAVE_FILE",
    //   title: props.data[currentIndex].title,
    //   content: editorcontent,
    //   formatting: {},
    // };
    // mutateProcessNotePad.mutate(payload, {
    //   onSuccess: async (response: any) => {
    //     props.onAction();
    //   },
    //   onError: (errorResponse: any) => {},
    // });
    // toast.success("successfully saved");
  };

  const openFilePopUp = () => {
    let handler = {
      onClose: closeModal,
      data: props.data,
    };
    setModalConfig(OPEN_FILE(handler));
  };

  const closeModal = (data: any) => {
    const editorContextValue: any = isEmptyContent(data.content)
      ? ""
      : data.content;
    seteditorcontent(editorContextValue);
    setTitle(data.title);
    setPadId(data.padId);
  };

  const action = (operation: any) => {};

  const isEmptyContent = (html: any) => {
    const cleanedHtml = html.replace(/<[^>]*>/g, ""); // Remove HTML tags
    setLyrics(cleanedHtml);
    return cleanedHtml.trim() === "";
  };

  const downLoadFile = () => {
    if (title != "file") {
      const blob = new Blob([retrieveLyrics], { type: "text/plain" });
      const url = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");
      link.href = url;

      // Set the filename for the download
      link.download = props.data[currentIndex].title;

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger the click event on the link
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    } else {
      toast.error("No file selected!");
    }
  };

  const [closestSongs, setClosestSongs] = useState<any>([]);

  const getClosestSongs = () => {
    setHovered(false);

    if (retrieveLyrics.length != 0) {
      let payload: any = {
        generateType: "CLOSEST_SONG",
        lyrics: retrieveLyrics,
      };

      mutateProcessClosestSong.mutate(payload, {
        onSuccess: async (response: any) => {
          response.output.forEach((res: any) => {
            res.flag = false;
          });
          setClosestSongs(response.output);
          setTriggerClosestSong(true);

          if (response.output.length == 0) {
            setTimeout(() => {
              setClosestSongs([]);
              setTriggerClosestSong(false);
            }, 3000);
          }
          // console.log(response);
        },
        onError: (errorResponse: any) => {
          setTimeout(() => {
            setClosestSongs([]);
            setTriggerClosestSong(false);
          }, 3000);
        },
      });
    }
  };

  const dateFormat = (date: any) => {
    return date.split("-")[2];
  };

  const openFile = () => {
    openFilePopUp();
  };

  const openAs = () => {
    if (editorcontent.length != 0) {
      let handler = {
        data: editorcontent,
        onClose: closeSaveAs,
        type: "save_whole_file",
        title: "filename",
        padId: padId,
      };
      setModalConfig(SAVE_AS(handler));
    } else {
      toast.error("Enter text in notepad");
    }
  };

  const saveTitleAs = (name: any) => {
    let handler = {
      data: editorcontent,
      onClose: closeSaveAs,
      type: "editTitle",
      title: name,
      padId: padId,
    };
    setModalConfig(SAVE_AS(handler));
  };

  const closeSaveAs = (data: any) => {
    seteditorcontent(data.content);
    setTitle(data.title);
    props.onAction();
  };

  const deleteFile = () => {
    if (title != "file") {
      seteditorcontent("");
      let payload = {
        operation: "DELETE_FILE",
        title: props.data[currentIndex].title,
        content: editorcontent,
        formatting: {},
      };
      mutateProcessNotePad.mutate(payload, {
        onSuccess: async (response: any) => {
          props.onAction();
          setTitle("file");
          toast.success("Deleted file successfully");
        },
        onError: (errorResponse: any) => {},
      });
    } else {
      toast.error("No file selected!");
    }
  };
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const onEditFile = (name: any) => {
    setTitle(name);
    if (name.length >= 4) {
      let payload = {
        operation: "SAVE_FILE",
        title: name,
        content: editorcontent,
        formatting: {},
        padId: padId,
      };
      mutateProcessNotePad.mutate(payload, {
        onSuccess: async (response: any) => {
          props.onAction();
        },
        onError: (errorResponse: any) => {},
      });
    }
  };

  const handleClickInsideQuill = () => {
    setOpen(false);
  };
  const toggleShowMore = (index: any) => {
    closestSongs[index].flag = !closestSongs[index].flag;
    setClosestSongs([...closestSongs]);
  };
  return (
    <>
      <div
        className="relative overflow-hidden"
        onMouseLeave={(e) => {
          setHoveredFileMenu(false);
        }}
      >
        <div className="bg-black h-12 px-3 rounded-tr-lg rounded-tl-lg">
          <div className="flex justify-between gap-5 h-full">
            <div
              id="title"
              className="w-[50%] flex gap-1 items-center"
              onMouseEnter={(e: any) => {
                setHoveredFileMenu(e.target.id == "title");
                // setHoveredFileMenu()
              }}
            >
              <p
                onClick={() => {
                  if (title != "file") {
                    setOpen(!open);
                  }
                }}
                className="text-white font-semibold cursor-pointer"
              >
                {title}
              </p>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
                className={classNames(
                  "origin-center transition-transform fill-white",
                  isHovered ? "rotate-180" : "",
                )}
              >
                <path d="M11.8155 5.07578L7.14887 9.28828C7.09332 9.33828 7.03313 9.37361 6.96832 9.39428C6.9035 9.41528 6.83406 9.42578 6.75998 9.42578C6.68591 9.42578 6.61646 9.41528 6.55165 9.39428C6.48684 9.37361 6.42665 9.33828 6.37109 9.28828L1.69054 5.07578C1.56091 4.95911 1.49609 4.81328 1.49609 4.63828C1.49609 4.46328 1.56554 4.31328 1.70443 4.18828C1.84332 4.06328 2.00535 4.00078 2.19054 4.00078C2.37572 4.00078 2.53776 4.06328 2.67665 4.18828L6.75998 7.86328L10.8433 4.18828C10.9729 4.07161 11.1326 4.01328 11.3222 4.01328C11.5122 4.01328 11.6766 4.07578 11.8155 4.20078C11.9544 4.32578 12.0239 4.47161 12.0239 4.63828C12.0239 4.80495 11.9544 4.95078 11.8155 5.07578Z" />
              </svg>
            </div>
            <div
              className="flex items-center w-[50%] justify-end gap-3"
              onMouseEnter={() => setHoveredFileMenu(false)}
            >
              <button
                className={classNames(
                  `border p-[5px] text-xs rounded-md font-normal`,
                  retrieveLyrics.length == 0
                    ? "border-nyx-gray-1 text-nyx-gray-1"
                    : "border-white text-white",
                )}
                onClick={() => {
                  if (triggerClosestSong) {
                    setTriggerClosestSong(false);
                  } else {
                    getClosestSongs();
                  }
                }}
              >
                Closest Song
              </button>
            </div>
          </div>
        </div>
        <div
          id="testDiv"
          className={`absolute w-[21rem] right-0 top-[5.6rem] h-[83.5%] z-[10] bg-[#22184C] text-white overflow-y-scroll transform transition-transform ${
            triggerClosestSong ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="ml-6 md:ml-3 pt-4 pb-3 cursor-pointer">
            <svg
              onClick={() => {
                setTriggerClosestSong(false);
              }}
              width="17"
              height="13"
              viewBox="0 0 17 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.9562 7.29538L8.764 12.7761C8.10576 13.2777 7.15789 12.8083 7.15789 11.9807L7.15789 10.5682C7.15789 10.0159 6.71018 9.56818 6.15789 9.56818L0.999998 9.56818C0.447714 9.56818 -1.48077e-06 9.12047 -1.43248e-06 8.56818L-1.07087e-06 4.43182C-1.02259e-06 3.87953 0.447715 3.43182 0.999999 3.43182L6.15789 3.43182C6.71018 3.43182 7.15789 2.9841 7.15789 2.43182L7.15789 1.01929C7.15789 0.191713 8.10576 -0.277694 8.764 0.223906L15.9562 5.70462C16.4814 6.10483 16.4814 6.89517 15.9562 7.29538Z"
                fill="white"
              />
            </svg>
          </div>

          {closestSongs.length == 0 ? (
            <div className="ml-3">
              <p className="pl-4 md:pl-2 font-[300] pb-4">
                No Results Found!!!
              </p>

              <p className="pl-4 md:pl-2 font-[300] pb-3">
                Please write few more lines, so that AI can suggest you the
                closest song
              </p>

              <p className="pl-4 md:pl-2 font-[300]">Or</p>

              <p className="pl-4d md:pl-2 font-[300]">
                {" "}
                Its&apos;s a masterpiece. :{" "}
              </p>
            </div>
          ) : (
            <div>
              {closestSongs.map((response: any, index: any) => {
                return (
                  <div
                    key={index}
                    className={`border-b-[1px] pb-4 m-auto w-[98%]`}
                  >
                    <p className="text-white m-auto w-[95%] mt-1">
                      Closest Song {index + 1}
                    </p>
                    <div className="bg-[#650B92] m-auto w-[95%] p-[2px]">
                      <p className="text-white overflow-hidden overflow-ellipsis m-auto w-[95%] mt-1 text-[13px] font-[300]">
                        {response.lyrics.length > 40 ? (
                          <span
                            className=" cursor-pointer"
                            onClick={() => toggleShowMore(index)}
                          >
                            {!response.flag ? (
                              <>
                                {" "}
                                {response.lyrics.slice(0, 40)} <em></em>
                                <span className="text-white underline">
                                  See More
                                </span>
                              </>
                            ) : (
                              <>
                                {response.lyrics} <em></em>
                                <span className="text-white underline">
                                  Hide
                                </span>
                              </>
                            )}
                          </span>
                        ) : (
                          response.lyrics
                        )}
                      </p>
                    </div>
                    <p className="text-white m-auto w-[95%] mt-1 text-[13px] font-[300]">
                      Movie / Album Name : {response.album_name}
                    </p>
                    <p className="text-white m-auto w-[95%] mt-1 text-[13px] font-[300]">
                      Year : {new Date(response.date).getFullYear()}
                    </p>
                    <p className="text-white m-auto w-[95%] mt-1 text-[13px] font-[300]">
                      Song Name : {response.song_name}
                    </p>
                    {/* <p className="text-white m-auto w-[95%] mt-1 text-[13px] font-[300]">
                      Year : {dateFormat(response.date)}
                    </p> */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {hoverFileMenu && (
          <div
            id="hover_menu"
            className="flex justify-between gap-5 menu"
            onMouseLeave={() => setHoveredFileMenu(false)}
          >
            <div className="absolute z-10 w-[12rem]  ml-2 pl-1 mt-1 rounded-lg  bg-[#091234] pb-2 pt-2">
              <div
                className="flex gap-2 cursor-pointer hover:bg-[#5E32FF] p-1"
                onClick={openFile}
              >
                <div className="mt-1">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.33073 13.6654C1.8724 13.6654 1.48003 13.5022 1.15365 13.1758C0.827257 12.8494 0.664062 12.457 0.664062 11.9987V1.9987C0.664062 1.54036 0.827257 1.148 1.15365 0.821615C1.48003 0.495226 1.8724 0.332031 2.33073 0.332031H7.33073L8.9974 1.9987H15.6641C16.1224 1.9987 16.5148 2.16189 16.8411 2.48828C17.1675 2.81467 17.3307 3.20703 17.3307 3.66536H8.3099L6.64323 1.9987H2.33073V11.9987L4.33073 5.33203H18.5807L16.4349 12.4779C16.3238 12.839 16.1189 13.1272 15.8203 13.3424C15.5217 13.5577 15.1918 13.6654 14.8307 13.6654H2.33073ZM4.08073 11.9987H14.8307L16.3307 6.9987H5.58073L4.08073 11.9987Z"
                      fill="#fff"
                    />
                  </svg>
                </div>

                <p className="text-white text-[16px] hover:text-nyx-yellow">
                  Open File
                </p>
              </div>
              <div
                className="flex gap-2  cursor-pointer hover:bg-[#5E32FF] p-1"
                onClick={saveNote}
              >
                <Image src={VECTORS.i14} width={20} height={20} alt="save" />
                <p className="text-white text-[16px] hover:text-nyx-yellow">
                  Save File
                </p>
              </div>

              <div
                onClick={openAs}
                className="flex gap-2  cursor-pointer p-1 hover:bg-[#5E32FF]"
              >
                <div className="mt-1 ml-[3px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.16667 15.5C1.70833 15.5 1.31597 15.3368 0.989583 15.0104C0.663194 14.684 0.5 14.2917 0.5 13.8333V2.16667C0.5 1.70833 0.663194 1.31597 0.989583 0.989583C1.31597 0.663194 1.70833 0.5 2.16667 0.5H12.1667L15.5 3.83333V8.25C15.2361 8.13889 14.9618 8.06597 14.6771 8.03125C14.3924 7.99653 14.1111 8 13.8333 8.04167V4.52083L11.4792 2.16667H2.16667V13.8333H7.16667V15.5H2.16667ZM8.83333 17.1667V14.6042L13.4375 10.0208C13.5625 9.89583 13.7014 9.80556 13.8542 9.75C14.0069 9.69444 14.1597 9.66667 14.3125 9.66667C14.4792 9.66667 14.6389 9.69792 14.7917 9.76042C14.9444 9.82292 15.0833 9.91667 15.2083 10.0417L15.9792 10.8125C16.0903 10.9375 16.1771 11.0764 16.2396 11.2292C16.3021 11.3819 16.3333 11.5347 16.3333 11.6875C16.3333 11.8403 16.3056 11.9965 16.25 12.1562C16.1944 12.316 16.1042 12.4583 15.9792 12.5833L11.3958 17.1667H8.83333ZM10.0833 15.9167H10.875L13.3958 13.375L13.0208 12.9792L12.625 12.6042L10.0833 15.125V15.9167ZM13.0208 12.9792L12.625 12.6042L13.3958 13.375L13.0208 12.9792ZM3 6.33333H10.5V3H3V6.33333ZM8 13H8.08333L10.5 10.6042V10.5C10.5 9.80556 10.2569 9.21528 9.77083 8.72917C9.28472 8.24305 8.69444 8 8 8C7.30556 8 6.71528 8.24305 6.22917 8.72917C5.74306 9.21528 5.5 9.80556 5.5 10.5C5.5 11.1944 5.74306 11.7847 6.22917 12.2708C6.71528 12.7569 7.30556 13 8 13Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <p className="text-white text-[16px] hover:text-nyx-yellow">
                  Save as
                </p>
              </div>
              <div
                className="flex gap-2  cursor-pointer hover:bg-[#5E32FF] p-1"
                onClick={() => {
                  if (title == "file") {
                    toast.error("Please open file");
                  } else {
                    console.log(padId);
                    saveTitleAs(title);
                  }
                }}
              >
                <Image src={VECTORS.i15} width={20} height={20} alt="edit" />
                <p className="text-white text-[16px] hover:text-nyx-yellow">
                  Edit Name
                </p>
              </div>
              <div
                className="flex gap-2  cursor-pointer hover:bg-[#5E32FF] p-1"
                onClick={downLoadFile}
              >
                <Image
                  src={VECTORS.i17}
                  width={20}
                  height={20}
                  alt="download"
                />
                <p className="text-white text-[16px] hover:text-nyx-yellow">
                  Download File
                </p>
              </div>
              <div
                className="flex gap-2 p-1 cursor-pointer hover:bg-[#5E32FF]"
                onClick={deleteFile}
              >
                <Image src={VECTORS.i16} width={20} height={20} alt="delete" />
                <p className="text-white text-[16px] hover:text-nyx-yellow">
                  Delete File
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="nyx-quill-editor">
          <ReactQuill
            onFocus={handleClickInsideQuill}
            placeholder="Write or copy or paste your song here. You can save and download your file once you are done."
            value={editorcontent}
            ref={quillRef}
            style={{ overflowY: "scroll", height: "30rem", overflow: "hidden" }}
            onChange={(value: any, delta: any, source: any, editor: any) => {
              setActiveBold(
                quillRef.current.getEditor().getFormat("bold") ? true : false,
              );
              const editorContextValue: any = isEmptyContent(value)
                ? ""
                : value;
              seteditorcontent(editorContextValue);
            }}
            modules={{
              toolbar: EDITOR_JS_TOOLS,
            }}
          />
        </div>
      </div>
    </>
  );
}
