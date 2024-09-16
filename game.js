const gameState = {
  score: 0,
};

/**
 * TODO:
 * - background image depicting the lab, or just a color
 * - 'walls' to replace 'platform', it is a staticGroup and also have collider
 * - the Pixels according to an image representation - it is a physics.add.group(), have a collider to apply function
 * - the character - with hability to change color (power?)
 * - the relu function zone - have a collider to make color change
 * - the inverse relu function zone - have a collider to make color change
 * - the dialog message
 */

function preload() {
  this.load.image(
    "bug1",
    "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_1.png"
  );
  this.load.image(
    "bug2",
    "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_2.png"
  );
  this.load.image(
    "bug3",
    "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/bug_3.png"
  );
  this.load.image(
    "platform",
    "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/platform.png"
  );
  this.load.image(
    "codey",
    "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/physics/codey.png"
  );

  // 0 - idle
  // 8, 9 - talk
  // 16 - 20 - reload
  // 24 - 27 - run
  this.load.spritesheet({
    key: "grey-player",
    url: "./assets/players grey x2.png",
    frameConfig: {
      frameWidth: 64,
      frameHeight: 64,
      startFrame: 0,
      endFrame: 100,
    },
  });
}

function create() {
  // TODO: replace 'platforms' with 'walls'
  const platforms = this.physics.add.staticGroup();
  platforms.create(320, 350, "platform").setScale(2, 0.5).refreshBody();

  gameState.scoreText = this.add.text(320, 340, "Score: 0", {
    fontSize: "15px",
    fill: "#000",
  });

  // this.add.sprite(300, 300, "grey-player", 0);
  this.player = this.physics.add.sprite(320, 300, "grey-player", 26);

  // this.player = this.physics.add.sprite(320, 300, "codey").setScale(0.5);

  // To have collision with the 'platform' that represents the floor
  this.player.setCollideWorldBounds(true);
  this.physics.add.collider(this.player, platforms);
}

function update() {
  const cursors = this.input.keyboard.createCursorKeys();
  this.player.setVelocity(0);

  if (cursors.left.isDown) {
    this.player.setVelocityX(-200);
  }

  if (cursors.right.isDown) {
    this.player.setVelocityX(200);
  }

  if (cursors.up.isDown) {
    this.player.setVelocityY(-200);
  }

  if (cursors.down.isDown) {
    this.player.setVelocityY(200);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  backgroundColor: "b9eaff",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      // enableBody: true,
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const game = new Phaser.Game(config);
