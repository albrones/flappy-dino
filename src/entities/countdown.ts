import { k, SCALE } from '../kaplayLoader';

function countdown(number: number | string) {
  return k.make([
    k.text(String(number)),
    k.scale(SCALE + 2),
    k.anchor('center'),
    k.pos(k.width() / 2, k.height() / 2),
  ]);
}
export function startCountdown() {
  const three = countdown(3);
  const two = countdown(2);
  const one = countdown(1);
  const go = countdown('GO !');
  k.add(three);
  k.wait(1, () => {
    three.destroy();
    k.add(two);
  });
  k.wait(2, () => {
    two.destroy();
    k.add(one);
  });
  k.wait(3, () => {
    one.destroy();
    k.add(go);
  });
  k.wait(3.2, () => {
    go.destroy();
  });
}
