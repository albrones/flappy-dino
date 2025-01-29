import { KAPLAYCtx } from 'kaplay';
import { characterList, PALETTE } from '../kaplayLoader';

export const initMenuScoreScene = (
  k: KAPLAYCtx<{}, never>,
  score: string,
  playerSprite: string
) => {
  let currentCharacterIndex = characterList.indexOf(playerSprite);

  function generateNewCharacter() {
    return k.make([
      k.sprite(playerSprite),
      k.pos(k.width() / 2, k.height() / 2 - 80),
      k.scale(2),
      k.anchor('center'),
      'player',
    ]);
  }

  function generateSelectButton(right?: boolean) {
    const sign = right ? 1 : -1;
    const btn = k.make([
      k.sprite('arrow'),
      k.area(),
      k.outline(4),
      k.pos(k.width() / 2 + 160 * sign, k.height() / 2 - 80),
      k.scale(1.5),
      k.anchor('center'),
      k.rotate(right ? 0 : 180),
      k.color(PALETTE.MediumSlateBlue),
      'button',
      'select',
    ]);
    btn.onClick(() => {
      updateCharacter(right);
      updateCharacterName();
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
    character.use(k.sprite(playerSprite));
  }

  function updateCharacterName() {
    characterName.use(k.text(playerSprite));
  }

  function generatePlayButton() {
    const btn = k.make([
      k.rect(80, 48),
      k.area(),
      k.outline(4),
      k.pos(k.width() / 2, k.height() / 2 + 160),
      k.scale(2),
      k.anchor('center'),
      k.color(PALETTE.MediumSlateBlue),
      'button',
    ]);
    btn.add([k.pos(8, 2), k.scale(0.5), k.anchor('right'), k.text('PLAY')]);
    btn.add([k.pos(12, 0), k.sprite('play'), k.scale(0.5), k.anchor('left')]);

    btn.onClick(() => k.go('game', playerSprite));
    k.onKeyPress('space', () => k.go('game', playerSprite));
    return btn;
  }

  /* MAIN */
  const character = k.add(generateNewCharacter());
  const selectNextCharacterBtn = k.add(generateSelectButton(true));
  const selectPreviousCharacterBtn = k.add(generateSelectButton());
  const characterName = k.add([
    k.text(playerSprite),
    k.pos(k.width() / 2, k.height() / 2 + 20),
    k.scale(2),
    k.anchor('center'),
  ]);

  if (score) {
    const scoreText = k.add([
      k.text(score),
      k.pos(k.width() / 2, k.height() / 2 + 80),
      k.scale(2),
      k.anchor('center'),
    ]);
  }

  const playButton = k.add(generatePlayButton());
};
