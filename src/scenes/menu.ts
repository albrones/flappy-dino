import { KAPLAYCtx } from 'kaplay';
import { characters, PALETTE, SCALE } from '../kaplayLoader';

export const initMenuScoreScene = ({
  k,
  level,
  playerSprite,
  isWinning,
  endless,
}: {
  k: KAPLAYCtx<{}, never>;
  level: number;
  playerSprite: string;
  isWinning: boolean | null;
  endless: boolean;
}) => {
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

  function generateEscapeButton() {
    const btn = k.make([
      k.rect(100, 48),
      k.area(),
      k.outline(4),
      k.pos(k.center().x - 120, k.height() * 0.8),
      k.scale(SCALE),
      k.anchor('center'),
      k.color(PALETTE.MediumSlateBlue),
      'button',
    ]);
    const pos = level > 1 ? -16 : 0;
    btn.add([
      k.pos(pos, 0),
      k.scale(0.5),
      k.anchor('center'),
      k.text(level > 1 ? 'NEXT' : 'ESCAPE'),
    ]);
    if (level > 1) {
      btn.add([k.pos(16, 0), k.sprite('play'), k.scale(0.5), k.anchor('left')]);
      k.onKeyPress('space', () => {
        endless = false;
        return k.go('game', level, playerSprite, endless);
      });
    }

    btn.onClick(() => {
      endless = false;
      return k.go('game', level, playerSprite, endless);
    });
    return btn;
  }

  function generateEndlessButton() {
    const btn = k.make([
      k.rect(100, 48),
      k.area(),
      k.outline(4),
      k.pos(k.center().x + 120, k.height() * 0.8),
      k.scale(SCALE),
      k.anchor('center'),
      k.color(PALETTE.VinRouge),
      'button',
    ]);
    btn.add([k.scale(0.5), k.anchor('center'), k.text('ENDLESS')]);

    btn.onClick(() => {
      endless = true;
      return k.go('game', level, playerSprite, endless);
    });
    return btn;
  }

  /* MAIN */
  k.setBackground(k.Color.fromHex(PALETTE.LightSkyBlue));
  if (level && !endless) {
    const levelText = k.add([
      k.text(`Level: ${level}`),
      k.pos(k.center().x, k.height() * 0.15),
      k.scale(SCALE),
      k.anchor('center'),
    ]);
  }
  if (isWinning && endless) {
    const win = k.add([
      k.text('LEVEL PASSED!'),
      k.pos(k.center().x, k.height() * 0.3),
      k.scale(SCALE),
      k.anchor('center'),
    ]);
  }
  if (isWinning == false && endless) {
    const win = k.add([
      k.text('NICE TRY!'),
      k.pos(k.center().x, k.height() * 0.3),
      k.scale(SCALE),
      k.anchor('center'),
    ]);
  }
  if (isWinning === false && !endless) {
    const loose = k.add([
      k.text('You LOOSE!'),
      k.pos(k.center().x, k.height() * 0.3),
      k.scale(SCALE),
      k.anchor('center'),
    ]);
  }
  if (isWinning === null) {
    const escape = k.add([
      k.text('ESCAPE!'),
      k.pos(k.center().x - 50, k.height() * 0.3),
      k.scale(SCALE),
      k.anchor('center'),
    ]);
    const endless = k.add([
      k.text('ENDLESS!'),
      k.pos(k.center().x - 50, k.height() * 0.3),
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
  const difficulty = k.add([
    k.text(`(difficulty x${currentDifficultyFactor})`),
    k.pos(k.center().x, k.height() * 0.9),
    k.anchor('center'),
    k.color(currentDifficultyColor, 0, 0),
  ]);
  const escapeBtn = k.add(generateEscapeButton());
  const endlessBtn = k.add(generateEndlessButton());
};
