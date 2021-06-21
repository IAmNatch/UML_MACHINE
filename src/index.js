import "./styles.css";
import "normalize.css";

import { initStage } from "./lib/init";
import { UMLNode } from "./lib/uml";
import { BoxNode } from "./lib/box";
import { enableScrollToScale } from "./lib/controls";
import { coolerAutoLayout, primitiveAutoLayout } from "./lib/autoLayout";
import { example } from "./example";
import Konva from "konva";
const { stage, layer } = initStage();
const ELK = require("elkjs/lib/elk.bundled");
const elk = new ELK();

class Registry {
  constructor(schema) {
    this.schema = schema;
  }

  register = ({ item }) => {
    const node = this.getNodeFromItem({ item });
    if (node) {
      this.state = {
        ...this.state,
        nodes: [...this.state.nodes, node],
      };
    }
    return { node };
  };

  getAllChildren() {
    return this.schema.children;
  }

  getAllEdges() {
    return this.schema.edges;
  }

  getSchema() {
    return this.schema;
  }

  generateNodesFromSchema(layer) {
    this.schema.children.forEach((item, i) => {
      const node = this.getNodeFromItem({ item });
      if (node) {
        const { width, height } = node.getClientRect();

        this.schema.children[i].node = node;
        this.schema.children[i].width = width;
        this.schema.children[i].height = height;

        layer.add(node);
      }
    });
  }

  // must be run after autolayout calculated edges
  generateEdgesFromSchema(layer) {
    console.log("schema", this.schema);
    this.schema.edges.forEach((edge, i) => {
      console.log(edge);
      const current = edge.sections[0];
      const { startPoint, bendPoints, endPoint } = current;
      const bendPointsArray = bendPoints
        ? bendPoints.reduce(
            (acc, point) => [...acc, ...Object.values(point)],
            []
          )
        : [];

      const points = [
        ...Object.values(startPoint),
        ...bendPointsArray,
        ...Object.values(endPoint),
      ];

      const point = new Konva.Line({
        id: edge.id,
        points: points,
        width: 10,
        height: 10,
        stroke: "black",
      });

      const end = layer.findOne(`#${edge.targets[0]}`);
      end.on("dragmove", (e) => {
        const newPoint = [
          ...points.slice(0, points.length - 2),
          e.target.attrs.x + e.target.getClientRect().width / 2,
          e.target.attrs.y,
        ];

        point.points(newPoint);
        console.log(e);
      });

      layer.add(point);
    });
  }

  async applyAutoLayout() {
    this.schema = await elk.layout(this.schema);

    this.schema.children.forEach((node, i) => {
      const { x, y } = node;
      node.node.setAttrs({ x, y });
    });
  }

  getNodeFromItem({ item }) {
    switch (item.type) {
      case "uml":
        return UMLNode(item);
      case "box":
        return BoxNode(item);
      default:
        return null;
    }
  }
}

// const load = ({ schema = [], registry }) => {
//   // schema.children.forEach((item) => {
//   //   const { node } = registry.register({ item });
//   //   if (node) {
//   //     layer.add(node);
//   //   }
//   // });
//   // if (schema.edges) {
//   //   registry.addEdges({ edges: schema.edges });
//   // }
// };

const runApplication = async () => {
  const registry = new Registry(example);

  registry.generateNodesFromSchema(layer);

  await registry.applyAutoLayout();

  await registry.generateEdgesFromSchema(layer);

  // add the layer to the stage
  stage.add(layer);

  // add controls
  enableScrollToScale(stage);
  // draw the image
  layer.draw();
};

runApplication();
