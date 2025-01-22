import { KAPLAYCtx } from 'kaplay';

export const initPlayButton = (k: KAPLAYCtx<{}, never>) => {
  const playButton = k.add([
    k.rect(80, 48),
    k.area(),
    k.outline(4),
    k.pos(k.width() / 2, k.height() / 2 + 160),
    k.scale(2),
    k.anchor('center'),
    k.color(127, 200, 255),
    'button',
  ]);
  k.add([
    k.pos(k.width() / 2, k.height() / 2 + 160),
    k.anchor('center'),
    k.text('PLAY'),
  ]);

  playButton.onClick(() => k.go('game'));

  return playButton;
};
