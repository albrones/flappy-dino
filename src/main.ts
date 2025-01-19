import kaboom from 'kaboom';
import 'kaboom/global';
import { initGame as initGameScene } from './game';
import { initLooseScene } from './lose';

// initialize context
kaboom();

// load assets
loadSprite('bean', '/sprites/bean.png');
loadSound('blip', '/audio/score.mp3');

//init scenes
initGameScene();
initLooseScene();

// display button play
const buttonPlay = add([
  rect(80, 48),
  area(),
  outline(4),
  pos(width() / 2, height() / 2 + 160),
  scale(2),
  anchor('center'),
  color(127, 200, 255),
  'button',
]);
add([pos(width() / 2, height() / 2 + 160), anchor('center'), text('PLAY')]);

buttonPlay.onClick(() => go('game'));
