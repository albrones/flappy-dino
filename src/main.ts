import { initUI } from './components/ui';
import { characters, k } from './kaplayLoader';
import { initGameScene } from './scenes/game';
import { initMenuScoreScene } from './scenes/menu';

let playerSprite = k.choose(characters);
let level: number = 1;
let endless: boolean = false;
let isWinning: boolean | null = null;
k.scene('menu', (level, playerSprite, isWinning, endless) => {
  initUI(k);
  initMenuScoreScene({ k, level, playerSprite, isWinning, endless });
});
k.scene('game', (level, playerSprite, endless) => {
  initUI(k);
  initGameScene({ k, level, playerSprite, endless });
});
k.onLoad(() => {
  k.go('menu', level, playerSprite, endless);
});
