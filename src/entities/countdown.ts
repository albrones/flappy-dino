import { GameObj } from 'kaplay';
import { k, SCALE } from '../kaplayLoader';
import { removeMiniPortailUi } from './portal';

export function countdown(number: number | string) {
  return k.make([
    k.text(String(number)),
    k.scale(SCALE + 2),
    k.anchor('center'),
    k.pos(k.center()),
  ]);
}

function miniCountdown(number: number | string) {
  return k.make([
    k.text(String(number)),
    k.scale(SCALE / 2),
    k.anchor('center'),
  ]);
}

export function startGameCountdown() {
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

export function startPortalCountdown(portal: GameObj, time: number) {
  let i = 0;
  k.loop(
    1,
    () => {
      const current = miniCountdown(time - i);
      portal.add(current);
      k.wait(1, () => {
        current.destroy();
      });
      i++;
    },
    time
  ).then(() => removeMiniPortailUi);
}
