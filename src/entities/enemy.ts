import { KAPLAYCtx } from 'kaplay';
import { PALETTE } from '../kaplayLoader';
import { SCALING_RATIO, SKY_LIMIT } from '../scenes/game';

export function spawnEnemies(
  k: KAPLAYCtx<{}, never>,
  speed: number,
  difficulty: number
) {
  const skyRange = k.height() / 2 / SCALING_RATIO;
  const sizeScaler = k.rand(0.7, 1.2);
  const colors = [PALETTE.CottonCandy, PALETTE.Illusion, PALETTE.Twilight];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const enemie = k.make([
    k.sprite('goldfly'),
    k.rotate(180),
    k.area(),
    k.pos(k.width() + 50, k.rand(SKY_LIMIT + 50, skyRange - 50)),
    k.anchor('center'),
    k.rotate(k.rand(-7, 7)),
    k.color(randomColor),
    k.scale(sizeScaler),
    k.move(k.LEFT, speed * sizeScaler),
    'enemie',
    'collider',
    'moving-object',
  ]);
  enemie.flipX = true;
  k.add(enemie);
  k.wait(k.rand(1 * difficulty, 2.6), () => spawnEnemies(k, speed, difficulty));
}
