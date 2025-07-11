"use client";
import { useEffect, useReducer } from "react";

type WorkspaceState = {
  workspace: string;
};

type WorkspaceAction =
  | { type: "SET_WORKSPACE"; payload: string }
  | { type: "RESET_WORKSPACE" };

function workspaceReducer(
  state: WorkspaceState,
  action: WorkspaceAction,
): WorkspaceState {
  switch (action.type) {
    case "SET_WORKSPACE":
      return { ...state, workspace: action.payload };
    case "RESET_WORKSPACE":
      return { ...state, workspace: "" };
    default:
      return state;
  }
}

const initialState: WorkspaceState = {
  workspace: "",
};

function useWorkspace() {
  const [state, dispatch] = useReducer(workspaceReducer, initialState);

  useEffect(() => {
    const workspace_name = localStorage.getItem("workspace_name");
    if (workspace_name) {
      dispatch({ type: "SET_WORKSPACE", payload: workspace_name });
    }
  }, []);

  const setWorkspace = (name: string) => {
    dispatch({ type: "SET_WORKSPACE", payload: name });
  };

  const resetWorkspace = () => {
    dispatch({ type: "RESET_WORKSPACE" });
  };

  return { workspace: state.workspace, setWorkspace, resetWorkspace };
}

export default useWorkspace;
