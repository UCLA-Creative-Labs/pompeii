// eslint-disable-next-line no-undef
export default class StartScreen extends Phaser.Scene {
  constructor() {
    super('StartScreen');
  }

  preload() {
    // 'this' === Phaser.Scene
    this.load.image('repeating-background', 'assets/preload.png');
  }

  create() {
    // Change scene on click
    this.input.on(
      'pointerup',
      function () {
        this.scene.start('MainScene');
      },
      this,
    );
    // You can access the game's config to read the width & height
    const { width, height } = this.sys.game.config;

    // Creating a repeating background sprite
    const bg = this.add.tileSprite(0, 0, width, height, 'repeating-background');
    bg.setOrigin(0, 0);

    // In v3, you can chain many methods, so you can create text and configure it in one 'line'
    this.add
      .text(width / 2, height / 2, 'WELCOME\nTO\nPOMPEII', {
        font: '175px monospace',
        color: 'white',
      })
      .setOrigin(0.5, 0.5)
      .setShadow(5, 5, '#5588EE', 0, true, true);
  }

  update(_time, _delta) {
    // Here is where you can run logic that you need to check over time
    // e.g. updating a player sprite's position based on keyboard input
  }
}
