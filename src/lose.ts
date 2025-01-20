export const initLooseScene = () => {
  scene('lose', (score) => {
    const character = add([
      sprite('bean'),
      pos(width() / 2, height() / 2 - 80),
      scale(2),
      anchor('center'),
    ]);

    // display score
    const scoreText = add([
      text(score),
      pos(width() / 2, height() / 2 + 80),
      scale(2),
      anchor('center'),
    ]);

    // display button play
    const buttonPlay = add([
      rect(80, 48),
      area(),
      outline(4),
      pos(width() / 2, height() / 2 + 160),
      scale(2),
      anchor('center'),
      color(127, 200, 255),
      'button',
    ]);
    add([pos(width() / 2, height() / 2 + 160), anchor('center'), text('PLAY')]);

    // go back to game with space is pressed
    buttonPlay.onClick(() => go('game'));
  });
};
