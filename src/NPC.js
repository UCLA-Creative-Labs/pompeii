export default class NPC {
  constructor(scene, x, y, avatar) {
    this.scene = scene;
    this.createAnimations();
    this.npc = this.scene.matter.add.sprite(x, y, avatar, 0);
    this.npc.body.collideWorldBounds = true;
    this.time = 0;
    this.dir = 0;
    this.scene.input.keyboard.on('keydown_M', this.debug, this);
  }
  debug() {}
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
          this.npc.setVelocityX(-speed);
          break;
        case 1: //Right
          this.npc.setVelocityX(speed);
          break;
        case 2: //Up
          this.npc.setVelocityY(speed);
          break;
        case 3: //Down
          this.npc.setVelocityY(-speed);
          break;
        default:
          this.npc.setVelocity(0);
          break;
      }
    }
  }
  update(time, delta) {
    this.npc.body.angle = 0;
    this.move(time, delta);
  }
}
