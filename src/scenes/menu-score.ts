import { KAPLAYCtx } from 'kaplay';
import { characterList } from '../kaplayLoader';

export const initMenuScoreScene = (
  k: KAPLAYCtx<{}, never>,
  score: string,
  playerSprite: string
) => {
  let currentCharacterIndex = characterList.indexOf(playerSprite);

  function generateNewCharacter(k: KAPLAYCtx<{}, never>) {
    return k.make([
      k.sprite(playerSprite),
      k.pos(k.width() / 2, k.height() / 2 - 80),
      k.scale(2),
      k.anchor('center'),
      'player',
    ]);
  }

  function generateSelectButton(k: KAPLAYCtx<{}, never>, right?: boolean) {
    const sign = right ? 1 : -1;
    const btn = k.add([
      k.circle(24),
      k.area(),
      k.outline(4),
      k.pos(k.width() / 2 + 120 * sign, k.height() / 2 - 80),
      k.scale(2),
      k.anchor('center'),
      k.color(127, 200, 255),
      'button',
      'select',
    ]);
    btn.add([k.anchor('center'), k.text(right ? '>' : '<')]);
    btn.onClick(() => {
      updateCharacter(right);
    });
    return btn;
  }

  function updateCharacter(right?: boolean) {
    if (right) {
      const newIndex =
        currentCharacterIndex < characterList.length - 1
          ? currentCharacterIndex + 1
          : 0;
      playerSprite = characterList[newIndex];
      currentCharacterIndex = newIndex;
    } else if (!right) {
      const newIndex =
        currentCharacterIndex === 0
          ? characterList.length - 1
          : currentCharacterIndex - 1;
      playerSprite = characterList[newIndex];
      currentCharacterIndex = newIndex;
    }
    character.use(sprite(playerSprite));
  }

  const character = k.add(generateNewCharacter(k));
  const selectNextCharacterBtn = generateSelectButton(k, true);
  const selectPreviousCharacterBtn = generateSelectButton(k);

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

  playButton.onClick(() => k.go('game', playerSprite));
  k.onKeyPress('space', () => k.go('game', playerSprite));
};
