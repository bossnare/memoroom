import {
  Archive,
  Bell,
  KeyRound,
  Home,
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
    label: 'Account settings',
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
    label: 'Settings',
    icon: Settings,
    route: '/app/settings',
  },
  {
    id: 2,
    label: 'Appearance',
    icon: Palette,
    route: '/app/appearance',
  },
  {
    id: 3,
    label: 'Authentication',
    icon: KeyRound,
    route: '/app/authentication',
  },
  {
    id: 4,
    label: 'Trash',
    icon: Trash2,
    route: '/app/trash',
  },
  {
    id: 5,
    label: 'Log out',
    icon: PowerOff,
    route: '#',
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
    icon: Home,
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
