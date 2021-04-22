/**
 * Author: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Nintendo Mario Tiles, Educational use only
 */
import Player from './player';
import Shiba from './shiba';
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
    // Load dog assets
    this.load.spritesheet('shiba', 'assets/spritesheets/dog.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image('tiles', 'assets/tilesets/Pompeii.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/pompeii.json');
  }

  create() {
    const map = this.add.tilemap('map');
    const scale = window.innerHeight / map.heightInPixels;
    this.matter.world.setBounds(
      0,
      0,
      map.widthInPixels * scale,
      map.heightInPixels * scale,
    );
    // Center the camera on the tilemap
    const camera = this.cameras.main;
    camera.setScroll(
      -(window.innerWidth / 2 - (map.widthInPixels * scale) / 2),
      0,
    );
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in Phaser's cache (i.e. the name you used in preload)

    const tileset = map.addTilesetImage('pompeii', 'tiles');
    // Collision boundaries can be set using Tiled collision editor
    map.createStaticLayer('Bottom Layer', tileset).setScale(scale, scale);
    const topLayer = map
      .createStaticLayer('Top Layer', tileset)
      .setScale(scale, scale);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, this.cursors, 400, 500);

    // Create NPCs
    this.npcs = [];
    // Create shiba
    this.shiba = new Shiba(this, 400, 400, 'shiba');
    this.npcs.push(this.shiba);
    // All objects in aboveLayer will collide
    topLayer.setCollisionByExclusion([-1]);
    this.matter.world.convertTilemapLayer(topLayer);

    // Add object to player collisions
    this.npcs.forEach((npc) => {
      this.matterCollision.addOnCollideStart({
        objectA: npc.gameObj,
        objectB: this.player.gameObj,
        callback: () => {
          npc.freeze();
        },
      });
      this.matterCollision.addOnCollideEnd({
        objectA: npc.gameObj,
        objectB: this.player.gameObj,
        callback: () => {
          npc.unfreeze();
        },
      });
    });
  }

  update(time, delta) {
    this.player.update();
    this.npcs.forEach((npc) => npc.update(time, delta));
  }
}
