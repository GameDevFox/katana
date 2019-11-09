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
  myOrder.should.deep.equal(['alpha', 'beta', 'delta', 'theta', 'omega']);
});
