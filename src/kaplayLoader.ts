import { assets } from '@kaplayjs/crew';
import kaplay from 'kaplay';

export const SCALE = 2;
export const k = kaplay({
  // width: 640 * SCALE,
  // height: 360 * SCALE,
  // scale: SCALE,
  // letterbox: true, // responsive with aspect-ratio respeect
  global: false,
});

export const PALETTE = {
  //named using https://www.color-blindness.com/color-name-hue/
  OceanGreen: '#5ba675',
  Mantis: '#6bc96c',
  Conifer: '#abdd64',
  Drover: '#fcef8d',
  MacaroniAndCheese: '#ffb879',
  BurntSienna: '#ea6262',
  Mandy: '#cc425e',
  Lipstick: '#a32858',
  DarkPurple: '#751756',
  Jagger: '#390947',
  Pompadour: '#611851',
  Flirt: '#873555',
  VinRouge: '#a6555f',
  Contessa: '#c97373',
  MandysPink: '#f2ae99',
  CottonCandy: '#ffc3f2',
  Illusion: '#ee8fcb',
  Hopebush: '#d46eb3',
  Cadillac: '#873e84',
  Blackcurrant: '#1f102a',
  HotPurple: '#4a3052',
  Affair: '#7b5480',
  Bouquet: '#a6859f',
  Twilight: '#d9bdc8',
  White: '#ffffff',
  ColumbiaBlue: '#aee2ff',
  LightSkyBlue: '#8db7ff',
  LightSlateBlue: '#6d80fa',
  MediumSlateBlue: '#8465ec',
  DeepLilac: '#834dc4',
  VividViolet: '#7d2da0',
  PersianIndigo: '#4e187c',
};

export const START_VOLUME = k.getVolume();

// load character sprites
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
// load others sprites
k.loadSprite('arrow', assets.arrow.sprite);
k.loadSprite('play', assets.play.sprite);
k.loadSprite('grass', assets.grass.sprite);
k.loadSprite('cloud', assets.cloud.sprite);
k.loadSprite('sounds', assets.sounds.sprite);

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
// k.loadSprite('happy', assets.happy.sprite);
// k.loadBitmapFont('happy', assets.happy.sprite, 6, 8);
//TODO: import map, character, animation etc assets
//TODO: import loadSpriteAtlas for ui and animation

//TODO: load main background/map to be the main object with main pos reference to pass to all following children game objects
