import { create } from 'zustand';

interface LayoutState {
  setIsOpenMobileSidebar: (isOpenMobileSidebar: boolean) => void;
  isOpenMobileSidebar: boolean;
  toggleIsOpenMobileSidebar: () => void;

  setOpenSideOver: (openSideOver: boolean) => void;
  openSideOver: boolean;
  toggleOpenSideOver: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isOpenMobileSidebar: false,
  openSideOver: false,
  setOpenSideOver: (openSideOver: boolean) => set({ openSideOver }),
  setIsOpenMobileSidebar: (isOpenMobileSidebar: boolean) =>
    set({ isOpenMobileSidebar }),
  toggleIsOpenMobileSidebar: () =>
    set((state) => ({ isOpenMobileSidebar: !state.isOpenMobileSidebar })),
  toggleOpenSideOver: () =>
    set((state) => ({ openSideOver: !state.openSideOver })),
}));
