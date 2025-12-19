import {
  Archive,
  Bell,
  KeyRound,
  Layers,
  Palette,
  PowerOff,
  Settings,
  Tags,
  Trash2,
  UserCog,
  UserRoundX,
} from 'lucide-react';

import { MagnifyingGlassIcon } from '@phosphor-icons/react';

const kebabMenuLabel = [
  {
    id: 1,
    label: 'Workspace settings',
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
    icon: Trash2,
  },
];

const sideBarLabel = [
  {
    id: 1,
    hiddenOnMobile: true,
    label: 'Account Settings',
    icon: UserCog,
    route: '/app',
  },
  {
    id: 2,
    label: 'Apparence',
    icon: Palette,
    route: '/app/search',
  },
  {
    id: 3,
    label: 'Authentication',
    icon: KeyRound,
    route: '/app/notification',
  },
  {
    id: 4,
    label: 'Trash',
    icon: Trash2,
    route: '/app/tags',
  },
  {
    id: 5,
    label: 'Log out',
    icon: PowerOff,
    route: '/app/tags',
  },
];

const desctructiveLabel = [
  {
    id: 1,
    danger: true,
    label: 'Delete my account',
    icon: UserRoundX,
    route: '/app/tags',
  },
];

const tabLabel = [
  {
    id: 1,
    label: 'Overview',
    icon: Layers,
    route: '/app',
  },
  {
    id: 2,
    label: 'Search',
    icon: MagnifyingGlassIcon,
    route: '/app/search',
  },
  {
    id: 3,
    label: 'Notofications',
    icon: Bell,
    route: '/app/notification',
  },
  {
    id: 4,
    label: 'Tags',
    icon: Tags,
    route: '/app/tags',
  },
];

export { desctructiveLabel, kebabMenuLabel, sideBarLabel, tabLabel };
