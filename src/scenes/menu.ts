import { KAPLAYCtx } from 'kaplay';
import { characters, PALETTE, SCALE } from '../kaplayLoader';

export const initMenuScoreScene = (
  k: KAPLAYCtx<{}, never>,
  level: number,
  playerSprite: string,
  isWinning: boolean | null = null
) => {
  let currentCharacterIndex = characters.indexOf(playerSprite);

  function generateNewCharacter() {
    return k.make([
      k.sprite(playerSprite),
      k.pos(k.center()),
      k.scale(SCALE),
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
      k.pos(80 * sign, 0),
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
        currentCharacterIndex < characters.length - 1
          ? currentCharacterIndex + 1
          : 0;
      playerSprite = characters[newIndex];
      currentCharacterIndex = newIndex;
    } else if (!right) {
      const newIndex =
        currentCharacterIndex === 0
          ? characters.length - 1
          : currentCharacterIndex - 1;
      playerSprite = characters[newIndex];
      currentCharacterIndex = newIndex;
    }
    character.use(k.sprite(playerSprite));
  }

  function updateCharacterName() {
    characterName.use(k.text(playerSprite));
  }

  function generatePlayButton() {
    const btn = k.make([
      k.rect(100, 48),
      k.area(),
      k.outline(4),
      k.pos(k.center().x, k.height() * 0.8),
      k.scale(SCALE),
      k.anchor('center'),
      k.color(PALETTE.MediumSlateBlue),
      'button',
    ]);
    btn.add([
      k.pos(8, 2),
      k.scale(0.5),
      k.anchor('right'),
      k.text(level > 1 ? 'NEXT' : 'PLAY'),
    ]);
    btn.add([k.pos(16, 0), k.sprite('play'), k.scale(0.5), k.anchor('left')]);

    btn.onClick(() => k.go('game', level, playerSprite));
    k.onKeyPress('space', () => k.go('game', level, playerSprite));
    return btn;
  }

  /* MAIN */
  k.setBackground(k.Color.fromHex(PALETTE.LightSkyBlue));
  if (level) {
    const levelText = k.add([
      k.text(`Level: ${level}`),
      k.pos(k.center().x, k.height() * 0.15),
      k.scale(SCALE),
      k.anchor('center'),
    ]);
  }
  if (isWinning) {
    const win = k.add([
      k.text('LEVEL PASSED!'),
      k.pos(k.center().x, k.height() * 0.3),
      k.scale(SCALE),
      k.anchor('center'),
    ]);
  }
  if (isWinning === false) {
    const win = k.add([
      k.text('You LOOSE!'),
      k.pos(k.center().x, k.height() * 0.3),
      k.scale(SCALE),
      k.anchor('center'),
    ]);
  }
  if (isWinning === null) {
    const win = k.add([
      k.text('START!'),
      k.pos(k.center().x, k.height() * 0.3),
      k.scale(SCALE),
      k.anchor('center'),
    ]);
  }

  const character = k.add(generateNewCharacter());
  const selectNextCharacterBtn = character.add(generateSelectButton(true));
  const selectPreviousCharacterBtn = character.add(generateSelectButton());
  const characterName = k.add([
    k.text(playerSprite),
    k.pos(k.center().x, k.height() * 0.65),
    k.scale(SCALE),
    k.anchor('center'),
  ]);
  const currentDifficultyFactor = 1 + (level - 1) / 10;
  const currentDifficultyColor = Math.round(126 * currentDifficultyFactor);
  //TODO add select for version/mode of the game [level or time] : if level => difficulty show + activate portal ... else if time redo minimal flappy game
  const difficulty = k.add([
    k.text(`(difficulty x${currentDifficultyFactor})`),
    k.pos(k.center().x, k.height() * 0.9),
    k.anchor('center'),
    k.color(currentDifficultyColor, 0, 0),
  ]);
  const playButton = k.add(generatePlayButton());
};
