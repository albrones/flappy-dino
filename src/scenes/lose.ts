import { KAPLAYCtx } from 'kaplay';
import { initPlayButton } from '../ui/playButton';

export const initLoseScene = (k: KAPLAYCtx<{}, never>, score: string) => {
  const character = k.add([
    k.sprite('bean'),
    k.pos(k.width() / 2, k.height() / 2 - 80),
    k.scale(2),
    k.anchor('center'),
  ]);

  const scoreText = k.add([
    k.text(score),
    k.pos(k.width() / 2, k.height() / 2 + 80),
    k.scale(2),
    k.anchor('center'),
  ]);

  initPlayButton(k);
};
