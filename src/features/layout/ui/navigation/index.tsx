import { Responsive, ResponsiveItem } from '../../../../shared/components';
// import SmNavigation from './sm';
import LgNavigation from './lg';

function Navigation() {
  return (
    <Responsive>
      <ResponsiveItem tablet='show' laptop='show' desktop='show'>
        <LgNavigation />
      </ResponsiveItem>
    </Responsive>
  );
}
Navigation.displayName = 'Navigation';

export { Navigation };
