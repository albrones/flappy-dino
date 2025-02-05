import { KAPLAYCtx } from 'kaplay';
import { spawnClouds } from '../entities/cloud';
import { startCountdown } from '../entities/countdown';
import { spawnEnemies } from '../entities/enemy';
import { spawnPlayer } from '../entities/player';
import { spawnPortal } from '../entities/portal';
import { spawnTrees } from '../entities/tree';
import { generateWorld } from '../entities/world';
import { k } from '../kaplayLoader';

export const SCALING_RATIO = 1.67;
export const FLOOR_HEIGHT = 52;
export const SKY_LIMIT = 1;
export const JUMP_FORCE = 800;
export const DEFAULT_SPEED = 432;
const heigthWidthRatio = k.height() / k.width();

export const initGameScene = (
  k: KAPLAYCtx<{}, never>,
  level: number,
  playerSprite: string
) => {
  const speed = DEFAULT_SPEED + 48 * level;

  function spawnGameObjects(k: KAPLAYCtx<{}, never>) {
    spawnClouds(k, speed, heigthWidthRatio);
    k.wait(3, () => spawnTrees(k, speed, heigthWidthRatio));
    k.wait(3, () => spawnEnemies(k, speed, heigthWidthRatio));
    k.wait(13 * level, () => spawnPortal(k, speed, heigthWidthRatio));
  }
  function main() {
    k.setGravity(1600);
    const player = spawnPlayer(k, level, speed, playerSprite);
    generateWorld(k);
    startCountdown();
    spawnGameObjects(k);

    const currentLevelLabel = k.add([k.text(`Level: ${level}`), k.pos(24, 24)]);
    k.onUpdate(() => {
      player.use(k.sprite(playerSprite));
    });
  }

  main();
};
