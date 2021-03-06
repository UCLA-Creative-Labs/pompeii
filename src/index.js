/**
 * Template Credits: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Subtle Patterns
 */
import * as PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';
import MainScene from './main_scene';
import StartScene from './start_screen';

require('./styles/index.scss');
require('./styles/globals.scss');

// eslint-disable-next-line no-undef
const _PHASER = Phaser;
/**
 * PHASER
 */
let config = {
  type: _PHASER.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#222222',
  parent: 'game-container',
  scene: [StartScene, MainScene],
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 0 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin, // The plugin class
        key: 'matterCollision', // Where to store in Scene.Systems, e.g. scene.sys.matterCollision
        mapping: 'matterCollision', // Where to store in the Scene, e.g. scene.matterCollision
      },
    ],
  },
};

const game = new _PHASER.Game(config);
/**
 * LISTENERS
 */
window.onresize = () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
};
