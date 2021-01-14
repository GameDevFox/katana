import { expect } from 'chai';

import { order } from './order';

it('order', () => {
  const orderMap = {
    beta: { afterMe: ['omega'], beforeMe: ['alpha'] },
    omega: { beforeMe: ['alpha', 'theta'] },
    alpha: {},
    delta: { afterMe: ['omega'] },
    theta: { beforeMe: ['delta'] },
  };

  const myOrder = order(orderMap);
  expect(myOrder).to.deep.equal(['alpha', 'beta', 'delta', 'theta', 'omega']);
});
