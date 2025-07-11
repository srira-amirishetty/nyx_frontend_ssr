"use client";
import React from "react";
import { StoreContext } from "@nyx-frontend/main/store";
import { observer } from "mobx-react";
import { Element } from "../entity/Element";

export const ElementsPanel = observer((_props: {}) => {
  const store = React.useContext(StoreContext);

  return (
    <div className="bg-nyx-blue-4 h-full rounded-md">
      <div className="flex flex-row justify-between">
        <div className="text-white text-sm px-[18px] py-[7px] font-semibold">
          Elements
        </div>
      </div>
      {store.editorElements.length > 0 ? (
        <div className="flex flex-col py-5 px-3">
          {store.editorElements.map((element) => {
            return <Element key={element.id} element={element} />;
          })}
        </div>
      ) : (
        <div className="w-full text-white p-5">Selected Elements are Displayed here</div>
      )}
    </div>
  );
});
