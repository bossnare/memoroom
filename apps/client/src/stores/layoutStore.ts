import { create } from 'zustand';

interface LayoutState {
  setIsOpenMobileSidebar: (isOpenMobileSidebar: boolean) => void;
  isOpenMobileSidebar: boolean;
  toggleIsOpenMobileSidebar: () => void;

  setOpenSideOver: (openSideOver: boolean) => void;
  openSideOver: boolean;
  toggleOpenSideOver: () => void;

  isOpenPanel: boolean;
  setIsOpenPanel: (isOpenPanel: boolean) => void;
  toggleOpenPanel: () => void;

  // global loading state
  appLoading: boolean;
  setAppLoading: (appLoading: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isOpenMobileSidebar: false,
  openSideOver: false,
  isOpenPanel: true,
  appLoading: false,
  setOpenSideOver: (openSideOver: boolean) => set({ openSideOver }),
  setIsOpenMobileSidebar: (isOpenMobileSidebar: boolean) =>
    set({ isOpenMobileSidebar }),
  toggleIsOpenMobileSidebar: () =>
    set((state) => ({ isOpenMobileSidebar: !state.isOpenMobileSidebar })),
  toggleOpenSideOver: () =>
    set((state) => ({ openSideOver: !state.openSideOver })),
  toggleOpenPanel: () => set((state) => ({ isOpenPanel: !state.isOpenPanel })),
  setIsOpenPanel: (isOpenPanel: boolean) => set({ isOpenPanel }),
  setAppLoading: (appLoading: boolean) => set({ appLoading }),
}));
