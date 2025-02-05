import { GameObj, KAPLAYCtx } from 'kaplay';
import { k, SCALE } from '../kaplayLoader';
import { JUMP_FORCE } from '../scenes/game';

function jump(player: GameObj, speed: number) {
  player.jump(JUMP_FORCE);
  k.play('blip');
  // k.burp({ volume: 0.2 /* detune: 800 */ });
  const mark = k.add([
    'mark',
    k.text('('),
    k.pos(player.pos),
    k.scale(SCALE),
    k.anchor('center'),
    k.move(k.LEFT, speed),
    k.rotate(-30),
  ]);
  k.wait(1, () => {
    k.destroy(mark);
  });
}

export function spawnPlayer(
  k: KAPLAYCtx<{}, never>,
  level: number,
  speed: number,
  playerSprite: string
) {
  const player = k.add([
    k.sprite(playerSprite),
    k.pos(80, 100),
    k.area(),
    k.body(),
  ]);

  // menu if player collides with any game obj with tag "collider"
  player.onCollide('collider', () => {
    k.addKaboom(player.pos);
    k.shake(60);
    k.burp({ volume: 0.5 /* detune: 800 */ });
    k.wait(0.3, () => k.go('menu', level, playerSprite, false));
    k.addKaboom(player.pos);
    k.wait(0.1, () => k.addKaboom(player.pos));
    k.wait(0.2, () => k.addKaboom(player.pos));
    k.wait(0.3, () => k.addKaboom(player.pos));
  });

  player.onCollide('portal', () => {
    k.shake(180);
    k.burp({ volume: 0.5, detune: 100 });
    //TODO: add portal sound
    level++;
    k.wait(0.2, () => k.go('menu', level, playerSprite, true));
  });

  k.onKeyRelease('space', () => jump(player, speed));
  k.onClick(() => jump(player, speed));

  return player;
}
