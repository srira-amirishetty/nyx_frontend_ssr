import { test, expect } from "vitest";
import {
  about_title,
  about_description,
  accessdenied_title,
  accessdenied_description,
  calenderMeta,
} from "../metas"; // Assuming `constants.js` is in the same directory

test("exported constants have expected values", async () => {
  expect(about_title).toBe("ABOUT");
  expect(about_description).toBe("ABOUT");
  expect(accessdenied_title).toBe("Access Denied");
  expect(accessdenied_description).toBe("Access Denied");
  expect(calenderMeta.title).toBe("Experts Calendar");
  expect(calenderMeta.description).toBe(
    "Calendar for Select date and time with Experts",
  );
});
