import { expect, test, describe, beforeEach } from "vitest";
import {
  getTokenAndWorkspace,
  TOKEN,
  WORKSPACE_NAME,
  getStorageTokenWorkspace,
  WORKSPACE_ARRAY,
  WORKSPACE_ARRAY_SLUG,
  removeStorage,
  saveRedirectStorage,
  removeRedirectStorage,
  NYX_LAST_PATHNAME
} from "../userUtils";

describe("getTokenAndWorkspace", () => {
  beforeEach(() => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(WORKSPACE_NAME);
  });

  test("token: ABC", () => {
    localStorage.setItem(TOKEN, "ABC");
    const { token } = getTokenAndWorkspace();
    expect(token).toBe("ABC");
  });

  test("token: null", () => {
    const { token } = getTokenAndWorkspace();
    expect(token).toBeNull();
  });

  test("workspace_name: ABC", () => {
    localStorage.setItem(WORKSPACE_NAME, "ABC");
    const { workdata } = getTokenAndWorkspace();
    expect(workdata).toBe("ABC");
  });

  test("workspace_name: null", () => {
    const { workdata } = getTokenAndWorkspace();
    expect(workdata).toBeNull();
  });
});

describe("getStorageTokenWorkspace", () => {
  beforeEach(() => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(WORKSPACE_NAME);
    localStorage.removeItem(WORKSPACE_ARRAY);
    localStorage.removeItem(WORKSPACE_ARRAY_SLUG);
  });

  test("token: ABC", () => {
    localStorage.setItem(TOKEN, "ABC");
    const { token } = getStorageTokenWorkspace();
    expect(token).toBe("ABC");
  });

  test("token: null", () => {
    const { token } = getStorageTokenWorkspace();
    expect(token).toBeNull();
  });

  test("workspaceArray: ['ABC']", () => {
    localStorage.setItem(WORKSPACE_ARRAY, JSON.stringify(["ABC"]));
    const { workspaceArray } = getStorageTokenWorkspace();
    expect(workspaceArray).toEqual(["ABC"]);
  });

  test("workspaceArray: null", () => {
    const { workspaceArray } = getStorageTokenWorkspace();
    expect(workspaceArray).toBeNull();
  });

  test("workspaceArrayslug: ['ABC']", () => {
    localStorage.setItem(WORKSPACE_ARRAY_SLUG, JSON.stringify(["ABC"]));
    const { workspaceArrayslug } = getStorageTokenWorkspace();
    expect(workspaceArrayslug).toEqual(["ABC"]);
  });

  test("workspaceArrayslug: null", () => {
    const { workspaceArrayslug } = getStorageTokenWorkspace();
    expect(workspaceArrayslug).toBeNull();
  });
});

describe("removeStorage", () => {
  beforeEach(() => {
    localStorage.setItem(TOKEN, "ABC");
    localStorage.setItem(WORKSPACE_NAME, "ABC");
    localStorage.setItem(WORKSPACE_ARRAY, JSON.stringify(["ABC"]));
    localStorage.setItem(WORKSPACE_ARRAY_SLUG, JSON.stringify(["ABC"]));
  });

  test("remove all Local Storage", async () => {
    localStorage.setItem(TOKEN, "ABC");
    localStorage.setItem(WORKSPACE_NAME, "ABC");
    localStorage.setItem(WORKSPACE_ARRAY, JSON.stringify(["ABC"]));
    localStorage.setItem(WORKSPACE_ARRAY_SLUG, JSON.stringify(["ABC"]));
    await removeStorage();
    const token = localStorage.getItem(TOKEN);
    const workspace = localStorage.getItem(WORKSPACE_NAME);
    const workspace_slug = localStorage.getItem(WORKSPACE_ARRAY);
    const workspace_array_slug = localStorage.getItem(WORKSPACE_ARRAY_SLUG);
    expect(token).toBeNull();
    expect(workspace).toBeNull();
    expect(workspace_array_slug).toBeNull();
    expect(workspace_slug).toBeNull();
  });
});

describe("saveRedirectStorage and removeRedirectStorage", () => {
  beforeEach(() => {
    localStorage.removeItem(NYX_LAST_PATHNAME);
  });

  test("Pathname: ABC", async () => {
    await saveRedirectStorage("ABC");
    const pathname = localStorage.getItem(NYX_LAST_PATHNAME);
    expect(pathname).toBe("ABC");
  });

  test("Pathname: null", async () => {
    // @ts-ignore
    await saveRedirectStorage();
    const pathname = localStorage.getItem(NYX_LAST_PATHNAME);
    expect(pathname).toBe("undefined");
  });

  test("Pathname: removed", async () => {
    localStorage.setItem(NYX_LAST_PATHNAME, "ABC");
    await removeRedirectStorage();
    const token = localStorage.getItem(NYX_LAST_PATHNAME);
    expect(token).toBeNull();
  });
});

describe("getRedirectLocalStorage and getRedirectSessionStorage", () => {
  beforeEach(() => {
    localStorage.removeItem(NYX_LAST_PATHNAME);
    sessionStorage.removeItem(NYX_LAST_PATHNAME);
  });

  test("Pathname: ABC", async () => {
    await saveRedirectStorage("ABC");
    const pathname = localStorage.getItem(NYX_LAST_PATHNAME);
    const pathnameSession = sessionStorage.getItem(NYX_LAST_PATHNAME);
    expect(pathname).toBe("ABC");
    expect(pathnameSession).toBe("ABC");
  });

  test("Pathname: null", async () => {
    // @ts-ignore
    await saveRedirectStorage();
    const pathname = localStorage.getItem(NYX_LAST_PATHNAME);
    const pathnameSession = sessionStorage.getItem(NYX_LAST_PATHNAME);
    expect(pathname).toBe("undefined");
    expect(pathnameSession).toBe("undefined");
  });
});