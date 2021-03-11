/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Nintendo Mario Tiles, Educational use only
 */
import Player from './player';
const config = {
  type: Phaser.AUTO,

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  zoom: 1, // Since we're working with 16x16 pixel tiles, let's scale up the canvas by 3x
  pixelArt: true, // Force the game to scale images up crisply
  parent: 'game-container',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0 },
    },
  },
};

const game = new Phaser.Game(config);
let cursors;
let player;

function preload() {
  // Load player assets
  this.load.atlas(
    'atlas',
    'https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png',
    'https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json'
  );

  this.load.image('tiles', 'assets/tilesets/pokemon_tileset_cropped.png');
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/pokemon_test_map.json');
}

function create() {
  const map = this.make.tilemap({ key: 'map' });

  // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
  // Phaser's cache (i.e. the name you used in preload)
  const tileset = map.addTilesetImage('pokemon_tileset_4', 'tiles');

  // Collision boundaries can be set using Tiled collision editor
  const bottomLayer = map.createStaticLayer('BottomLayer', tileset, 0, 0);
  const topLayer = map.createStaticLayer('TopLayer', tileset, 0, 0);
  cursors = this.input.keyboard.createCursorKeys();
  player = new Player(this, cursors, 500, 500);

  // All objects in aboveLayer will collide
  topLayer.setCollisionByExclusion([-1]);
  this.matter.world.convertTilemapLayer(topLayer);
}

function update() {
  player.update();
}
