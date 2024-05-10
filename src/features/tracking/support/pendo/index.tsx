import { GenericProps } from '../../interfaces';
import { Fragment, useEffect } from 'react';

function Pendo({ children }: GenericProps) {
  useEffect(() => {
    (function (apiKey) {
      (function (p, e, n, d, o) {
        let v: any, w: any, x: any, y: any, z: any;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        o = p[d] = p[d] || {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        o._q = o._q || [];
        v = [
          'initialize',
          'identify',
          'updateOptions',
          'pageLoad',
          'track',
        ];
        for (w = 0, x = v.length; w < x; ++w)
          (function (m) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            o[m] =
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              o[m] ||
              function () {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                o._q[m === v[0] ? 'unshift' : 'push'](
                  [m].concat([].slice.call(arguments, 0)),
                );
              };
          })(v[w]);
        y = e.createElement(n);
        y.async = !0;
        y.src =
          'https://cdn.pendo.io/agent/static/' + apiKey + '/pendo.js';
        z = e.getElementsByTagName(n)[0];
        z.parentNode.insertBefore(y, z);
      })(window, document, 'script', 'pendo');
    })(import.meta.env.VITE_PENDO_API_KEY);
  }, []);

  return <Fragment>{children}</Fragment>;
}
Pendo.displayName = 'Pendo';

export default Pendo;
