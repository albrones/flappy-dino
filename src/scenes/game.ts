import { GameObj, KAPLAYCtx } from 'kaplay';

const FLOOR_HEIGHT = 86;
const TREE_DEFAULT_SIZE = 50;
const CEILING_HEIGHT = 124;
const JUMP_FORCE = 800;
const SPEED = 480;

export const initGameScene = (
  k: KAPLAYCtx<{}, never>,
  playerSprite?: string
) => {
  k.setGravity(1600);
  // add a game object to screen
  const player = k.add([
    k.sprite(playerSprite ?? 'bean'),
    k.pos(80, FLOOR_HEIGHT),
    k.area(),
    k.body(),
  ]);

  /* player action */
  function jump() {
    // if (player.isGrounded()) {
    player.jump(JUMP_FORCE);
    k.play('blip');
    k.shake(3);
    // }
  }

  generateWorld(k);

  // jump when user press space or click
  k.onKeyPress('space', jump);
  k.onClick(jump);

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
    player.use(k.sprite(playerSprite ?? 'bean'));
  });
};

const addLeaf = (
  k: KAPLAYCtx<{}, never>,
  tree: GameObj,
  i: number,
  top?: boolean
) => {
  const sign = top ? -1 : 1;
  const heightFactor = i + 1;
  const leafGrowthFactor = heightFactor * 10;
  const leaftWidth = tree.width * 2.3 - leafGrowthFactor;
  const leaftRadius = leaftWidth / Math.sqrt(2);
  const treeCenter = tree.width / 2;
  const rotation = top ? -135 : 45;
  tree.add([
    k.polygon([k.vec2(0, leaftWidth), k.vec2(leaftWidth, 0), k.vec2(0, 0)]),
    k.pos(treeCenter, sign * (-tree.height + 15 - leaftRadius * heightFactor)),
    k.area(),
    k.rotate(rotation),
    k.outline(4),
    k.color(0, 180, 0),
    'leaf',
    'collider',
  ]);
};

function spawnTreeFloor(k: KAPLAYCtx<{}, never>) {
  let tree = k.add([
    k.rect(TREE_DEFAULT_SIZE, k.rand(32, 96)),
    k.area(),
    k.outline(4),
    k.pos(k.width(), k.height() - FLOOR_HEIGHT),
    k.anchor('botleft'),
    k.color(255, 180, 255),
    k.move(LEFT, SPEED),
    'tree',
    'collider',
  ]);
  const nbLeaf = k.rand(2, 5);
  for (let i = 0; i <= nbLeaf; i++) {
    addLeaf(k, tree, i);
  }
  // wait a random amount of time to spawn next tree
  k.wait(k.rand(0.5, 1.5), () => spawnTreeFloor(k));
}

function spawnTreeCeiling(k: KAPLAYCtx<{}, never>) {
  const tree = k.add([
    k.rect(TREE_DEFAULT_SIZE, k.rand(32, 96)),
    k.area(),
    k.outline(4),
    k.pos(k.width(), CEILING_HEIGHT),
    k.anchor('topleft'),
    k.color(255, 180, 255),
    k.move(LEFT, SPEED),
    'tree',
    'collider',
  ]);
  const nbLeaf = k.rand(2, 5);
  for (let i = 0; i <= nbLeaf; i++) {
    addLeaf(k, tree, i, true);
  }
  // wait a random amount of time to spawn next tree
  k.wait(k.rand(0.5, 1.5), () => spawnTreeCeiling(k));
}

function spawnTrees(k: KAPLAYCtx<{}, never>) {
  spawnTreeFloor(k);
  spawnTreeCeiling(k);
}

function generateWorld(k: KAPLAYCtx<{}, never>) {
  const floor = k.add([
    k.rect(k.width(), FLOOR_HEIGHT),
    k.outline(4),
    k.pos(0, k.height()),
    k.anchor('botleft'),
    k.area(),
    k.body({ isStatic: true }),
    k.color(127, 200, 255),
    'floor',
  ]);

  const ceiling = k.add([
    k.rect(k.width(), CEILING_HEIGHT),
    k.outline(4),
    k.pos(0, 0),
    k.anchor('topleft'),
    k.area(),
    k.body({ isStatic: true }),
    k.color(127, 200, 255),
    'ceiling',
  ]);
}
