import Konva from "konva";

export const initStage = () => {
  // first we need to create a stage
  var stage = new Konva.Stage({
    container: "app", // id of container <div>
    width: window.innerWidth,
    height: window.innerHeight
  });

  // then create layer
  var layer = new Konva.Layer();

  return { stage, layer };
};
