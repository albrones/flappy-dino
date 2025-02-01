import { GameObj, KAPLAYCtx } from 'kaplay';
import { PALETTE, SCALE } from '../kaplayLoader';

export const initGameScene = (
  k: KAPLAYCtx<{}, never>,
  playerSprite: string
) => {
  const SCALING_RATIO = 1.67;
  const FLOOR_HEIGHT = 52;
  const SKY_LIMIT = 1;
  const JUMP_FORCE = 800;
  const SPEED = 480;

  function jump(player: GameObj) {
    player.jump(JUMP_FORCE);
    k.play('blip');
    // k.burp({ volume: 0.2 /* detune: 800 */ });
    const mark = k.add([
      'mark',
      k.text('('),
      k.pos(player.pos),
      k.scale(SCALE),
      k.anchor('center'),
      k.move(k.LEFT, SPEED),
      k.rotate(-30),
    ]);
    k.wait(1, () => {
      k.destroy(mark);
    });
  }

  function addLeaf(k: KAPLAYCtx<{}, never>, tree: GameObj, i: number) {
    const heightFactor = i + 1;
    const leafGrowthFactor = heightFactor * 10;
    const leaftWidth = tree.width * 2.3 - leafGrowthFactor;
    const leaftRadius = leaftWidth / Math.sqrt(2);
    const treeCenter = tree.width / 2;
    const rotation = 45;
    tree.add([
      k.polygon([k.vec2(0, leaftWidth), k.vec2(leaftWidth, 0), k.vec2(0, 0)]),
      k.pos(treeCenter, -tree.height + 15 - leaftRadius * heightFactor),
      k.area(),
      k.rotate(rotation),
      k.outline(4),
      k.color(PALETTE.OceanGreen),
      'leaf',
      'collider',
      'moving-object',
    ]);
  }

  function spawnTrees(k: KAPLAYCtx<{}, never>) {
    const minSize = FLOOR_HEIGHT / SCALING_RATIO;
    const maxSize = (minSize * 3) / SCALING_RATIO;
    let tree = k.add([
      k.rect(k.rand(minSize, maxSize), k.rand(minSize, maxSize / 2)),
      k.area(),
      k.outline(4),
      k.pos(k.width() + 50, k.height() - FLOOR_HEIGHT),
      k.anchor('botleft'),
      k.color(PALETTE.VinRouge),
      k.move(k.LEFT, SPEED),
      'tree',
      'collider',
      'moving-object',
    ]);
    const nbLeaf = k.rand(2, 5);
    for (let i = 0; i <= nbLeaf; i++) {
      addLeaf(k, tree, i);
    }
    k.wait(k.rand(0.3, 1.7), () => spawnTrees(k));
  }

  function spawnClouds(k: KAPLAYCtx<{}, never>) {
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
      k.move(k.LEFT, (SPEED * sizeScaler) / 2),
      'cloud',
      'moving-object',
    ]);
    cloud.flipX = isFlipped;
    k.add(cloud);
    k.wait(k.rand(0.1, 1), () => spawnClouds(k));
  }

  function spawnEnemies(k: KAPLAYCtx<{}, never>) {
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
      k.move(k.LEFT, SPEED * sizeScaler),
      'enemie',
      'collider',
      'moving-object',
    ]);
    enemie.flipX = true;
    k.add(enemie);
    k.wait(k.rand(1, 2.6), () => spawnEnemies(k));
  }

  function spawnGameObjects(k: KAPLAYCtx<{}, never>) {
    spawnTrees(k);
    spawnClouds(k);
    spawnEnemies(k);
  }

  function generateWorld(k: KAPLAYCtx<{}, never>) {
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
  }

  /* MAIN */
  k.setGravity(1600);
  const player = k.add([
    k.sprite(playerSprite),
    k.pos(80, 100),
    k.area(),
    k.body(),
  ]);
  const worldLimit = k.add([
    k.rect(1, k.height()),
    k.pos(-100, 0),
    k.area(),
    'limit',
  ]);

  generateWorld(k);
  k.onKeyPress('space', () => jump(player));
  k.onClick(() => jump(player));
  spawnGameObjects(k);
  // menu if player collides with any game obj with tag "collider"
  player.onCollide('collider', () => {
    k.addKaboom(player.pos);
    k.shake(60);
    k.burp({ volume: 0.5 /* detune: 800 */ });
    k.wait(0.3, () => k.go('menu-score', score, playerSprite));
    k.addKaboom(player.pos);
    k.wait(0.1, () => k.addKaboom(player.pos));
    k.wait(0.2, () => k.addKaboom(player.pos));
    k.wait(0.3, () => k.addKaboom(player.pos));
  });

  k.onCollide('limit', 'moving-object', (_, obj) => {
    k.destroy(obj);
  });

  let score: number = 0;
  const scoreLabel = k.add([k.text(String(score)), k.pos(24, 24)]);
  k.onUpdate(() => {
    score++;
    scoreLabel.text = String(score);
    player.use(k.sprite(playerSprite));
  });
};
