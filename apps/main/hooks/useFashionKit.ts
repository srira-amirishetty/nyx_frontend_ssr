"use client";
import { useState, useEffect } from "react";
import { createFashionkit } from "@nyx-frontend/main/services/virtual-tryon";
import { useMutation } from "@tanstack/react-query";

const useFashionKit = () => {
  const [fashionKitId, setFashionKitId] = useState<string | null>(null);

  const fashionKit = useMutation({
    mutationKey: ["fashionKit"],
    mutationFn: createFashionkit,
    onSuccess: (data) => {
      const fashionKitId = data.result.fashion_kit_id;
      setFashionKitId(fashionKitId);
      console.log("Fashion Kit ID:", fashionKitId);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const workspaceId = localStorage.getItem("workspace_id");
      const name = "default title";

      if (workspaceId && name) {
        try {
          const data = { workspace_id: workspaceId, name: name };
          await fashionKit.mutateAsync(data);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return fashionKitId;
};

export default useFashionKit;
