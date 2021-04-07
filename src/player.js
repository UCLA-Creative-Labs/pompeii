export default class Player {
  constructor(scene, cursors, x, y) {
    this.gameObj = scene.matter.add.sprite(x, y, 'atlas', 'misa-front');
    this.gameObj.body.collideWorldBounds = true;
    this.cursors = cursors;
  }

  update() {
    const speed = 2;

    // Stop any previous movement from the last frame
    this.gameObj.setVelocity(0);

    // Keep gameObj vertical
    this.gameObj.body.angle = 0;

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.gameObj.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.gameObj.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.gameObj.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.gameObj.setVelocityY(speed);
    }
  }
}
