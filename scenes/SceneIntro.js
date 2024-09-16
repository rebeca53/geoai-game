class SceneIntro extends Phaser.Scene {
  constructor() {
    super({ key: "SceneIntro" });
  }

  create() {
    this.add.text(110, 150, "This is the Introduction!", {
      fill: "#000000",
      fontSize: "20px",
    });

    this.input.on("pointerdown", () => {
      this.scene.stop("SceneIntro");
      this.scene.start("SceneOverview");
    });
  }
}
