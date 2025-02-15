import { KAPLAYCtx } from 'kaplay';
import { k } from '../kaplayLoader';
import { startPortalCountdown } from './countdown';

export function spawnPortal(
  k: KAPLAYCtx<{}, never>,
  speed: number,
  difficulty: number
) {
  if (k.get('portal').length > 0) {
    k.wait(4, () => spawnPortal(k, speed, difficulty));
    return;
  }
  const portal = k.add([
    k.sprite('portal'),
    k.scale(2.2),
    k.pos(k.width(), k.center().y),
    k.area(),
    k.body(),
    k.move(k.LEFT, speed),
    'portal',
    'moving-object',
  ]);
  k.wait(0.16 * difficulty, () => spawnPortal(k, speed, difficulty));
}

export function displayPortalCountdown(k: KAPLAYCtx<{}, never>) {
  const miniPortal = k.add([
    k.sprite('portal'),
    k.pos(k.width() - 50, k.center().y),
    k.area(),
    'mini-portal',
  ]);
  startPortalCountdown(miniPortal, 10);
  k.wait(10, removeMiniPortailUi);
}

export function removeMiniPortailUi() {
  k.get('mini-portal')[0].destroy();
}
