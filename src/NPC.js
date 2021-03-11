export default class NPC {
  constructor(scene, x, y, avatar) {
    this.npc = scene.matter.add.sprite(x, y, avatar);
    this.npc.body.collideWorldBounds = true;
    this.time = 0;
    this.dir = 0;
    this.createAnimations();
  }
  createAnimations() {}
  getSpeed() {
    return 2;
  }
  move(_time, delta) {
    const speed = this.getSpeed();
    this.time -= delta / 1000;
    if (this.time <= 0) {
      // Choose random direction and movement time
      this.time = Math.floor(Math.random() * 5 + 1);
      this.dir = Math.floor(Math.random() * 5 + 1);
    }

    switch (this.dir) {
      case 0: //Idle
        this.npc.setVelocity(0);
        break;
      case 1: //Left
        this.npc.setVelocityX(-speed);
        break;
      case 2: //Right
        this.npc.setVelocityX(speed);
        break;
      case 3: //Up
        this.npc.setVelocityY(speed);
        break;
      case 4: //Down
        this.npc.setVelocityY(-speed);
        break;
    }
  }
  update(time, delta) {
    this.move(time, delta);
  }
}
