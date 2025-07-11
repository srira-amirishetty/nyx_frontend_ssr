"use client";
import { useEffect } from "react";
import Shopping from "./Shopping";
import CreativeList from "./CreativeList";
import { useSearchParams } from "next/navigation";
import useStore from "../component/store";

export default function AdCreative() {
  const search = useSearchParams();
  const { setElement } = useStore();

  const brandId = Number(search.get("brandid"));
  const campaignId = Number(search.get("campaignId"));
  const objective = search.get("objective");
  useEffect(() => {
    setElement("element1", false);
    setElement("element2", true);
    setElement("element3", false);
    setElement("element4", false);
    setElement("element5", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {objective === "Shopping" ? (
        <Shopping
          brandId={brandId}
          campaignId={campaignId}
          objective={objective}
        />
      ) : (
        <CreativeList
          brandId={brandId}
          campaignId={campaignId}
          objective={objective}
        />
      )}
    </>
  );
}
