"use client";

import React from "react";
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { RegionDataResponse } from "../types/analytics";

const formatNumber = (num: number): string => {
  return num >= 1000 ? `${(num / 1000).toFixed(1)}K` : num.toString();
};

const countryMapping: { [x: string]: string } = {
  Peru: "PE",
  Pakistan: "PK",
  Vietnam: "VN",
  Palestine: "PS",
  Philippines: "PH",
  Nicaragua: "NI",
  Bangladesh: "BD",
  Algeria: "DZ",
  Colombia: "CO",
  Poland: "PL",
  Indonesia: "ID",
  Madagascar: "MG",
  Benin: "BJ",
  Ethiopia: "ET",
  Uzbekistan: "UZ",
  Morocco: "MA",
  Turkiye: "TR",
  Azerbaijan: "AZ",
  Venezuela: "VE",
  Bahrain: "BH",
  Cambodia: "KH",
  Serbia: "RS",
  Mozambique: "MZ",
  Kazakhstan: "KZ",
  Mexico: "MX",
  Argentina: "AR",
  Libya: "LY",
  Ecuador: "EC",
  "Myanmar (Burma)": "MM",
  "El Salvador": "SV",
  Bulgaria: "BG",
  Belarus: "BY",
  Kenya: "KE",
  Somalia: "SO",
  Lebanon: "LB",
  Panama: "PA",
  Jordan: "JO",
  Iraq: "IQ",
  Tunisia: "TN",
  Malaysia: "MY",
  "Democratic Republic of the Congo": "CD",
  Brazil: "BR",
  Yemen: "YE",
  Ukraine: "UA",
  Nepal: "NP",
  Kyrgyzstan: "KG",
  Rwanda: "RW",
  Romania: "RO",
  Laos: "LA",
  Zimbabwe: "ZW",
  Tanzania: "TZ",
  "South Africa": "ZA",
  Mongolia: "MN",
  Guatemala: "GT",
  Angola: "AO",
  Portugal: "PT",
  Oman: "OM",
  Ireland: "IE",
  Italy: "IT",
  France: "FR",
  Qatar: "QA",
  Egypt: "EG",
  India: "IN",
  "Saudi Arabia": "SA",
};


export const MapComponent = ({
  regionData,
}: {
  regionData: RegionDataResponse;
}) => {

  const handleRegionTipShow = (e: MouseEvent, el: Element, code: string) => {
    const region = regionData.region?.["user_location_country"].find(
      (c) => (countryMapping[c.label] as string) === code
    );

    if (!region) return false;

    const data = region.data;

    if (!data) return false;

    // Update the tooltip element's HTML content
    el.innerHTML = `
      <div style="background-color: rgba(74, 20, 140, 0.9); color: white; padding: 10px; border-radius: 5px; font-family: Arial, sans-serif;">
        <div style="font-size: 14px; margin-bottom: 5px;">${region}</div>
        <div style="font-size: 12px; opacity: 0.9;">Distribution: ${data["clicks"].perc}%</div>
        <div style="font-size: 12px; opacity: 0.9;">Impressions: ${formatNumber(data["impressions"].value || 0)}</div>
        <div style="font-size: 12px; opacity: 0.9;">Clicks: ${formatNumber(data["clicks"].value || 0)}</div>
      </div>
    `;

    return true;
  };

  return (
    <div className="relative w-full h-[400px] bg-[#2D1B4B] rounded-lg p-4 border border-[#4A148C]">
      <div className="w-full h-full">
        <VectorMap
          map={worldMill}
          backgroundColor="transparent"
          zoomOnScroll={false}
          onRegionTipShow={handleRegionTipShow}
          regionStyle={(code) => ({
            initial: {
              fill: Object.values(regionData.region || {})
                .flat()
                .map((r) => countryMapping[r.label])
                .includes(code)
                ? "#6D28D9"
                : "#1A0A2B",
              stroke: "#4A148C",
              strokeWidth: 0.5,
              fillOpacity: 0.8,
            },
          })}
          className="w-full h-full"
        />
      </div>
      {/* 
      <div className="absolute bottom-4 left-4 flex gap-4 text-sm bg-[#4A148C]/90 backdrop-blur-sm p-2 rounded-lg border border-[#4A148C] custom-scrollbar">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "rgba(109, 40, 217, 0.2)" }}
          ></div>
          <span className="text-gray-300">Low</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "rgba(109, 40, 217, 0.5)" }}
          ></div>
          <span className="text-gray-300">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: "rgba(109, 40, 217, 0.8)" }}
          ></div>
          <span className="text-gray-300">High</span>
        </div>
      </div> */}
    </div>
  );
};
