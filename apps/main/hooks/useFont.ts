import { useState, useEffect } from "react";
import { fontCheckList } from "@nyx-frontend/main/utils/fonts";

export default function useFont() {
  const [list, setList] = useState<Array<string>>([]);

  useEffect(() => {
    fontCheckList().then((data) => {
      setList(data);
    });
  }, []);


  return list;
}
