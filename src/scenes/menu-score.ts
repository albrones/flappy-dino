import { KAPLAYCtx } from 'kaplay';

const generateNewCharacter = (
  k: KAPLAYCtx<{}, never>,
  currentCharacter: string
) => {
  return k.make([
    k.sprite(currentCharacter),
    k.pos(k.width() / 2, k.height() / 2 - 80),
    k.scale(2),
    k.anchor('center'),
    'player',
  ]);
};

export const initMenuScoreScene = (
  k: KAPLAYCtx<{}, never>,
  score: string,
  playerSprite: string
) => {
  const characterList = ['bean', 'monster-1'];
  let currentCharacter: string = playerSprite;

  let frame = k.add(generateNewCharacter(k, currentCharacter));
  let currentCharacterIndex = 0;

  if (currentCharacter) {
    const updateCharacterButtonRight = k.add([
      k.circle(24),
      k.area(),
      k.outline(4),
      k.pos(k.width() / 2 + 120, k.height() / 2 - 80),
      k.scale(2),
      k.anchor('center'),
      k.color(127, 200, 255),
      'button',
    ]);
    const updateCharacterButtonLeft = k.add([
      k.circle(24),
      k.area(),
      k.outline(4),
      k.pos(k.width() / 2 - 120, k.height() / 2 - 80),
      k.scale(2),
      k.anchor('center'),
      k.color(127, 200, 255),
      'button',
    ]);
    updateCharacterButtonRight.add([k.anchor('center'), k.text('>')]);
    updateCharacterButtonLeft.add([k.anchor('center'), k.text('<')]);
    updateCharacterButtonRight.onClick(() => {
      if (currentCharacterIndex < characterList.length - 1) {
        currentCharacter = characterList[currentCharacterIndex + 1];
        currentCharacterIndex = currentCharacterIndex + 1;
      } else {
        currentCharacter = characterList[0];
        currentCharacterIndex = 0;
      }
      k.destroy(frame);
      frame = k.add(generateNewCharacter(k, currentCharacter));
    });
    updateCharacterButtonLeft.onClick(() => {
      if (currentCharacterIndex > 0) {
        currentCharacter = characterList[currentCharacterIndex - 1];
        currentCharacterIndex = currentCharacterIndex - 1;
      } else {
        currentCharacter = characterList[0];
        currentCharacterIndex = 0;
      }
      k.destroy(frame);
      frame = k.add(generateNewCharacter(k, currentCharacter));
      k.debug.log('char', currentCharacter);
    });
  }

  if (score) {
    const scoreText = k.add([
      k.text(score),
      k.pos(k.width() / 2, k.height() / 2 + 80),
      k.scale(2),
      k.anchor('center'),
    ]);
  }

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

  playButton.onClick(() => k.go('game', currentCharacter));
};
