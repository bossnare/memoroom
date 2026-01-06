import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

export function FilterDrawer({
  isOpen,
  setIsOpen,
}: {
  isOpen?: boolean;
  setIsOpen?: () => void;
}) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="w-full max-w-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>Sort by</DrawerTitle>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="p-4 pb-8">
            <ul className="space-y-4">
              <li>
                <button>Name</button>
              </li>
              <li>
                <button>Date</button>
              </li>
              <li>
                <button>Update</button>
              </li>
            </ul>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
