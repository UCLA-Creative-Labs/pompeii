import NPC from './NPC';

export default class Shiba extends NPC {
  createBody() {
    this.gameObj.setCircle(4, {
      render: {
        sprite: { xOffset: 0.05, yOffset: -0.25 },
      },
    });
  }
  freeze() {
    this.time = 999;
    this.gameObj.anims.play('shiba-idle1');
    this.gameObj.setStatic(true);
  }
  unfreeze() {
    this.time = 0;
    this.gameObj.setStatic(false);
  }
  createAnimations() {
    const anims = this.scene.anims;
    this.pastDir = this.dir;
    anims.create({
      key: 'shiba-idle1',
      frameRate: 3,
      frames: anims.generateFrameNumbers('shiba', {
        frames: [20, 21, 23, 24, 25, 26, 24],
      }),
    });

    anims.create({
      key: 'shiba-idle2',
      frameRate: 3,
      frames: anims.generateFrameNumbers('shiba', {
        start: 27,
        end: 29,
      }),
    });

    anims.create({
      key: 'shiba-left',
      frameRate: 7,
      repeat: -1,
      frames: this.scene.anims.generateFrameNumbers('shiba', {
        start: 12,
        end: 15,
      }),
    });

    anims.create({
      key: 'shiba-right1',
      frameRate: 7,
      repeat: -1,
      frames: anims.generateFrameNumbers('shiba', {
        start: 4,
        end: 7,
      }),
    });

    anims.create({
      key: 'shiba-right2',
      frameRate: 7,
      repeat: -1,
      frames: anims.generateFrameNumbers('shiba', {
        start: 32,
        end: 34,
      }),
    });

    anims.create({
      key: 'shiba-down',
      frameRate: 7,
      repeat: -1,
      frames: this.scene.anims.generateFrameNumbers('shiba', {
        start: 8,
        end: 11,
      }),
    });

    anims.create({
      key: 'shiba-up',
      frameRate: 7,
      repeat: -1,
      frames: anims.generateFrameNumbers('shiba', {
        start: 0,
        end: 3,
      }),
    });
  }
  playAnimations() {
    // Don't change animations if direction is the same
    if (this.dir == this.pastDir || (this.dir > 3 && this.pastDir > 3)) {
      return;
    }
    this.pastDir = this.dir;
    this.speed = 1;
    switch (this.dir) {
      case 0: //Left
        this.gameObj.anims.play('shiba-left');
        break;
      case 1: //Right
        if (Math.random() < 0.5) {
          this.gameObj.anims.play('shiba-right1');
        } else {
          this.gameObj.anims.play('shiba-right2');
          this.speed = 2;
        }
        break;
      case 2: //Up
        this.gameObj.anims.play('shiba-up');
        break;
      case 3: //Down
        this.gameObj.anims.play('shiba-down');
        break;
      default:
        this.time + 3; //Increase idle time
        if (Math.random() < 0.5) {
          this.gameObj.anims.play('shiba-idle1');
        } else {
          this.gameObj.anims.play('shiba-idle2');
        }
        break;
    }
  }
  getSpeed() {
    return this.speed;
  }
}
