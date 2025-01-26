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
k.loadSprite('monster-1', '/sprites/monster-1.png');
export const characterList = ['bean', 'monster-1'];

k.loadSound('blip', '/audio/score.mp3');
//TODO: import a font
//TODO: import map, character, animation etc assets
//TODO: import loadSpriteAtlas for ui and animation

//TODO: load main background/map to be the main object with main pos reference to pass to all following children game objects
