const gameState = {
  score: 0,
  width: 1920,
  height: 1280,
};

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 360,
  backgroundColor: "b9eaff",
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 200 },
      // enableBody: true,
      debug: true,
    },
  },
  scene: [SceneIntro, SceneOverview, SceneInput],
};

const game = new Phaser.Game(config);
