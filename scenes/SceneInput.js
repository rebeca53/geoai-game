class SceneInput extends Phaser.Scene {
  constructor() {
    super({ key: "SceneInput" });
  }

  create() {
    this.add.text(110, 250, "This is the third Scene!", {
      fill: "#000000",
      fontSize: "20px",
    });

    this.input.on("pointerdown", () => {
      this.cameras.main.fade(800, 0, 0, 0, false, function (camera, progress) {
        if (progress > 0.9) {
          this.scene.stop("SceneInput");
          this.scene.start("SceneIntro");
        }
      });
    });
  }
}
