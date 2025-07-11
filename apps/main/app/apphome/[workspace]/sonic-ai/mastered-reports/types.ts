export type showOptionType = {
  "ai-mastered"?: boolean;
  original?: boolean;
  reference?: boolean;
};

export type Wavesurfer = {
  wavesurfer: { isPlaying: any; playPause: any; stop: any };
} | null;

export type ChartDataType = {
  mainGraph?: any;
  secGraph?: any;
  thirdGraph?: any;
  fourthGraph?: any;
};

type groupType = {
  group: {
    [T: string]: any;
  };
};

export type smallChartType = {
  key: "mood" | "properties" | "context";
  options: showOptionType;
  original: groupType;
  ai_mastered_parameters: groupType;
  reference: groupType;
  titles?: any;
};
