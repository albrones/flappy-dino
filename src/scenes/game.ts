import { GameObj, KAPLAYCtx } from 'kaplay';
import { PALETTE } from '../kaplayLoader';

const FLOOR_HEIGHT = 62;
const TREE_DEFAULT_SIZE = 50;
const CEILING_HEIGHT = 3;
const JUMP_FORCE = 800;
const SPEED = 480;

export const initGameScene = (
  k: KAPLAYCtx<{}, never>,
  playerSprite: string
) => {
  function jump(player: GameObj) {
    player.jump(JUMP_FORCE);
    k.play('blip');
    k.shake(3);
    const mark = k.add([
      'mark',
      k.text('('),
      k.pos(player.pos),
      k.scale(2),
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
    ]);
  }

  function spawnTreeFloor(k: KAPLAYCtx<{}, never>) {
    let tree = k.add([
      k.rect(TREE_DEFAULT_SIZE, k.rand(32, 96)),
      k.area(),
      k.outline(4),
      k.pos(k.width(), k.height() - FLOOR_HEIGHT),
      k.anchor('botleft'),
      k.color(PALETTE.VinRouge),
      k.move(LEFT, SPEED),
      'tree',
      'collider',
    ]);
    const nbLeaf = k.rand(2, 5);
    for (let i = 0; i <= nbLeaf; i++) {
      addLeaf(k, tree, i);
    }
    tree.onCollide('limit', () => {
      k.destroy(tree);
    });
    // wait a random amount of time to spawn next tree
    k.wait(k.rand(0.5, 1.5), () => spawnTreeFloor(k));
  }

  function spawnClouds(k: KAPLAYCtx<{}, never>) {
    const width = k.width();
    const height = k.height();
    const sizeScaler = k.rand(1, 2.3);
    const colors = [PALETTE.CottonCandy, PALETTE.Illusion, PALETTE.Twilight];
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
      'collider',
    ]);
    cloud.flipX = Boolean(Math.round(Math.random()));
    cloud.onCollide('limit', () => {
      k.destroy(cloud);
    });
    k.add(cloud);
    k.wait(k.rand(0.1, 1.6), () => spawnClouds(k));
  }

  function spawnTrees(k: KAPLAYCtx<{}, never>) {
    spawnTreeFloor(k);
    spawnClouds(k);
  }

  function generateWorld(k: KAPLAYCtx<{}, never>) {
    const floor = k.add([
      k.sprite('grass'),
      k.pos(0, k.height()),
      k.anchor('botleft'),
      k.area(),
      k.body({ isStatic: true }),
      k.color(PALETTE.LightSkyBlue),
      'floor',
    ]);
    const nbGrass = k.width() / floor.width;
    for (let i = 1; i <= nbGrass; i++) {
      const block = k.make([
        k.sprite('grass'),
        k.pos(floor.width * i, 0),
        k.anchor('botleft'),
        k.area(),
        k.body({ isStatic: true }),
        k.color(PALETTE.LightSkyBlue),
      ]);
      block.flipX = Boolean(Math.round(Math.random()));
      floor.add(block);
    }

    const ceiling = k.add([
      k.rect(k.width(), CEILING_HEIGHT),
      k.outline(4),
      k.pos(0, 0),
      k.anchor('topleft'),
      k.area(),
      k.body({ isStatic: true }),
      k.color(PALETTE.LightSlateBlue),
      'ceiling',
    ]);
  }
  /* MAIN */
  k.setGravity(1600);
  // add a game object to screen
  const player = k.add([
    k.sprite(playerSprite),
    k.pos(80, FLOOR_HEIGHT),
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
  // jump when user press space or click
  k.onKeyPress('space', () => jump(player));
  k.onClick(() => jump(player));
  spawnTrees(k);
  // menu if player collides with any game obj with tag "collider"
  player.onCollide('collider', () => {
    // go to "menu" scene and pass the score
    k.addKaboom(player.pos);
    k.shake(120);
    k.burp({ volume: 0.5 /* detune: 800 */ });
    k.wait(0.3, () => k.go('menu-score', score, playerSprite));
    k.addKaboom(player.pos);
    k.wait(0.1, () => k.addKaboom(player.pos));
    k.wait(0.2, () => k.addKaboom(player.pos));
    k.wait(0.3, () => k.addKaboom(player.pos));
  });

  // keep track of score
  let score: number = 0;
  const scoreLabel = k.add([k.text(String(score)), k.pos(24, 24)]);

  // increment score every frame
  k.onUpdate(() => {
    score++;
    scoreLabel.text = String(score);
    player.use(k.sprite(playerSprite));
  });
};
