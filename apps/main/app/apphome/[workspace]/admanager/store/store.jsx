// import { create } from 'zustand';

// const useGlobalStore = create((set) => ({
//   // State variables
//   objective: null,  
//   goalId: null,
//   goalData: null,
//   subTopic: null,
//   optionValue: {},
//   channelIdArray: [],
//   channlesArray:[],

//   // Actions to update state
//   setObjective: (objective) => set({ objective }),
//   setGoalId: (goalId) => set({ goalId }),
//   setGoalData: (goalData) => set({ goalData }),
//   setSubTopic: (subTopic) => set({ subTopic }),
//   setOptionValue: (optionValue) => set({ optionValue }),
//   setChannelIdArray: (updater) =>
//     set((state) => ({
//       channelIdArray: typeof updater === 'function' ? updater(state.channelIdArray) : updater,
//     })),
//     setChannelsArray: (updater) =>
//         set((state) => ({
//           channlesArray: typeof updater === 'function' ? updater(state.channlesArray) : updater,
//         })),
// }));

// export default useGlobalStore;



import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useGlobalStore = create(
  persist(
    (set) => ({
      // State variables
      objective: null,
      goalId: null,
      goalData: null,
      subTopic: null,
      optionValue: {},
      channelIdArray: [],
      channlesArray: [],

      // Actions to update state
      setObjective: (objective) => set({ objective }),
      setGoalId: (goalId) => set({ goalId }),
      setGoalData: (goalData) => set({ goalData }),
      setSubTopic: (subTopic) => set({ subTopic }),
      setOptionValue: (optionValue) => set({ optionValue }),
      setChannelIdArray: (updater) =>
        set((state) => ({
          channelIdArray:
            typeof updater === 'function' ? updater(state.channelIdArray) : updater,
        })),
      setChannelsArray: (updater) =>
        set((state) => ({
          channlesArray:
            typeof updater === 'function' ? updater(state.channlesArray) : updater,
        })),
    }),
    {
      name: 'objective-store', // Name of the storage (used as the key in localStorage)
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            ['objective', 'goalId', 'goalData', 'subTopic', 'optionValue'].includes(key),
          )
        ), // Save only specific keys
    }
  )
);

export default useGlobalStore;
