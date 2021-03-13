export default class NPC {
  constructor(scene, x, y, avatar) {
    this.scene = scene;
    this.createAnimations();
    this.gameObj = this.scene.matter.add.sprite(x, y, avatar, 0);
    this.gameObj.body.collideWorldBounds = true;

    this.time = 0;
    this.dir = 0;
    this.createBody();
    // Use for debugging
    // this.scene.input.keyboard.on('keydown_M', this.debug, this);
  }
  debug() {}
  createBody() {}
  createAnimations() {}
  playAnimations() {}
  getSpeed() {
    return 2;
  }
  move(_time, delta) {
    const speed = this.getSpeed();
    this.time -= delta / 1000;
    if (this.time <= 0) {
      // Choose random direction and movement time
      this.time = Math.floor(Math.random() * 3 + 1);
      this.dir = Math.floor(Math.random() * 8);
      this.playAnimations();
      switch (this.dir) {
        case 0: //Left
          this.gameObj.setVelocityX(-speed);
          break;
        case 1: //Right
          this.gameObj.setVelocityX(speed);
          break;
        case 2: //Up
          this.gameObj.setVelocityY(speed);
          break;
        case 3: //Down
          this.gameObj.setVelocityY(-speed);
          break;
        default:
          this.gameObj.setVelocity(0);
          break;
      }
    }
  }
  update(time, delta) {
    this.gameObj.body.angle = 0;
    if (!this.gameObj.isStatic()) this.move(time, delta);
  }
}
