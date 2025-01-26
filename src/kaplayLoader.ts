import { assets } from '@kaplayjs/crew';
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
k.loadSprite('bean', assets.bean.sprite);
k.loadSprite('bag', assets.bag.sprite);
k.loadSprite('bobo', assets.bobo.sprite);
k.loadSprite('money_bag', assets.money_bag.sprite);
k.loadSprite('ghosty', assets.ghosty.sprite);
k.loadSprite('ghostiny', assets.ghostiny.sprite);
k.loadSprite('mark', assets.mark.sprite);
k.loadSprite('gigagantrum', assets.gigagantrum.sprite);
k.loadSprite('tga', assets.tga.sprite);
k.loadSprite('burpman', assets.burpman.sprite);
k.loadSprite('kat', assets.kat.sprite);
k.loadSprite('lamp', assets.lamp.sprite);
k.loadSprite('goldfly', assets.goldfly.sprite);
k.loadSprite('onion', assets.onion.sprite);
k.loadSprite('marroc', assets.marroc.sprite);
k.loadSprite('sukomi', assets.sukomi.sprite);
k.loadSprite('skuller', assets.skuller.sprite);
k.loadSprite('zombean', assets.zombean.sprite);
k.loadSprite('btfly', assets.btfly.sprite);
k.loadSprite('karat', assets.karat.sprite);
k.loadSprite('superburp', assets.superburp.sprite);
k.loadSprite('pog', assets.pog.sprite);
k.loadSprite('beant', assets.beant.sprite);
k.loadSprite('stranger', assets.stranger.sprite);
k.loadSprite('art', assets.art.sprite);
k.loadSprite('assetbrew', assets.assetbrew.sprite);
k.loadSprite('discord', assets.discord.sprite);
k.loadSprite('github', assets.github.sprite);
k.loadSprite('trash', assets.trash.sprite);
k.loadSprite('dino', assets.dino.sprite);
k.loadSprite('dracula', assets.dracula.sprite);
k.loadSprite('kajam', assets.kajam.sprite);
k.loadSprite('monster-1', '/sprites/monster-1.png');

//TODO: unlock character with achivments ?
export const characterList = [
  'bean',
  'bag',
  'bobo',
  'money_bag',
  'ghosty',
  'ghostiny',
  'mark',
  'gigagantrum',
  'tga',
  'burpman',
  'kat',
  'lamp',
  'goldfly',
  'onion',
  'marroc',
  'sukomi',
  'skuller',
  'zombean',
  'btfly',
  'karat',
  'superburp',
  'pog',
  'beant',
  'stranger',
  'assetbrew',
  'discord',
  'github',
  'trash',
  'dino',
  'dracula',
  'monster-1',
];

k.loadSound('blip', '/audio/score.mp3');
//TODO: import a font
//TODO: import map, character, animation etc assets
//TODO: import loadSpriteAtlas for ui and animation

//TODO: load main background/map to be the main object with main pos reference to pass to all following children game objects
