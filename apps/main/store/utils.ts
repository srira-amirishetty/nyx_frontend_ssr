import { EditorElement } from "@nyx-frontend/main/types";

export function updateProps(
  selectedElement: EditorElement | null,
  key: string = "",
  value: unknown,
) {
  const fabricObject = selectedElement?.fabricObject;
  if (selectedElement || fabricObject) {
    // @ts-ignore
    selectedElement.properties[`${key}`] = value;
    // @ts-ignore
    fabricObject?.set(`${key}`, value);
  }
}

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}