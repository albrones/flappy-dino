import { initUiMenu } from './components/uiMenu';
import { characters, k } from './kaplayLoader';
import { initGameScene } from './scenes/game';
import { initMenuScoreScene } from './scenes/menu-score';

let playerSprite = k.choose(characters);
let level: number = 1;
k.scene('menu-score', (level, playerSprite, isWinning) => {
  initUiMenu(k);
  initMenuScoreScene(k, level, playerSprite, isWinning);
});
k.scene('game', (level, playerSprite) => {
  initUiMenu(k);
  initGameScene(k, level, playerSprite);
});
k.onLoad(() => {
  k.go('menu-score', level, playerSprite);
});
