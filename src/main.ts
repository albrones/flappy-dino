import kaboom from 'kaboom';
import 'kaboom/global';
import { initLooseScene } from './loose';

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

// initialize context
kaboom();

// const play = (): void => {
// load assets
loadSprite('bean', '/sprites/bean.png');
loadSound('blip', '/audio/score.mp3');

/* Main scene */
scene('game', () => {
  // define gravity
  setGravity(1600);

  // add a game object to screen
  const player = add([
    // list of components
    sprite('bean'),
    pos(80, 40),
    area(),
    body(),
  ]);
  /* player action */
  function jump() {
    if (player.isGrounded()) {
      player.jump(JUMP_FORCE);
      play('blip');
    }
  }

  generateWorld();

  // jump when user press space or click
  onKeyPress('space', jump);
  onClick(jump);

  // start spawning trees
  spawnTrees();

  // lose if player collides with any game obj with tag "tree"
  player.onCollide('tree', () => {
    // go to "lose" scene and pass the score
    go('lose', score);
    burp({ volume: 0.5, detune: 800 });
    addKaboom(player.pos);
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

initLooseScene();

go('game');
// };
// export { play };

function spawnTreeFloor() {
  add([
    rect(48, rand(32, 96)),
    area(),
    outline(4),
    pos(width(), height() - FLOOR_HEIGHT),
    anchor('botleft'),
    color(255, 180, 255),
    move(LEFT, SPEED),
    'tree',
  ]);
  // wait a random amount of time to spawn next tree
  wait(rand(0.5, 1.5), spawnTreeFloor);
}

function spawnTreeCeiling() {
  add([
    rect(48, rand(32, 96)),
    area(),
    outline(4),
    pos(width(), FLOOR_HEIGHT),
    anchor('topleft'),
    color(255, 180, 255),
    move(LEFT, SPEED),
    'tree',
  ]);
  // wait a random amount of time to spawn next tree
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
  ]);

  const ceiling = add([
    rect(width(), FLOOR_HEIGHT),
    outline(4),
    pos(0, 0),
    anchor('topleft'),
    area(),
    body({ isStatic: true }),
    color(127, 200, 255),
  ]);
}
