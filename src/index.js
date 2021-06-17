import "./styles.css";
import "normalize.css";

import Konva from "konva";
import { initStage } from "./lib/init";
import { UMLNode } from "./lib/uml";
import { enableScrollToScale } from "./lib/controls";

const constants = {};

const { stage, layer } = initStage();

// create our shape
var circle = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4
});

// add the shape to the layer
layer.add(circle);
layer.add(
  UMLNode({
    title: "Hello",
    content: [
      ["String [string]", "Number! [number]", "long long long [long] dddddddd"],
      ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ["long long long long long long [long] long long [long]"],
      ["Bling [bling]", "Uber"],
      ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ["Bling [bling]", "Uber", "long long long long long long [long]"]
    ]
  })
);
// add the layer to the stage
stage.add(layer);

// add controls
enableScrollToScale(stage);
// draw the image
layer.draw();