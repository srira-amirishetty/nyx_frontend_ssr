import { create } from "zustand";

const useStore = create((set) => ({
  state: {
    element1: false,
    element2: false,
    element3: false,
    element4: false,
    element5: false,
  },
  // Functions to toggle each element
  toggleElement1: () =>
    set((state) => ({
      state: { ...state.state, element1: !state.state.element1 },
    })),
  toggleElement2: () =>
    set((state) => ({
      state: { ...state.state, element2: !state.state.element2 },
    })),
  toggleElement3: () =>
    set((state) => ({
      state: { ...state.state, element3: !state.state.element3 },
    })),
  toggleElement4: () =>
    set((state) => ({
      state: { ...state.state, element4: !state.state.element4 },
    })),
  toggleElement5: () =>
    set((state) => ({
      state: { ...state.state, element5: !state.state.element5 },
    })),
  // Or you can create a function to set a specific element's value directly
  setElement: (elementKey, value) =>
    set((state) => ({
      state: { ...state.state, [elementKey]: value },
    })),
}));

export default useStore;
