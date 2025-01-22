import { k } from './kaplayLoader';
import { initGameScene } from './scenes/game';
import { initLoseScene } from './scenes/lose';
import { initPlayButton } from './ui/playButton';

k.scene('game', () => {
  initGameScene(k);
});
k.scene('lose', (score) => {
  initLoseScene(k, score);
});
initPlayButton(k);
