import { Route, Routes } from 'react-router';

import { Paths } from '../../shared';
import { AddPaymentMethodPage } from '../../pages';

const PaymentMethodRoutes = () => (
  <Routes>
    <Route path={Paths.add} element={<AddPaymentMethodPage />} />
  </Routes>
);
PaymentMethodRoutes.displayName = 'PaymentMethodRoutes';

export default PaymentMethodRoutes;
