import { NavLink } from 'react-router-dom';
import { tabLabel } from './label';
import { Tab } from './Tab';
import { useLayoutStore } from '@/app/stores/layoutStore';

export function NavTab() {
  const isOpenPanel = useLayoutStore((s) => s.isOpenPanel);

  return (
    <>
      {tabLabel.map((t) => (
        <li title={!isOpenPanel ? t.label : ''} key={t.id}>
          <NavLink to={t.route} end={t.route === '/app'}>
            {({ isActive }) => (
              <Tab isActive={isActive} Icon={t.icon} label={t.label} />
            )}
          </NavLink>
        </li>
      ))}
    </>
  );
}
