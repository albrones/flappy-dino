import { KAPLAYCtx } from 'kaplay';
import { PALETTE } from '../kaplayLoader';
import { SCALING_RATIO, SKY_LIMIT } from '../scenes/game';

export function spawnClouds(
  k: KAPLAYCtx<{}, never>,
  speed: number,
  difficulty: number
) {
  const skyRange = k.height() / 2 / SCALING_RATIO;
  const sizeScaler = k.rand(0.7, SCALING_RATIO);
  const colors = [PALETTE.CottonCandy, PALETTE.Illusion, PALETTE.Twilight];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const isFlipped = Boolean(Math.round(Math.random()));
  const cloud = k.make([
    k.sprite('cloud'),
    k.area(),
    k.pos(k.width() + 50, k.rand(SKY_LIMIT, skyRange)),
    k.anchor('center'),
    k.rotate(k.rand(-7, 7)),
    k.color(randomColor),
    k.scale(sizeScaler),
    k.move(k.LEFT, (speed * sizeScaler) / 2),
    'cloud',
    'moving-object',
  ]);
  cloud.flipX = isFlipped;
  k.add(cloud);
  k.wait(k.rand(0.1 * difficulty, 1), () => spawnClouds(k, speed, difficulty));
}
