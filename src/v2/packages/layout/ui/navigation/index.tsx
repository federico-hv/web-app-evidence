import { Responsive, ResponsiveItem } from '../../../core';
import SmNavigation from './sm';
import LgNavigation from './lg';

function Navigation() {
  return (
    <Responsive>
      <ResponsiveItem mobile='show'>
        <SmNavigation />
      </ResponsiveItem>
      <ResponsiveItem tablet='show' laptop='show' desktop='show'>
        <LgNavigation />
      </ResponsiveItem>
    </Responsive>
  );
}
Navigation.displayName = 'Navigation';

export { Navigation };
