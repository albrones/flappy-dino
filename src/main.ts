import { k } from './kaplayLoader';
import { initGameScene } from './scenes/game';
import { initMenuScoreScene } from './scenes/menu-score';

k.scene('menu-score', (score) => {
  initMenuScoreScene(k, score);
});
k.scene('game', () => {
  initGameScene(k);
});
k.go('menu-score');
