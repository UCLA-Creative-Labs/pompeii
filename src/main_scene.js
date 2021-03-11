/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Nintendo Mario Tiles, Educational use only
 */
import Player from './player';
// eslint-disable-next-line no-undef
export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    // Load player assets
    this.load.atlas(
      'atlas',
      'https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.png',
      'https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/atlas/atlas.json',
    );

    this.load.image('tiles', 'assets/tilesets/pokemon_tileset_cropped.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/pokemon_test_map.json');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    console.log(map.heightInPixels);
    this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage('pokemon_tileset_4', 'tiles');

    // Collision boundaries can be set using Tiled collision editor
    map.createStaticLayer('BottomLayer', tileset, 0, 0);
    const topLayer = map.createStaticLayer('TopLayer', tileset, 0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, this.cursors, 500, 500);

    // All objects in aboveLayer will collide
    topLayer.setCollisionByExclusion([-1]);
    this.matter.world.convertTilemapLayer(topLayer);
  }

  update() {
    this.player.update();
  }
}
