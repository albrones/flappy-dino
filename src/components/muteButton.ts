import { KAPLAYCtx } from 'kaplay';
import { START_VOLUME } from '../kaplayLoader';

export const initMuteButton = (k: KAPLAYCtx<{}, never>) => {
  const currentVolume = k.getVolume();
  const muteButton = k.add([
    k.sprite('sounds'),
    k.pos(k.width() - 60, 24),
    k.area(),
    k.opacity(currentVolume ? 1 : 0.5),
    'mute',
  ]);
  function mute() {
    if (k.getVolume()) {
      k.setVolume(0);
      muteButton.opacity = 0.5;
    } else {
      k.setVolume(START_VOLUME);
      muteButton.opacity = 1;
    }
  }
  k.onKeyPress('m', mute);
  k.onClick('mute', mute);
};
