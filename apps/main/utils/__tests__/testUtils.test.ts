import { test, expect } from "vitest";
import { manipulateFileName, manipulateSongName } from "../textUtils";

test('manipulateFileName: if more than 16', async () => {
  expect(manipulateFileName("username_file_with_extenstion_long_text.txt")).toBe("user...xt.txt");
});

test('manipulateFileName: if less than 16', async () => {
  expect(manipulateFileName("filename.txt")).toBe("filename.txt");
})

test('manipulateSongName: if more than 16', async () => {
  expect(manipulateSongName("song_file_with.mp3")).toBe("song_f...th.mp3");
});

test('manipulateSongName: if less than 16', async () => {
  expect(manipulateSongName("mysong_onetwo")).toBe("mysong_onetwo");
})