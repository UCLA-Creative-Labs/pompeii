/**
 * Template Credits: Michael Hadley, mikewesthad.com
 * Asset Credits:
 *  - Subtle Patterns
 */

/**
 * PHASER
 */
let config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#222222",
  parent: "game-container",
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // "this" === Phaser.Scene
  this.load.image("repeating-background", "../assets/preload.png");
}

function create() {
  // You can access the game's config to read the width & height
  const { width, height } = this.sys.game.config;

  // Creating a repeating background sprite
  const bg = this.add.tileSprite(0, 0, width, height, "repeating-background");
  bg.setOrigin(0, 0);

  // In v3, you can chain many methods, so you can create text and configure it in one "line"
  this.add
    .text(width / 2, height / 2, "WELCOME\nTO\nPOMPEII", {
      font: "175px monospace",
      color: "white"
    })
    .setOrigin(0.5, 0.5)
    .setShadow(5, 5, "#5588EE", 0, true, true);
}

function update(time, delta) {
  // Here is where you can run logic that you need to check over time
  // e.g. updating a player sprite's position based on keyboard input
}

/**
 * LISTENERS
 */
window.onresize = () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
};