import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "@nyx-frontend/main/components/Button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { workSpaceMenustyle, createWorkSpaceStyle } from "@nyx-frontend/main/utils/modalstyles";
import { EditWorkSpaceData, EditNameAndCredit } from "@nyx-frontend/main/services/workSpace";
const EditWorkSpace = ({
  createWork,
  setEditWorkSpace,
  WorkSpaceId,
  workSpcaeDtaRefetch,
  availableCredit,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [workSpaceName, setWorkSpaceName] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [error, setError] = useState(false);
  const[errorMessage,setErrorMessage]=useState("")

  const workSpaceEditData = useQuery({
    queryKey: ["workSpaceEditData"],
    queryFn: async () => {
      const res = await EditWorkSpaceData(WorkSpaceId);
      return res;
    },
  });

  useEffect(() => {
    let data = workSpaceEditData.data;

    setWorkSpaceName(data?.workspace?.name);
    setCreditLimit(data?.workspace?.credit_limit);
    if (
      data?.workspace?.credit_limit != null &&
      data?.workspace?.credit_limit != ""
    ) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [WorkSpaceId, workSpaceEditData.data, workSpaceEditData.isSuccess]);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const nameChnage = (e) => {
    const newName = e.target.value;
    setWorkSpaceName(e.target.value);
    if (newName.trim() === "") {
      setErrorMessage("Workspace name cannot be empty");
      return;
    }
    const alphanumericRegex = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/;
    if (!alphanumericRegex.test(newName) || newName === ".") {
      setErrorMessage(
        "Workspace name cannot contain special characters or be just a dot, or have leading/trailing spaces",
      );
      return;
    }
    setErrorMessage("");
  };

  const creditChange = (e) => {
    if (!isNaN(e.target.value)) {
      if (e.target.value <= availableCredit) {
        setError(false);
        setCreditLimit(e.target.value);
      } else {
        setCreditLimit(e.target.value);
        setError(true);
      }
      // setCreditLimit(e.target.value)
    }
  };

  const handleSubmit = () => {
    if (creditLimit == "" || creditLimit == null) {
      let data = {
        workspace_id: WorkSpaceId,
        name: workSpaceName,
      };

      mutateEditWorkSpace.mutate(data, {
        onSuccess: (response) => {
          setEditWorkSpace(false);
          workSpcaeDtaRefetch();
        },
        onError: (res) => {
          console.log(res);
          if(res?.response?.data?.message){
            setErrorMessage(res?.response?.data?.message)
          }else{
            setErrorMessage("Some error occured.")
          }
        },
      });
    } else {
      let data = {
        workspace_id: WorkSpaceId,
        name: workSpaceName,
        credit_limit: Number(creditLimit),
      };

      mutateEditWorkSpace.mutate(data, {
        onSuccess: (response) => {
          setEditWorkSpace(false);
          workSpcaeDtaRefetch();
        },
        onError: (res) => {
          console.log(res);
        },
      });
    }
  };

  const mutateEditWorkSpace = useMutation({
    mutationKey: ["add-Name&Credit"],
    mutationFn: EditNameAndCredit,
  });
  return (
    <>
      <Modal
        isOpen={createWork}
        style={createWorkSpaceStyle}
        onRequestClose={() => setEditWorkSpace(false)}
        ariaHideApp={false}
      >
        <>
          <div className="text-white p-4">
            <div className="flex flex-col justify-center items-center mb-4">
              <div className="px-4 text-center w-[400px] font-normal text-[16px]  ">
                Your workspace is where you create assets, manage billing, and
                collaborate.
              </div>
            </div>
            <form>
              <div className="px-20">
                <div className="text-left text-[#FFFFFF] font-semibold gap-2 text-sm mb-4">
                  <p className="font-semibold py-2">Workspace Name</p>
                  <input
                    type="text"
                    id="workspacename"
                    value={workSpaceName || ""}
                    className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                    placeholder="Full Name"
                    onChange={nameChnage}
                  />
                  {workSpaceName?.length > 15 ? (
                      <p className="text-nyx-red text-sm mt-1">
                        Name should only have 15 or less characters.
                      </p>
                    ) : (
                      errorMessage && (
                        <p className="text-nyx-red text-sm mt-1">
                          {errorMessage}
                        </p>
                      )
                    )}
                </div>

                <div className="text-sm font-bold leading-10">Credit Limit</div>
                <div className="flex flex-row gap-2 ">
                  <div
                    className={` font-light ${isChecked == false ? "text-nyx-yellow" : "text-white"}`}
                  >
                    No
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer mt-[2px]">
                      <input
                        type="checkbox"
                        id="creditlimit"
                        value={isChecked}
                        className="sr-only peer"
                        checked={isChecked}
                        onChange={handleToggle}
                      />
                      <div className="relative w-9 h-5 bg-transparent peer-focus:outline-none peer-focus:ring-4   rounded-full peer dark:bg-transparent peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  border-[1px] peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[2px] after:bg-nyx-yellow  after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-nyx-yellow dark:border-nyx-yellow peer-checked:bg-nyx-yellow peer-checked:after:bg-[#3B226F] "></div>
                    </label>
                  </div>
                  <div
                    className={`font-light ${isChecked ? "text-nyx-yellow" : "text-white"}`}
                  >
                    {" "}
                    Yes
                  </div>
                </div>

                {isChecked && (
                  <>
                    <div className="mt-3 mb-3">
                      <p className="font-semibold py-2">Usage Limit</p>
                      <input
                        type="text"
                        id="creditlimit"
                        value={creditLimit || ""}
                        onChange={creditChange}
                        className="w-full bg-transparent border border-[#8297BD] rounded-md p-2 font-normal"
                        placeholder="xxxxx"
                      />
                      {error && (
                        <p className="text-sm  font-semibold text-red-500 mt-1">
                          Exceeds available {availableCredit} credit limit
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </form>
            <div className="flex flex-row justify-center gap-3 mt-6">
              <Button
                className="rounded-full  text-nyx-yellow font-semibold "
                onClick={() => setEditWorkSpace(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-full bg-nyx-yellow text-black font-semibold  disabled:bg-nyx-gray-1 disabled:border-nyx-gray-1 disabled:shadow-none disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={error || workSpaceName?.trim() == "" || workSpaceName?.length>15 || errorMessage!="" || workSpaceEditData.isFetching}
              >
                Update Workspace
              </Button>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default EditWorkSpace;
