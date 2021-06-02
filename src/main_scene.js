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
    this.cursors = {
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
    };
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

    //var bplaterect = this.add.rectangle(580, 450, 100, 80, 0xff0000);
    //var deneverect = this.add.rectangle(170, 550, 100, 130, 0xff0000);
    //var covelrect = this.add.rectangle(1020, 330, 100, 150, 0xff0000);
    //var feastrect = this.add.rectangle(600, 150, 100, 100, 0xff0000);
    
    // Add collision zones
    this.zones = [];
    
    this.deneve = new Phaser.GameObjects.Zone(this, 170, 550, 100, 130);
    this.zones.push(this.deneve);
    this.bplate = new Phaser.GameObjects.Zone(this, 580, 450, 100, 80);
    this.zones.push(this.bplate);
    this.covel = new Phaser.GameObjects.Zone(this, 1020, 330, 100, 150);
    this.zones.push(this.covel);
    this.feast = new Phaser.GameObjects.Zone(this, 600, 150, 100, 100);
    this.zones.push(this.feast);
  }

  update(time, delta) {
    this.player.update(this.cursors);
    this.npcs.forEach((npc) => npc.update(time, delta));

    //You can put callbacks here for zone collisions
    
    var pb = this.player.gameObj.getBounds();
    if(Phaser.Geom.Rectangle.Overlaps(pb, this.deneve.getBounds())){
      console.log('Outside deneve!');
    } else if(Phaser.Geom.Rectangle.Overlaps(pb, this.bplate.getBounds())){
      console.log('Outside bplate');
    } else if(Phaser.Geom.Rectangle.Overlaps(pb, this.covel.getBounds())){
      console.log('Outside covel!');
    } else if(Phaser.Geom.Rectangle.Overlaps(pb, this.feast.getBounds())){
      console.log('Outside feast!');
    }
    
/*
    this.zones.forEach((zone) => {
      if(Phaser.Geom.Rectangle.Overlaps(this.player.gameObj.getBounds(), zone.getBounds())){
        console.log('in zone!!');
      }
    });
*/
  }
}
