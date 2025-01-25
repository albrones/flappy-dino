import { k } from './kaplayLoader';
import { initGameScene } from './scenes/game';
import { initMenuScoreScene } from './scenes/menu-score';

//create main parent
k.add([pos(0, 0)]);
k.scene('menu-score', (score, playerSprite) => {
  initMenuScoreScene(k, score, playerSprite);
});
k.scene('game', (playerSprite) => {
  initGameScene(k, playerSprite);
});
k.go('menu-score', 0, 'bean');
