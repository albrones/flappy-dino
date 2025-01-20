import { GameObj } from 'kaplay';

const FLOOR_HEIGHT = 86;
const TREE_DEFAULT_SIZE = 50;
const CEILING_HEIGHT = 124;
const JUMP_FORCE = 800;
const SPEED = 480;

export const initGame = () => {
  scene('game', () => {
    // define gravity
    setGravity(1600);

    // add a game object to screen
    const player = add([
      // list of components
      sprite('bean'),
      pos(80, FLOOR_HEIGHT),
      area(),
      body(),
    ]);

    /* player action */
    function jump() {
      // if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
      play('blip');
      shake(3);
      // }
    }

    generateWorld();

    // jump when user press space or click
    onKeyPress('space', jump);
    onClick(jump);

    // start spawning trees
    spawnTrees();

    // lose if player collides with any game obj with tag "tree"
    player.onCollide('collider', () => {
      // go to "lose" scene and pass the score
      addKaboom(player.pos);
      shake(120);
      burp({ volume: 0.5 /* detune: 800 */ });
      wait(0.3, () => go('lose', score));
      addKaboom(player.pos);
      wait(0.1, () => addKaboom(player.pos, {}));
      wait(0.2, () => addKaboom(player.pos));
      wait(0.3, () => addKaboom(player.pos));
    });

    // keep track of score
    let score: number = 0;
    const scoreLabel = add([text(String(score)), pos(24, 24)]);

    // increment score every frame
    onUpdate(() => {
      score++;
      scoreLabel.text = String(score);
    });
  });
};

const addLeaf = (tree: GameObj, i: number, top?: boolean) => {
  const sign = top ? -1 : 1;
  const heightFactor = i + 1;
  const leafGrowthFactor = heightFactor * 10;
  const leaftWidth = tree.width * 2.3 - leafGrowthFactor;
  const leaftRadius = leaftWidth / Math.sqrt(2);
  const treeCenter = tree.width / 2;
  const rotation = top ? -135 : 45;
  tree.add([
    polygon([vec2(0, leaftWidth), vec2(leaftWidth, 0), vec2(0, 0)]),
    pos(treeCenter, sign * (-tree.height + 15 - leaftRadius * heightFactor)),
    area(),
    rotate(rotation),
    outline(4),
    color(0, 180, 0),
    'leaf',
    'collider',
  ]);
};

function spawnTreeFloor() {
  let tree = add([
    rect(TREE_DEFAULT_SIZE, rand(32, 96)),
    area(),
    outline(4),
    pos(width(), height() - FLOOR_HEIGHT),
    anchor('botleft'),
    color(255, 180, 255),
    move(LEFT, SPEED),
    'tree',
    'collider',
  ]);
  const nbLeaf = rand(2, 5);
  for (let i = 0; i <= nbLeaf; i++) {
    addLeaf(tree, i);
  }
  // wait a random amount of time to spawn next tree
  wait(rand(0.5, 1.5), spawnTreeFloor);
}

function spawnTreeCeiling() {
  const tree = add([
    rect(TREE_DEFAULT_SIZE, rand(32, 96)),
    area(),
    outline(4),
    pos(width(), CEILING_HEIGHT),
    anchor('topleft'),
    color(255, 180, 255),
    move(LEFT, SPEED),
    'tree',
    'collider',
  ]);
  const nbLeaf = rand(2, 5);
  for (let i = 0; i <= nbLeaf; i++) {
    addLeaf(tree, i, true);
  }
  // wait a random amount of time to spawn next tree
  //TODO: add same leaft to ceiling
  wait(rand(0.5, 1.5), spawnTreeCeiling);
}

function spawnTrees() {
  spawnTreeFloor();
  spawnTreeCeiling();
}

function generateWorld() {
  const floor = add([
    rect(width(), FLOOR_HEIGHT),
    outline(4),
    pos(0, height()),
    anchor('botleft'),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
    'floor',
  ]);

  const ceiling = add([
    rect(width(), CEILING_HEIGHT),
    outline(4),
    pos(0, 0),
    anchor('topleft'),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
    'ceiling',
  ]);
}
