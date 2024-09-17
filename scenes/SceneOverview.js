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
class SceneOverview extends Phaser.Scene {
  constructor() {
    super({ key: "SceneOverview" });
  }
  preload() {
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

  create() {
    this.add.text(110, 300, "This is the Overview!", {
      fill: "#000000",
      fontSize: "20px",
    });

    // TODO: replace 'platforms' with 'walls'
    const platforms = this.physics.add.staticGroup();
    platforms.create(320, 350, "platform").setScale(2, 0.5).refreshBody();

    // this.levelSetup(); // draw the buildings/layers/rooms
    // ADD PLAYER
    this.player = this.physics.add.sprite(320, 300, "grey-player");

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("grey-player", {
        start: 0,
        end: 0,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("grey-player", {
        start: 24,
        end: 27,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // ADD CAMERA
    this.cameras.main.setBounds(0, 0, gameState.width, gameState.height); // the world is larger thatn our current window
    this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

    // To have collision with the 'platform' that represents the floor
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, platforms);

    // To transition between Scenes
    this.input.on("pointerdown", () => {
      this.scene.stop("SceneOverview");
      this.scene.start("SceneInput");
    });

    // SCORE
    gameState.scoreText = this.add.text(320, 340, "Score: 0", {
      fontSize: "15px",
      fill: "#000",
    });
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("run", true);
      this.player.flipX = true;
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("run", true);
      this.player.flipX = false;
    } else if (cursors.up.isDown) {
      this.player.setVelocityY(-200);
      this.player.anims.play("run", true);
    } else if (cursors.down.isDown) {
      this.player.setVelocityY(200);
      this.player.anims.play("run", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.play("idle", true);
    }
  }
}
