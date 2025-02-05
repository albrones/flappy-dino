import { KAPLAYCtx } from 'kaplay';
import { PALETTE } from '../kaplayLoader';
import { SKY_LIMIT } from '../scenes/game';

export function generateWorld(k: KAPLAYCtx<{}, never>) {
  const worldLimit = k.add([
    k.rect(1, k.height()),
    k.pos(-100, 0),
    k.area(),
    'limit',
  ]);
  const floor = k.add([
    k.sprite('grass'),
    k.pos(0, k.height() + 12),
    k.anchor('botleft'),
    k.area(),
    k.body({ isStatic: true }),
    k.color(PALETTE.LightSkyBlue),
    'floor',
  ]);
  const nbBlock = k.width() / floor.width;
  for (let i = 1; i <= nbBlock + 1; i++) {
    const block = k.make([
      k.sprite('grass'),
      k.pos(floor.width * i, 0),
      k.anchor('botright'),
      k.area(),
      k.body({ isStatic: true }),
      k.color(PALETTE.LightSkyBlue),
    ]);
    block.flipX = Boolean(Math.round(Math.random()));
    floor.add(block);
  }

  const sky = k.add([
    k.rect(k.width(), SKY_LIMIT),
    k.pos(0, -1),
    k.area(),
    k.body({ isStatic: true }),
    'sky',
  ]);

  k.onCollide('portal', 'tree', (portal, tree) => {
    //avoid portal to be at the same position that a collider and not prevent winning
    if (tree.pos.x < portal.pos.x) {
      portal.pos.x += 50;
    }
    if (tree.pos.x > portal.pos.x) {
      portal.pos.x -= 50;
    }
  });

  k.onCollide('limit', 'moving-object', (_, obj) => {
    k.destroy(obj);
  });
}
