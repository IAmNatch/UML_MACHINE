import "./styles.css";
import "normalize.css";

import Konva from "konva";
import { initStage } from "./lib/init";
import { UMLNode } from "./lib/uml";
import { BoxNode } from "./lib/box";
import { enableScrollToScale } from "./lib/controls";
import { coolerAutoLayout, primitiveAutoLayout } from "./lib/autoLayout";
import { example } from "./example";
const { stage, layer } = initStage();

class Registry {
  state = {
    nodes: [],
    fkToNodeMap: {}, // from nodeID to 12341 from node
    connections: [],
  };

  register = ({ item }) => {
    const node = this.getNodeFromItem({ item });
    if (node) {
      this.state = {
        ...this.state,
        nodes: [...this.state.nodes, node],
        fkToNodeMap: { ...this.state.fkToNodeMap, [item.fk]: node._id },
        nodeToFkMap: { ...this.state.nodeToFkMap, [node._id]: item.fk },
      };
    }
    return { node };
  };

  getAllNodes() {
    return this.state.nodes;
  }

  getAllConnections() {
    return this.state.connections;
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

  nodeToFk(nodeID) {
    return this.state.nodeToFkMap[nodeID];
  }

  addConnections({ connections }) {
    this.state = {
      ...this.state,
      connections: [...this.state.connections, ...connections],
    };
  }
}

const load = ({ schema = [], registry }) => {
  schema.nodes.forEach((item) => {
    const { node } = registry.register({ item });

    if (node) {
      layer.add(node);
    }
  });

  if (schema.connections) {
    registry.addConnections({ connections: schema.connections });
  }
};

const registry = new Registry();

load({ schema: example, registry });
// primitiveAutoLayout({ registry });
coolerAutoLayout({ registry });
// add the layer to the stage
stage.add(layer);

// add controls
enableScrollToScale(stage);
// draw the image
layer.draw();
