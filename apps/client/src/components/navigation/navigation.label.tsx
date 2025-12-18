import {
  Archive,
  Bell,
  Layers,
  Settings,
  Tags,
  Trash,
  UserCog,
  Palette,
  KeyRound,
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
    icon: Trash,
  },
];

const sideOverLabel = [
  {
    id: 1,
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
    icon: Trash,
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

export { kebabMenuLabel, tabLabel, sideOverLabel };
