import { KAPLAYCtx } from 'kaplay';
import { PALETTE, START_VOLUME } from '../kaplayLoader';

export const initUI = (k: KAPLAYCtx<{}, never>) => {
  const currentVolume = k.getVolume();

  function initConfigPanel() {
    const cross = k.make([
      k.sprite('plus'),
      k.pos(menu.width - 32, 0),
      k.rotate(45),
      k.area(),
      k.color(PALETTE.Lipstick),
      'cross',
    ]);
    menu.add(cross);
    muteButton.pos = k.vec2(16, 16);
    menu.add([
      k.sprite('sounds'),
      k.pos(16, 16),
      k.area(),
      k.opacity(currentVolume ? 1 : 0.5),
      'mute',
    ]);
    k.add(config);
  }

  const muteButton = k.make([
    k.sprite('sounds'),
    k.pos(k.width() - 60, 24),
    k.area(),
    k.opacity(currentVolume ? 1 : 0.5),
    'mute',
    // { onClick: mute },
  ]);
  function mute() {
    k.debug.log('aa');
    if (k.getVolume()) {
      k.setVolume(0);
      muteButton.opacity = 0.5;
      k.debug.log('muted');
    } else {
      k.setVolume(START_VOLUME);
      muteButton.opacity = 1;
      k.debug.log('louded');
    }
  }
  const config = k.make([
    k.sprite('config'),
    k.pos(k.width() - 76, 20),
    k.area(),
    'config',
  ]);
  const menu = k.make([
    k.rect(k.width() - 32, 150),
    k.pos(16, 16),
    k.outline(4),
    k.color(PALETTE.HotPurple),
  ]);
  let menuIsOpened = false;
  function openMenu() {
    if (menuIsOpened) {
      k.destroy(menu);
    } else {
      k.add(menu);
    }
    menuIsOpened = !menuIsOpened;
  }
  function closeMenu() {
    k.debug.log('ici');
    k.destroy(menu);

    menuIsOpened = false;
  }
  if (k.getSceneName() === 'game') {
    k.add(muteButton);
  } else {
    initConfigPanel();
  }

  k.onKeyPress('m', mute);
  k.onClick('mute', mute); //FIXME: not working in config menu
  k.onClick('config', openMenu);
  k.onClick('cross', closeMenu);
};
