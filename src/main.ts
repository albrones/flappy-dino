import { initUI } from './components/ui';
import { characters, k } from './kaplayLoader';
import { initGameScene } from './scenes/game';
import { initMenuScoreScene } from './scenes/menu';

let playerSprite = k.choose(characters);
let level: number = 1;
k.scene('menu', (level, playerSprite, isWinning) => {
  initUI(k);
  initMenuScoreScene(k, level, playerSprite, isWinning);
});
k.scene('game', (level, playerSprite) => {
  initUI(k);
  initGameScene(k, level, playerSprite);
});
k.onLoad(() => {
  k.go('menu', level, playerSprite);
});
