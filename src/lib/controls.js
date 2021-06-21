export const enableScrollToScale = (stage) => {
  stage.on("wheel", function (e) {
    e.evt.preventDefault();

    stage.scaleX(stage.scaleX() + e.evt.deltaY * 0.01);
    stage.scaleY(stage.scaleY() + e.evt.deltaY * 0.01);
  });
};
