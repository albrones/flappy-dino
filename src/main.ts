import { initMuteButton } from './components/muteButton';
import { characterList, k } from './kaplayLoader';
import { initGameScene } from './scenes/game';
import { initMenuScoreScene } from './scenes/menu-score';

let playerSprite = k.choose(characterList);
k.scene('menu-score', (score, playerSprite) => {
  initMuteButton(k);
  initMenuScoreScene(k, score, playerSprite);
});
k.scene('game', (playerSprite) => {
  initMuteButton(k);
  initGameScene(k, playerSprite);
});
k.onLoad(() => {
  k.go('menu-score', 0, playerSprite);
});
