export const enableScrollToScale = (stage) => {
  stage.on("wheel", function (e) {
    e.evt.preventDefault();

    stage.scaleX(stage.scaleX() + e.evt.deltaX * 0.01);
    stage.scaleY(stage.scaleY() + e.evt.deltaX * 0.01);
  });
};
