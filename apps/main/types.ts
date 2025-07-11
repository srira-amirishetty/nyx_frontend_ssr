import { fabric } from "fabric";

export type EditorElementBase<T extends string, P> = {
  readonly id: string;
  fabricObject?: fabric.Object;
  name: string;
  readonly type: T;
  placement: Placement;
  timeFrame: TimeFrame;
  properties: P;
};
export type VideoEditorElement = EditorElementBase<
  "video",
  { src: string; elementId: string; imageObject?: fabric.Image; effect: Effect }
>;
export type ImageEditorElement = EditorElementBase<
  "image",
  {
    src: string;
    elementId: string;
    imageObject?: fabric.Object;
    effect: Effect;
  }
>;
export type EmojiEditorElement = EditorElementBase<
  "emoji",
  {
    src: string;
    elementId: string;
    imageObject?: fabric.Object;
    effect: Effect;
  }
>;

export type AudioEditorElement = EditorElementBase<
  "audio",
  { src: string; elementId: string }
>;
export type TextEditorElement = EditorElementBase<
  "text",
  {
    text: string;
    fontSize: number;
    fontWeight: number;
    textAlign: string;
    fill: string;
    backgroundColor: string;
    fontFamily: string;
    underline: boolean;
    splittedTexts: fabric.Text[];
  }
>;

export type IconEditorElement = EditorElementBase<
  "icon",
  {
    path: string; // Path data for the SVG
    fill: string;
    svgObject?: fabric.Object;
  }
>;

export type CircleEditorElement = EditorElementBase<
  "circle",
  {
    radius: number;
    fill: string;
    circleObject?: fabric.Object;
  }
>;

export type TriangleEditorElement = EditorElementBase<
  "triangle",
  {
    sideLength: number;
    fill: string;
    triangleObject?: fabric.Object;
  }
>;

export type SquareEditorElement = EditorElementBase<
  "square",
  {
    sideLength: number;
    fill: string;
    squareObject?: fabric.Object;
  }
>;

export type LineEditorElement = EditorElementBase<
  "line",
  {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke: string;
    strokeWidth: number;
    lineObject?: fabric.Object;
  }
>;

export type HexagonEditorElement = EditorElementBase<
  "hexagon",
  {
    fill: string;
    hexagonObject?: fabric.Object;
  }
>;

export type SemiCircleEditorElement = EditorElementBase<
  "semiCircle",
  {
    radius: number;
    fill: string;
    semiCircleObject?: fabric.Object;
  }
>;
export type ParallelogramEditorElement = EditorElementBase<
  "parallelogram",
  {
    width: number;
    height: number;
    fill: string;
    parallelogramObject?: fabric.Object;
  }
>;

export type EditorElement =
  | VideoEditorElement
  | ImageEditorElement
  | AudioEditorElement
  | TextEditorElement
  | EmojiEditorElement
  | IconEditorElement
  | CircleEditorElement
  | TriangleEditorElement
  | SquareEditorElement
  | LineEditorElement
  | HexagonEditorElement
  | SemiCircleEditorElement
  | ParallelogramEditorElement;

export type Placement = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
};

export type TimeFrame = {
  start: number;
  end: number;
};

export type EffectBase<T extends string> = {
  type: T;
};

export type BlackAndWhiteEffect =
  | EffectBase<"none">
  | EffectBase<"blackAndWhite">
  | EffectBase<"sepia">
  | EffectBase<"invert">
  | EffectBase<"saturate">;
export type Effect = BlackAndWhiteEffect;
export type EffecType = Effect["type"];

export type AnimationBase<T, P = {}> = {
  id: string;
  targetId: string;
  duration: number;
  type: T;
  properties: P;
};

export type FadeInAnimation = AnimationBase<"fadeIn">;
export type FadeOutAnimation = AnimationBase<"fadeOut">;

export type BreatheAnimation = AnimationBase<"breathe">;

export type SlideDirection = "left" | "right" | "top" | "bottom";
export type SlideTextType = "none" | "character";
export type SlideInAnimation = AnimationBase<
  "slideIn",
  {
    direction: SlideDirection;
    useClipPath: boolean;
    textType: "none" | "character";
  }
>;

export type SlideOutAnimation = AnimationBase<
  "slideOut",
  {
    direction: SlideDirection;
    useClipPath: boolean;
    textType: SlideTextType;
  }
>;

export type Animation =
  | FadeInAnimation
  | FadeOutAnimation
  | SlideInAnimation
  | SlideOutAnimation
  | BreatheAnimation;

export type MenuOption =
  | "GenAI"
  | "Emojis"
  | "Video"
  | "Audio"
  | "Text"
  | "Image"
  | "Export"
  | "Animation"
  | "Effect"
  | "Fill";
