import kaplay from 'kaplay';

export const scale = 2;
export const k = kaplay();
/* 
  {
  width: 640 * scale,
  height: 360 * scale,
  scale,
  letterbox: true, // responsive with aspect-ratio respeect
  global: false
  }
   */

// load assets
k.loadSprite('bean', '/sprites/bean.png');
k.loadSound('blip', '/audio/score.mp3');
//TODO: import a font
//TODO: import map, character, animation etc assets
//TODO: import loadSpriteAtlas for ui and animation
