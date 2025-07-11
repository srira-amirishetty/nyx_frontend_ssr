export const TOKEN = "token";
export const WORKSPACE_NAME = "workspace_name";
export const WORKSPACE_ARRAY = "WorkspaceArray";
export const WORKSPACE_ARRAY_SLUG = "WorkspaceArrayslug";
export const NYX_LAST_PATHNAME = "nyx-redirect";
export const WORKSPACE_ID= "workspace_id";

export const saveRedirectStorage = async (pathname: string): Promise<boolean> => {

  try {
    localStorage.setItem(NYX_LAST_PATHNAME, pathname);
    sessionStorage.setItem(NYX_LAST_PATHNAME, pathname);
    return Promise.resolve(true);
  } catch {
    return Promise.reject(false);
  }
};

export const removeRedirectStorage = async (): Promise<boolean> => {
  try {
    localStorage.removeItem(NYX_LAST_PATHNAME);
    sessionStorage.removeItem(NYX_LAST_PATHNAME);
    return Promise.resolve(true);
  } catch {
    return Promise.reject(false);
  }
};

export const getRedirectLocalStorage = async (): Promise<null | string> => {
  try {
    const pathname = localStorage.getItem(NYX_LAST_PATHNAME);
    if (!pathname) {
      throw new Error(`No Data ${NYX_LAST_PATHNAME}`);
    }

    return Promise.resolve(pathname);
  } catch {
    return Promise.reject(null);
  }
};

export const getRedirectSessionStorage = async (): Promise<null | string> => {
  try {
    const pathname = sessionStorage.getItem(NYX_LAST_PATHNAME);
    if (!pathname) {
      throw new Error(`No Data ${NYX_LAST_PATHNAME}`);
    }

    return Promise.resolve(pathname);
  } catch {
    return Promise.reject(null);
  }
};

export function removeStorage() {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(WORKSPACE_ARRAY);
      localStorage.removeItem(WORKSPACE_ARRAY_SLUG);
      localStorage.removeItem(WORKSPACE_NAME);
      localStorage.removeItem(WORKSPACE_ID);
      resolve(true);
    } catch {
      reject(false);
    }
  });
}


export function checkEmailExisted(){
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(WORKSPACE_ARRAY);
      localStorage.removeItem(WORKSPACE_ARRAY_SLUG);
      localStorage.removeItem(WORKSPACE_NAME);
      localStorage.removeItem(WORKSPACE_ID);
      resolve(true);
    } catch {
      reject(false);
    }
  });
}

export function getStorageTokenWorkspace() {
  const token = localStorage.getItem(TOKEN);
  const workspaceArrayLocalStorage = localStorage.getItem(WORKSPACE_ARRAY);
  const workspaceArray: Array<string> | null = workspaceArrayLocalStorage
    ? JSON.parse(workspaceArrayLocalStorage)
    : null;
  const workspaceArrayslugLocalStorage =
    localStorage.getItem(WORKSPACE_ARRAY_SLUG);
  const workspaceArrayslug: Array<string> | null =
    workspaceArrayslugLocalStorage
      ? JSON.parse(workspaceArrayslugLocalStorage)
      : null;

  return { token, workspaceArray, workspaceArrayslug };
}

export function getTokenAndWorkspace() {
  const tokenStored = localStorage.getItem(TOKEN);
  const token = tokenStored ? tokenStored : null;

  const workdataStored = localStorage.getItem(WORKSPACE_NAME);
  const workdata = workdataStored ? workdataStored : null;

  return { token, workdata };
}
