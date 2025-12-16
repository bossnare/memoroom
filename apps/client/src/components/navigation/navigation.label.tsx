import {
  Settings,
  UserCog,
  Trash,
  Archive,
  Layers,
  Tags,
  Bell,
} from 'lucide-react';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const miniNavLabel = [
  {
    id: 1,
    label: 'Worksape settings',
    icon: Settings,
  },
  {
    id: 2,
    label: 'Account health',
    icon: UserCog,
  },
  {
    id: 3,
    label: 'Archives',
    icon: Archive,
  },
  {
    id: 4,
    label: 'Trash',
    icon: Trash,
  },
];

const tabLabel = [
  {
    id: 1,
    label: 'Overview',
    icon: Layers,
    route: '/dashboard',
  },
  {
    id: 2,
    label: 'Search',
    icon: MagnifyingGlassIcon,
    route: '/dashboard/search',
  },
  {
    id: 1,
    label: 'Notofications',
    icon: Bell,
    route: '/dashboard/notification',
  },
  {
    id: 1,
    label: 'Tags',
    icon: Tags,
    route: '/dashboard/tags',
  },
];

export { miniNavLabel, tabLabel };
