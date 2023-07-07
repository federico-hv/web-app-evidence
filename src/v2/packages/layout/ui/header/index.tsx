import { Responsive, ResponsiveItem } from '../../../core';
import MdHeader from './md';
import LgHeader from './lg';

function Header() {
  return (
    <Responsive>
      <ResponsiveItem tablet='show' laptop='show'>
        <MdHeader />
      </ResponsiveItem>
      <ResponsiveItem desktop='show'>
        <LgHeader />
      </ResponsiveItem>
    </Responsive>
  );
}
Header.displayName = 'Header';

export { Header };
