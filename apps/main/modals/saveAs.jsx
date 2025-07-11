import { MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";
import { useContext, useEffect, useState } from "react";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import { saveNotePad } from "@nyx-frontend/main/services/uploadService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function SaveAs(props) {
  const [disabled, setdisabled] = useState(false);
  const { setModalConfig } = useContext(UseContextData);
  const [title, setTitle] = useState("");
  const mutateProcessNotePad = useMutation({
    mutationKey: ["save-notepad"],
    mutationFn: saveNotePad,
  });
  const saveAsData = (event) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    setTitle(props.title);
  }, [props.title]);

  const onSubmitData = () => {
    let payload =
      props.type == "editTitle"
        ? {
            operation: "SAVE_FILE",
            title: title,
            content: props.data,
            formatting: {},
            padId: props.padId,
          }
        : {
            operation: "SAVE_FILE",
            title: title,
            content: props.data,
            formatting: {},
          };

    mutateProcessNotePad.mutate(payload, {
      onSuccess: async (response) => {
        toast.success(
          props.type == "editTitle"
            ? "File name successfully updated"
            : "new file successfully created",
        );
        setModalConfig(MODAL_RESET);
        props.onClose({
          title: title,
          content: props.data,
        });
      },
      onError: (errorResponse) => {
        console.log(errorResponse.response.data.errors.message);
        toast.error("Missing content");
      },
    });
  };
  return (
    <>
      <div className="flex justify-between pb-4">
        <p className="text-white font-[600] text-[20px]">
          {props.type == "editTitle" ? <>Edit Name</> : <>Save as</>}
        </p>

        <div
          className="cursor-pointer"
          onClick={() => setModalConfig(MODAL_RESET)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector10"
              d="M0.35 13.5029C0.583333 13.721 0.855555 13.8301 1.16667 13.8301C1.47778 13.8301 1.75 13.721 1.98333 13.5029L7 8.81305L12.0556 13.5392C12.263 13.7331 12.5287 13.824 12.8528 13.8119C13.1769 13.7998 13.4426 13.6968 13.65 13.5029C13.8833 13.2847 14 13.0303 14 12.7394C14 12.4486 13.8833 12.1941 13.65 11.9759L8.63333 7.28613L13.6889 2.55995C13.8963 2.36605 13.9935 2.11763 13.9806 1.81467C13.9676 1.51171 13.8574 1.26328 13.65 1.06938C13.4167 0.851253 13.1444 0.742188 12.8333 0.742188C12.5222 0.742188 12.25 0.851253 12.0167 1.06938L7 5.75921L1.94444 1.03303C1.73704 0.839134 1.4713 0.748246 1.14722 0.760365C0.823148 0.772483 0.557407 0.87549 0.35 1.06938C0.116667 1.28752 0 1.542 0 1.83284C0 2.12369 0.116667 2.37817 0.35 2.5963L5.36667 7.28613L0.311111 12.0123C0.103703 12.2062 0.00648092 12.4546 0.0194439 12.7576C0.0324068 13.0605 0.142593 13.309 0.35 13.5029Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col relative top-5">
        <label className="text-white font-600">File Name</label>
        <input
          placeholder={`${title}-1`}
          value={props.type == "editTitle" ? title : null}
          className="w-full  text-[14px]  placeholder:italic border outline-none  pl-2 h-9 text-white placeholder:text-[#8297BD] rounded bg-transparent"
          onChange={(event) => {
            setdisabled(event.target.value.length != 0);
            saveAsData(event);
          }}
        ></input>
      </div>
      <div className="pt-12">
        <ButtonElement
          width="w-full"
          disabled={!disabled}
          onSubmit={onSubmitData}
          name="Save"
        ></ButtonElement>
      </div>
    </>
  );
}

export default SaveAs;
