import { useSwiper } from "swiper/react";
import type { SlideType } from "./types";
import { useMutation } from "@tanstack/react-query";
import { postQuestionSelectService } from "@nyx-frontend/main/services/uploadService";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@nyx-frontend/main/components/Button";
import Modal from "react-modal";
import { warningStyle } from "@nyx-frontend/main/utils/modalstyles";
import Select from "react-select";
import { colourStyles2, colourStylesQuestion } from "@nyx-frontend/main/utils/productStyle";
import { useRouter } from "next/navigation";
export default function Slides({
  data,
  index,
  total,
  event,
}: {
  data: SlideType;
  index: number;
  total: number;
  event: Function;
}) {
  const swiper = useSwiper();
  const search = useSearchParams();
  const [title, question] = data.question.split(";");
  const [selected, setSelected] = useState<string>(data.answer);
  const [oldSelected, setOldSelected] = useState<string>(data.answer);
  const [otherSelected, setOtherSelected] = useState<string>(data.answer);
  const [warning, setWarning] = useState(false);
  const navigate = useRouter();
  const mutateQuestion = useMutation({
    mutationKey: ["question-select"],
    mutationFn: postQuestionSelectService,
  });

  const onNext = () => {
    if (selected.toLocaleLowerCase() === "no") {
      setWarning(true);
      swiper.allowSlideNext = false;
    } else {
      swiper.allowSlideNext = true;
    }
    if (
      selected.toLocaleLowerCase() === "other" &&
      otherSelected === data.answer
    ) {
      swiper.slideNext();
      return;
    }

    if (selected === oldSelected) {
      swiper.slideNext();
    } else {
      const old = selected;
      mutateQuestion.mutate(
        {
          formId: 2,
          processId: Number(search.get("processId")), // dynamic main
          questionId: index + 1,
          answer:
            selected.toLocaleLowerCase() === "other" ? otherSelected : selected,
        },
        {
          onSuccess: () => {
            setOldSelected(old);
            swiper.slideNext();
          },
        }
      );
    }
  };

  const onSubmit = () => {
    if (
      selected.toLocaleLowerCase() === "other" &&
      otherSelected === data.answer
    ) {
      event();
      return;
    }

    if (selected === oldSelected) {
      event();
    } else {
      const old = selected;
      mutateQuestion.mutate(
        {
          formId: 2,
          processId: Number(search.get("processId")), // dynamic main
          questionId: index + 1,
          answer:
            selected.toLocaleLowerCase() === "other" ? otherSelected : selected,
        },
        {
          onSuccess: () => {
            setOldSelected(old);
            event();
          },
        }
      );
    }
  };

  useEffect(() => {
    const other = data.answer !== null && !data.options.includes(data.answer);
    if (other) {
      setSelected("Other");
    }
  }, [data.answer, data.options]);

  const onLastClose = () => {
    setWarning(false);
    navigate.push(`/apphome/workspace10/lyrics-genius-ai/probability?ref=${search.get("processId")}`);
  };
  const notQuit = () => {
    setWarning(false);
    swiper.slidePrev();
  };
  const revenuePercentage = [
    { value: "20%", label: "20%" },
    { value: "30%", label: "30%" },
    { value: "40%", label: "40%" },
    { value: "60%", label: "60%" },
  ];

  const apiData = data.options;

  const expectingRevenue = apiData.map((option: string, index) => ({
    value: option, // Replace someValue with the actual property from your API data
    label: option, // Replace someLabel with the actual property from your API data
  }));
  return (
    <>
      {" "}
      <div className="pt-24 md:pt-20 md:pb-10 relative px-4 z-10">
        <p className="text-white font-light absolute text-sm md:text-lg top-6 left-6">
          {title}
        </p>
        <h3 className="text-white w-full text-center text-lg md:text-2xl font-bold">
          {question}
        </h3>

        {data.questionType === "RADIO" ? (
          <div className="flex flex-col md:flex-row gap-8 justify-center pt-10">
            {data.options?.map((option: string) => (
              <label
                key={option + index}
                className="text-white inline-flex  text-justify text-sm md:text-lg relative cursor-pointer"
              >
                <input
                  type="radio"
                  checked={option === selected}
                  name={question}
                  onChange={() => setSelected(option)}
                  className="w-6 h-6 peer/question pointer-events-none text-white bg-gray-100 border-white mr-2 opacity-0 absolute"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 36"
                  fill="none"
                  className="peer-checked/question:hidden w-8 pointer-events-none"
                >
                  <path
                    fill="#D9D9D9"
                    d="M16.999 31.167c-1.96 0-3.802-.372-5.525-1.115a14.307 14.307 0 0 1-4.498-3.028 14.306 14.306 0 0 1-3.028-4.498C3.204 20.802 2.832 18.96 2.832 17c0-1.96.372-3.802 1.116-5.525a14.306 14.306 0 0 1 3.028-4.498 14.306 14.306 0 0 1 4.498-3.028c1.723-.744 3.565-1.116 5.525-1.116 1.96 0 3.801.372 5.525 1.116a14.306 14.306 0 0 1 4.498 3.028 14.305 14.305 0 0 1 3.028 4.498c.744 1.723 1.115 3.565 1.115 5.525 0 1.96-.371 3.801-1.115 5.525a14.305 14.305 0 0 1-3.028 4.498 14.307 14.307 0 0 1-4.498 3.028c-1.724.743-3.566 1.115-5.525 1.115Zm0-2.833c3.164 0 5.843-1.098 8.04-3.294 2.195-2.196 3.293-4.875 3.293-8.04 0-3.163-1.098-5.843-3.294-8.039-2.196-2.196-4.875-3.294-8.04-3.294-3.163 0-5.843 1.098-8.039 3.294-2.196 2.196-3.294 4.876-3.294 8.04 0 3.163 1.098 5.843 3.294 8.04 2.196 2.195 4.876 3.293 8.04 3.293Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 36"
                  fill="none"
                  className="hidden peer-checked/question:inline-block w-8 pointer-events-none"
                >
                  <path
                    fill="#fff"
                    d="M18 25.5c2.075 0 3.844-.731 5.306-2.194C24.77 21.844 25.5 20.075 25.5 18s-.731-3.844-2.194-5.306C21.844 11.23 20.075 10.5 18 10.5s-3.844.731-5.306 2.194C11.23 14.156 10.5 15.925 10.5 18s.731 3.844 2.194 5.306C14.156 24.77 15.925 25.5 18 25.5Zm0 7.5c-2.075 0-4.025-.394-5.85-1.181-1.825-.788-3.412-1.857-4.763-3.206-1.35-1.35-2.418-2.938-3.206-4.763C3.394 22.025 3 20.075 3 18c0-2.075.394-4.025 1.181-5.85.788-1.825 1.856-3.412 3.207-4.763 1.35-1.35 2.937-2.418 4.762-3.206C13.975 3.394 15.925 3 18 3c2.075 0 4.025.394 5.85 1.181 1.825.788 3.412 1.856 4.762 3.207 1.35 1.35 2.42 2.937 3.207 4.762C32.606 13.975 33 15.925 33 18c0 2.075-.394 4.025-1.181 5.85-.788 1.825-1.857 3.412-3.206 4.762-1.35 1.35-2.938 2.42-4.763 3.207C22.025 32.606 20.075 33 18 33Zm0-3c3.35 0 6.188-1.163 8.512-3.488C28.837 24.188 30 21.35 30 18c0-3.35-1.163-6.188-3.488-8.512C24.188 7.163 21.35 6 18 6c-3.35 0-6.188 1.162-8.512 3.488C7.163 11.813 6 14.65 6 18c0 3.35 1.162 6.188 3.488 8.512C11.813 28.837 14.65 30 18 30Z"
                  />
                </svg>
                <span className="text-nyx-white-1 peer-checked/question:font-bold peer-checked/question:text-white ml-2">
                  {option}
                </span>
              </label>
            ))}
            {selected?.toLocaleLowerCase() === "other" ? (
              // <select
              //   onChange={(e) => setOtherSelected(e.target.value)}
              //   defaultValue={data.answer}
              //   className="text-[#8297BD] border-0 border-b border-[#8297BD] bg-transparent pr-3.5 py-2.5 focus:outline-none inline-flex items-center text-lg font-normal"
              // >
              //   <option>Select value</option>
              //   <option>20%</option>
              //   <option>30%</option>
              //   <option>40%</option>
              //   <option>60%</option>
              // </select>
              <Select
                className="text-base md:text-base"
                options={revenuePercentage}
                placeholder="Select value"
                instanceId={"category"}
                defaultValue={data.answer}
                styles={colourStyles2}
                onChange={(e: any) => setOtherSelected(e.value)}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            ) : null}
          </div>
        ) : null}

        {data.questionType === "DROPDOWN" ? (
          <div className="flex justify-center mx-auto pt-10 relative z-30">
            {/* <select
              onChange={(e) => setSelected(e.target.value)}
              defaultValue={data.answer}
              className="text-[#8297BD] border-0 border-b border-[#8297BD] bg-transparent pr-3.5 py-2.5 focus:outline-none inline-flex items-center text-lg font-normal"
            >
              <option>Select value</option>
              {data.options?.map((option) => (
                <option key={option + index}>{option}</option>
              ))}
            </select> */}
            <Select
              className="text-base md:text-base z-30"
              options={expectingRevenue}
              placeholder="Select value"
              instanceId={"category2"}
              defaultValue={data.answer}
              styles={colourStylesQuestion}
              onChange={(e: any) => setSelected(e.value)}
              components={{
                IndicatorSeparator: () => null,
              }}
            />
          </div>
        ) : null}

        <div className="flex justify-center gap-2 pt-28 md:pt-10 text-sm">
          {index !== 0 ? (
            <Button
              onClick={() => swiper.slidePrev()}
              className="max-w-[200px] w-full shadow-sm border-[#DFD7A8] shadow-nyx-yellow rounded-xl"
            >
              Back
            </Button>
          ) : null}
          {total !== index ? (
            <Button
              onClick={onNext}
              className="max-w-[200px] w-full shadow-sm border-[#DFD7A8] shadow-nyx-yellow rounded-xl"
            >
              {mutateQuestion.isPending ? "Selecting..." : "Next"}
            </Button>
          ) : null}
          {total === index ? (
            <Button
              onClick={onSubmit}
              className="max-w-[200px] w-full shadow-sm border-[#DFD7A8] shadow-nyx-yellow rounded-xl "
            >
              {mutateQuestion.isPending ? "Submitting Request..." : "Submit"}
            </Button>
          ) : null}
        </div>
      </div>
      {warning ? (
        <Modal
          isOpen={warning}
          style={warningStyle}
          onRequestClose={onLastClose}
        >
          <p className="text-white flex justify-center items-center text-center m-10">
            Do you want to quit the flow ?
          </p>
          <div className="flex justify-center items-center gap-3">
            <Button
              className="w-80% md:w-[40%]  shadow-sm border-[#DFD7A8] shadow-nyx-yellow rounded-xl"
              onClick={onLastClose}
            >
              Yes
            </Button>
            <Button
              className="w-80% md:w-[40%]  shadow-sm border-[#DFD7A8] shadow-nyx-yellow rounded-xl"
              onClick={notQuit}
            >
              No
            </Button>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
