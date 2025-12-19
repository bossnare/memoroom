// import { useToggle } from '@/hooks/use-toggle';
// import { createContext, useContext } from 'react';

// type UXContextType = {
//   setIsOpenMobileSidebarFalse: () => void;
//   setIsOpenMobileSidebar: () => void;
//   isOpenMobileSidebar: boolean;
//   toggleIsOpenMobileSidebar: () => void;

//   setOpenSideOverFalse: () => void;
//   openSideOver: boolean;
//   toggleOpenSideOver: () => void;
// };

// const UXContext = createContext<UXContextType | null>(null);

// export function UXProvider({ children }: { children: React.ReactNode }) {
//   const {
//     value: isOpenMobileSidebar,
//     setTrue: setIsOpenMobileSidebar,
//     setFalse: setIsOpenMobileSidebarFalse,
//     toggle: toggleIsOpenMobileSidebar,
//   } = useToggle();
//   const {
//     value: openSideOver,
//     toggle: toggleOpenSideOver,
//     setFalse: setOpenSideOverFalse,
//   } = useToggle();

//   return (
//     <UXContext
//       value={{
//         // navigation ux
//         isOpenMobileSidebar,
//         setIsOpenMobileSidebar,
//         setIsOpenMobileSidebarFalse,
//         toggleIsOpenMobileSidebar,

//         openSideOver,
//         setOpenSideOverFalse,
//         toggleOpenSideOver,
//       }}
//     >
//       {children}
//     </UXContext>
//   );
// }

// // eslint-disable-next-line react-refresh/only-export-components
// export function useUX() {
//   const ctx = useContext(UXContext);
//   if (!ctx) throw new Error('useUX must be used inside UXProvider');
//   return ctx;
// }
