export default class Player {
  constructor(scene, cursors, x, y) {
    this.gameObj = scene.matter.add.sprite(x, y, 'atlas', 'misa-front');
    this.gameObj.body.collideWorldBounds = true;
    this.cursors = cursors;
    
    
    // Set up player boundaries
    this.gameObj.setCircle(12, {
      render: {
        sprite: { xOffset: 0, yOffset: 0.25 },
      },
    });
    this.gameObj.scaleX = 0.75;
    this.gameObj.scaleY = 0.75;

  }

  update(cursors) {
    
    const speed = 2;

    // Stop any previous movement from the last frame
    this.gameObj.setVelocity(0);

    // Keep gameObj vertical
    this.gameObj.body.angle = 0;

    
    // Horizontal movement
    if (cursors.left.isDown) {
      this.gameObj.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      this.gameObj.setVelocityX(speed);
    }

    
    // Vertical movement
    if (cursors.up.isDown) {
      this.gameObj.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      this.gameObj.setVelocityY(speed);
    }

    //this.gameObj.body.velocity.normalize().scale(speed);
  }
}
