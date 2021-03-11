/**
 * Template Credits: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Subtle Patterns
 */

// eslint-disable-next-line no-undef
import MainScene from './main_scene';
import StartScene from './start_screen';
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
};

const game = new _PHASER.Game(config);
/**
 * LISTENERS
 */
window.onresize = () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
};
