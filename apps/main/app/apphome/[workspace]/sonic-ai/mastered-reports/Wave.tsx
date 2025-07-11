import { useRef, forwardRef, useImperativeHandle } from "react";
import WaveSurfer from "wavesurfer.js";

type Props = { url: string; id: string; color?: string };

function Wave({ id, url, color = "#75DE64" }: Props, ref: any) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => {
      if (elRef.current) {
        wavesurfer.current = WaveSurfer.create({
          container: "#" + id,
          waveColor: "#fff",
          progressColor: color,
          url: url,
          width: 300,
        });

        wavesurfer.current.on("interaction", () => {
          wavesurfer.current.playPause();
        });
      }

      return {
        wavesurfer: wavesurfer.current,
      };
    },
    [id, color, url]
  );

  if (!url) {
    return null;
  }

  return <div id={id} ref={elRef}></div>;
}

export default forwardRef(Wave);
