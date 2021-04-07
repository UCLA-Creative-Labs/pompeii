export default class Player {
  constructor(scene, cursors, x, y) {
    this.player = scene.matter.add.sprite(x, y, 'atlas', 'misa-front');
    this.player.body.collideWorldBounds = true;
    this.cursors = cursors;

    // Set up player boundaries
    this.player.setCircle(12, {
      render: {
        sprite: { xOffset: 0, yOffset: 0.25 },
      },
    });
    this.player.scaleX = 0.75;
    this.player.scaleY = 0.75;
  }

  update() {
    const speed = 2;

    // Stop any previous movement from the last frame
    this.player.setVelocity(0);

    // Keep player vertical
    this.player.body.angle = 0;

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }
  }
}
