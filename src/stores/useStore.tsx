import { create } from "zustand";
import { shallow } from "zustand/shallow";
import type { HistoryResponse } from "../types/apiResponse.types";
interface AppState {
  loading: boolean;
  usersArdaTorre: HistoryResponse[];
  searched: boolean;
  setState: (state: Partial<AppState>) => void;
}

export const useStore = create<AppState>((set) => ({
  loading: false,
  usersArdaTorre: [],
  searched: false,
  setState: (newState: Partial<AppState>) =>
    set((state) => {
      const isSame = shallow(state, { ...state, ...newState });
      return isSame ? state : { ...state, ...newState };
    }),
}));
