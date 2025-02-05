import { KAPLAYCtx } from 'kaplay';

export function spawnPortal(
  k: KAPLAYCtx<{}, never>,
  speed: number,
  difficulty: number
) {
  if (k.get('portal').length > 0) {
    k.wait(4, () => spawnPortal(k, speed, difficulty));
    return;
  }
  let portal = k.add([
    k.sprite('portal'),
    k.scale(2.2),
    k.pos(k.width(), /* 0 */ k.height() / 2),
    k.area(),
    k.body(),
    k.move(k.LEFT, speed),
    'portal',
    'moving-object',
  ]);
  k.wait(0.16 * difficulty, () => spawnPortal(k, speed, difficulty));
}
