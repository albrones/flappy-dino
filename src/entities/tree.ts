import { GameObj, KAPLAYCtx } from 'kaplay';
import { PALETTE } from '../kaplayLoader';
import { FLOOR_HEIGHT, SCALING_RATIO } from '../scenes/game';

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

export function spawnTrees(
  k: KAPLAYCtx<{}, never>,
  speed: number,
  difficulty: number
) {
  const minSize = FLOOR_HEIGHT / SCALING_RATIO;
  const maxSize = (minSize * 3) / SCALING_RATIO;
  let tree = k.add([
    k.rect(k.rand(minSize, maxSize), k.rand(minSize, maxSize / 2)),
    k.area(),
    k.outline(4),
    k.pos(k.width() + 50, k.height() - FLOOR_HEIGHT),
    k.anchor('botleft'),
    k.color(PALETTE.VinRouge),
    k.move(k.LEFT, speed),
    'tree',
    'collider',
    'moving-object',
  ]);
  const nbLeaf = k.rand(2, 5);
  for (let i = 0; i <= nbLeaf; i++) {
    addLeaf(k, tree, i);
  }
  k.wait(k.rand(0.3 * difficulty, 1.7), () => spawnTrees(k, speed, difficulty));
}
