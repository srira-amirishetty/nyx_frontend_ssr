"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { saveReport } from "@nyx-frontend/main/services/uploadService";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Button from "@nyx-frontend/main/components/Button";

export default function Title({ name }: { name: string }) {
  const searchParams = useSearchParams();
  const [showTextArea, setShowTextArea] = useState(false);
  const [fileName, setFileName] = useState(name);
  const mutateSaveReports = useMutation({
    mutationKey: ["save_reports"],
    mutationFn: saveReport,
    onSuccess: async () => {
      toast.success("Save Sucessfully");
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
  });

  const editButtonClick = (e: any) => {
    setShowTextArea(true);
  };
  const editFileName = (event: any) => {
    setFileName(event.target.value);
  };

  const saveButtonClick = () => {
    mutateSaveReports.mutate({
      type: "TITLE_CHANGE",
      uploadId: Number(searchParams.get("ref")),
      reportName: fileName,
    });
    setShowTextArea(false);
  };

  if (!name) {
    return null;
  }

  return (
    <>
      {showTextArea ? (
        <div className="flex gap-2 justify-between items-center">
          <input
            type="text"
            value={fileName}
            className="w-full rounded-lg bg-transparent border-2 border-nyx-yellow p-2 text-white"
            onChange={editFileName}
          />
          <Button
            className="flex-1 shadow-sm shadow-nyx-yellow"
            onClick={saveButtonClick}
          >
            Save{mutateSaveReports.isPending ? "..." : ""}
          </Button>
        </div>
      ) : (
        <div className="flex gap-3">
          <p className="text-white font-[400] text-sm">{fileName}</p>
          <button onClick={editButtonClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 19 19"
              className="w-4"
              fill="none"
            >
              <path
                d="M1.5 17.5008H2.6L13.675 6.42578L12.575 5.32578L1.5 16.4008V17.5008ZM16.85 5.35078L13.65 2.15078L14.7 1.10078C14.9833 0.817448 15.3333 0.675781 15.75 0.675781C16.1667 0.675781 16.5167 0.817448 16.8 1.10078L17.9 2.20078C18.1833 2.48411 18.325 2.83411 18.325 3.25078C18.325 3.66745 18.1833 4.01745 17.9 4.30078L16.85 5.35078ZM15.8 6.40078L3.2 19.0008H0V15.8008L12.6 3.20078L15.8 6.40078ZM13.125 5.87578L12.575 5.32578L13.675 6.42578L13.125 5.87578Z"
                fill="#8297BD"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
