/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Format,
  Persona,
  Task,
  Tone,
  Genre,
  Mood,
  Theme,
  Language,
  TargetAudience,
  Style,
  RhymeScheme,
  TargetListeners,
} from "@nyx-frontend/main/utils/productConstants";
import { colourStyles, colourStyles2 } from "@nyx-frontend/main/utils/productStyle";
import { UseContextData } from "@nyx-frontend/main/hooks/usecontext";
import { ButtonElement } from "@nyx-frontend/main/shared/inputs";
import { KICKSTART, MODAL_RESET } from "@nyx-frontend/main/utils/modalstyles";
import { decodeToken } from "@nyx-frontend/main/utils/utils";
import { useContext, useEffect } from "react";
import Select from "react-select";
function AI_Generator(props) {
  const {
    setModalConfig,
    lyricsData,
    setApiLoaded,
    history,
    historyIndex,
    setLyricsData,
    lyricsIndex,
    currentInput,
    currentInputLine,
  } = useContext(UseContextData);

  const onSubmit = () => {
    lyricsData.generateType = "LINES_SONGS";

    let updatedAdditionalSettings = {};

    if (Object.keys(lyricsData.additional_settings.persona).length !== 0)
      updatedAdditionalSettings["persona"] =
        lyricsData.additional_settings.persona.value;

    if (Object.keys(lyricsData.additional_settings.exemplar).length !== 0)
      updatedAdditionalSettings["exemplar"] =
        lyricsData.additional_settings.exemplar.value;

    if (lyricsData.additional_settings.task.length !== 0)
      updatedAdditionalSettings["task"] =
        lyricsData.additional_settings.task.value;

    if (Object.keys(lyricsData.additional_settings.format).length !== 0)
      updatedAdditionalSettings["format"] =
        lyricsData.additional_settings.format.value;

    if (Object.keys(lyricsData.additional_settings.tone).length !== 0)
      updatedAdditionalSettings["tone"] =
        lyricsData.additional_settings.tone.value;

    // if (lyricsData.additional_settings.context.length !== 0)
    //   updatedAdditionalSettings["context"] =
    //     lyricsData.additional_settings.context;

    if (Object.keys(lyricsData.additional_settings.theme).length !== 0)
      updatedAdditionalSettings["theme"] =
        lyricsData.additional_settings.theme.value;

    if (
      Object.keys(lyricsData.additional_settings.Target_Listeners).length !== 0
    )
      updatedAdditionalSettings["Target_Listeners"] =
        lyricsData.additional_settings.Target_Listeners.value;

    // const updatedAdditionalSettings = {
    //   persona:
    //     Object.keys(lyricsData.additional_settings.persona).length !== 0
    //       ? lyricsData.additional_settings.persona.value
    //       : "",
    //   task: lyricsData.additional_settings.task,
    //   exemplar:
    //     Object.keys(lyricsData.additional_settings.exemplar).length !== 0
    //       ? lyricsData.additional_settings.exemplar.value
    //       : "",
    //   format:
    //     Object.keys(lyricsData.additional_settings.format).length !== 0
    //       ? lyricsData.additional_settings.format.value
    //       : "",
    //   tone:
    //     Object.keys(lyricsData.additional_settings.tone).length !== 0
    //       ? lyricsData.additional_settings.tone.value
    //       : "",
    //   context: lyricsData.additional_settings.context,
    // };

    const additionalSettings = Object.values(updatedAdditionalSettings).some(
      (value) => value !== "",
    )
      ? updatedAdditionalSettings
      : {};

    if (Object.keys(additionalSettings).length != 0) {
      additionalSettings.language = "hinglish";
    }
    const newPayload = {
      workspace_id: Number(localStorage.getItem("workspace_id")),
      generateType: "LINES_SONGS",
      user_id: decodeToken(localStorage.getItem("token")).data.userId,
      user_input: {
        input:
          props.from == "kickstart"
            ? currentInput
            : lyricsData.user_input.input,
        base_instruction:
          props.from == "lines"
            ? lyricsData.user_input.base_instruction
            : "complete song",
        additional_inputs: "",
        new_input:
          props.from == "lines"
            ? currentInputLine.length == 0
              ? "yes"
              : lyricsData.user_input.input == currentInputLine
                ? "no"
                : "yes"
            : "yes",
      },
      generateId: "",
      // prev_response: currentInputLine.length == 0 ? "" : history[historyIndex]?.data[lyricsIndex],
      prev_response:
        currentInputLine.length == 0
          ? ""
          : currentInputLine == lyricsData.user_input.input
            ? history[historyIndex]?.data[lyricsIndex]
            : "",
      additional_settings: additionalSettings,
    };

    props.onClose(newPayload);
  };

  const ResetData = () => {
    lyricsData.additional_settings = {
      persona: {},
      context: "",
      task: "",
      exemplar: {},
      format: {},
      tone: {},
      language: "English",
      theme: {},
      Target_Listeners: {},
    };
    setLyricsData({ ...lyricsData });
  };

  const informationButtonClick = () => {
    if (props.from === "Rewrite") {
      window.open(
        "/rewrite-info",
        "_blank", // <- This is what makes it open in a new window.
      );
    }
    if (props.from === "Lines and Songs") {
      window.open(
        "/lines-songs-info",
        "_blank", // <- This is what makes it open in a new window.
      );
    }
    if (props.from === "Sections") {
      window.open(
        "/section-info",
        "_blank", // <- This is what makes it open in a new window.
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between pb-4">
        {/* <p className="text-white font-[400] text-[20px]">Additional settings</p> */}
        <div className="flex gap-2">
          <p className="text-white font-[600] text-[20px]">
            Additional settings
          </p>
          <img
            alt="n2"
            className="w-[22px] cursor-pointer"
            src="https://assets.nyx.today/assets/images/font.svg"
            onClick={informationButtonClick}
          ></img>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            if (props.from == "kickstart") {
              setModalConfig(KICKSTART);
            } else {
              setModalConfig(MODAL_RESET);
            }
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Vector7"
              d="M0.35 13.5029C0.583333 13.721 0.855555 13.8301 1.16667 13.8301C1.47778 13.8301 1.75 13.721 1.98333 13.5029L7 8.81305L12.0556 13.5392C12.263 13.7331 12.5287 13.824 12.8528 13.8119C13.1769 13.7998 13.4426 13.6968 13.65 13.5029C13.8833 13.2847 14 13.0303 14 12.7394C14 12.4486 13.8833 12.1941 13.65 11.9759L8.63333 7.28613L13.6889 2.55995C13.8963 2.36605 13.9935 2.11763 13.9806 1.81467C13.9676 1.51171 13.8574 1.26328 13.65 1.06938C13.4167 0.851253 13.1444 0.742188 12.8333 0.742188C12.5222 0.742188 12.25 0.851253 12.0167 1.06938L7 5.75921L1.94444 1.03303C1.73704 0.839134 1.4713 0.748246 1.14722 0.760365C0.823148 0.772483 0.557407 0.87549 0.35 1.06938C0.116667 1.28752 0 1.542 0 1.83284C0 2.12369 0.116667 2.37817 0.35 2.5963L5.36667 7.28613L0.311111 12.0123C0.103703 12.2062 0.00648092 12.4546 0.0194439 12.7576C0.0324068 13.0605 0.142593 13.309 0.35 13.5029Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {props.from != "Rewrite" ? (
        <div className="w-full">
          <div className="flex w-full gap-2">
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] pb-1">Genre</p>
              <Select
                placeholder="Select Genre"
                options={Genre}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.exemplar)
                    .length == 0
                    ? null
                    : lyricsData.additional_settings.exemplar
                }
                onChange={(data) => {
                  lyricsData.additional_settings.exemplar = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] text-[16px] pb-1">Mood</p>
              <Select
                placeholder="Select Mood"
                options={Mood}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.tone).length == 0
                    ? null
                    : lyricsData.additional_settings.tone
                }
                onChange={(data) => {
                  lyricsData.additional_settings.tone = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] pb-1">Theme</p>
              <Select
                placeholder="Select Theme"
                options={Theme}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.theme).length ==
                  0
                    ? null
                    : lyricsData.additional_settings.theme
                }
                onChange={(data) => {
                  lyricsData.additional_settings.theme = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] text-[16px] pb-1">Persona</p>
              <Select
                placeholder="Select Persona"
                options={Persona}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.persona)
                    .length == 0
                    ? null
                    : lyricsData.additional_settings.persona
                }
                onChange={(data) => {
                  lyricsData.additional_settings.persona = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] pb-1">Format</p>
              <Select
                placeholder="Select Format of Song"
                options={Format}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.format).length ==
                  0
                    ? null
                    : lyricsData.additional_settings.format
                }
                onChange={(data) => {
                  lyricsData.additional_settings.format = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] text-[16px] pb-1">
                Target Listeners
              </p>
              <Select
                placeholder="Select Audience"
                options={TargetAudience}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.Target_Listeners)
                    .length == 0
                    ? null
                    : lyricsData.additional_settings.Target_Listeners
                }
                onChange={(data) => {
                  lyricsData.additional_settings.Target_Listeners = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
          <div className="w-full">
            <div className="pb-3">
              <p className="text-white font-[400] pb-1">Context</p>
              <textarea
                value={lyricsData.additional_settings.context}
                onChange={(event) => {
                  lyricsData.additional_settings.context = event.target.value;
                  setLyricsData({ ...lyricsData });
                }}
                className="w-full h-20 rounded-md bg-transparent border p-2 text-[#FFFFFF]"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex w-full gap-2">
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] pb-1">Style</p>
              <Select
                maxMenuHeight={100}
                placeholder="Select Style"
                options={Style}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.exemplar)
                    .length == 0
                    ? null
                    : lyricsData.additional_settings.exemplar
                }
                onChange={(data) => {
                  lyricsData.additional_settings.exemplar = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] text-[16px] pb-1">Tone</p>
              <Select
                maxMenuHeight={140}
                placeholder="Select Tone"
                options={Tone}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.tone).length == 0
                    ? null
                    : lyricsData.additional_settings.tone
                }
                onChange={(data) => {
                  lyricsData.additional_settings.tone = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
          <div className="flex w-full gap-2">
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] pb-1">Rhyme Scheme</p>
              <Select
                maxMenuHeight={100}
                placeholder="Select Rhyme"
                menuPlacement={"top"}
                options={RhymeScheme}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.format).length ==
                  0
                    ? null
                    : lyricsData.additional_settings.format
                }
                onChange={(data) => {
                  lyricsData.additional_settings.format = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
            <div className="pb-3 w-1/2">
              <p className="text-white font-[400] text-[16px] pb-1">
                Target Listeners
              </p>
              <Select
                maxMenuHeight={110}
                placeholder="Select Target Listeners"
                menuPlacement={"top"}
                options={TargetListeners}
                styles={colourStyles2}
                value={
                  Object.values(lyricsData.additional_settings.Target_Listeners)
                    .length == 0
                    ? null
                    : lyricsData.additional_settings.Target_Listeners
                }
                onChange={(data) => {
                  lyricsData.additional_settings.Target_Listeners = data;
                  setLyricsData({ ...lyricsData });
                }}
                components={{
                  IndicatorSeparator: () => null,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* <div className="pb-3">
        <p className="text-white font-[400] pb-1">Persona</p>
        <Select
          placeholder="Select the closer persona from the list who is writing the song?"
          options={Persona}
          styles={colourStyles2}
          value={
            Object.values(lyricsData.additional_settings.persona).length == 0
              ? null
              : lyricsData.additional_settings.persona
          }
          onChange={(data) => {
            lyricsData.additional_settings.persona = data;
            setLyricsData({ ...lyricsData });
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>
      <div className="pb-3">
        <p className="text-white font-[400] text-[16px] pb-1">
          Select desired format
        </p>
        <Select
          placeholder="Select the format/structure of the song from the list"
          options={Format}
          styles={colourStyles2}
          value={
            Object.values(lyricsData.additional_settings.format).length == 0
              ? null
              : lyricsData.additional_settings.format
          }
          onChange={(data) => {
            lyricsData.additional_settings.format = data;
            setLyricsData({ ...lyricsData });
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>

      <div className="pb-3">
        <p className="text-white text-[16px] font-[400] pb-1">
          Tone of the song
        </p>
        <Select
          value={
            Object.values(lyricsData.additional_settings.tone).length == 0
              ? null
              : lyricsData.additional_settings.tone
          }
          placeholder="Write or Select the tone of the song. eg: Romantic, motivational..."
          options={Tone}
          styles={colourStyles2}
          onChange={(data) => {
            lyricsData.additional_settings.tone = data;
            setLyricsData({ ...lyricsData });
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>

      <div className="pb-3">
        <p className="text-white text-[16px] font-[400] pb-1">Exemplar</p>
        <Select
          value={
            Object.values(lyricsData.additional_settings.exemplar).length == 0
              ? null
              : lyricsData.additional_settings.exemplar
          }
          placeholder="Select what need to be done. eg: write a song, improvisation..."
          options={Task}
          styles={colourStyles2}
          onChange={(data) => {
            lyricsData.additional_settings.exemplar = data;
            setLyricsData({ ...lyricsData });
          }}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </div>

      <div className="mb-4">
        <p className="text-white text-[16px] font-[400] pb-1">Set Context</p>
        <input
          value={lyricsData.additional_settings.context}
          onChange={(event) => {
            lyricsData.additional_settings.context = event.target.value;
            setLyricsData({ ...lyricsData });
          }}
          placeholder="What you want the song to be about. eg; heartbreak, war, pizza"
          type="text"
          className="w-full text-[14px] placeholder:text-[#8297BD] placeholder:italic bg-transparent py-2 text-white pl-2 border outline-none rounded-md font-[400]"
        />
      </div>

      <div className="mb-5">
        <p className="text-white text-[16px] font-[400] pb-1">Mention task</p>
        <input
          value={lyricsData.additional_settings.task}
          onChange={(event) => {
            lyricsData.additional_settings.task = event.target.value;
            setLyricsData({ ...lyricsData });
          }}
          placeholder="Mention the exemplar of the song in 50 words"
          type="text"
          className="w-full text-[14px] placeholder:text-[#8297BD] placeholder:italic bg-transparent py-2 text-white pl-2 border outline-none rounded-md font-[400]"
        />
      </div> */}

      <div className={`flex justify-center pb-2 gap-2 mt-5`}>
        <ButtonElement
          onSubmit={() => {
            if (props.from == "kickstart") {
              setModalConfig(KICKSTART);
            } else {
              // setModalConfig(MODAL_RESET);
              ResetData();
            }
          }}
          name="Reset"
        ></ButtonElement>
        <ButtonElement name="Save" onSubmit={onSubmit}></ButtonElement>
      </div>
    </div>
  );
}

export default AI_Generator;
