import { create } from 'zustand';

interface LayoutState {
  setLoginOpen: (loginOpen: boolean) => void;
  loginOpen: boolean;
  toggleLoginOpen: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  loginOpen: false,
  setLoginOpen: (loginOpen: boolean) => set({ loginOpen }),
  toggleLoginOpen: () => set((state) => ({ loginOpen: !state.loginOpen })),
}));
