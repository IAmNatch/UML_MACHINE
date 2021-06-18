import "./styles.css";
import "normalize.css";

import Konva from "konva";
import { initStage } from "./lib/init";
import { UMLNode } from "./lib/uml";
import { BoxNode } from "./lib/box";
import { enableScrollToScale } from "./lib/controls";

const { stage, layer } = initStage();

const example = {
  nodes: [
    {
      fk: "justabox",
      type: "box",
      title: "cool",
      content: `hello world i am your ru`,
    },
    {
      fk: "first",
      type: "uml",
      title: "Bae",
      content: [
        [
          `String [string] dsfkljdfsklj`,
          "Number! [number]",
          "long long long [long] dddddddd",
        ],
        ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ],
    },
    {
      fk: "second",
      type: "uml",
      title: "Hello lk",
      content: [
        [
          "String [string]",
          "Number! [number]",
          "long long long [long] dddddddd",
        ],
        ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ],
    },
    // {
    //   type: "uml",
    //   title: "Hello lk",
    //   content: [
    //     [
    //       "String [string]",
    //       "Number! [number]",
    //       "long long long [long] dddddddd"
    //     ],
    //     ["Bling [bling]", "Uber", "long long long long long long [long]"]
    //   ]
    // },
    // {
    //   type: "uml",
    //   title: "Hello lk",
    //   content: [
    //     [
    //       "String [string]",
    //       "Number! [number]",
    //       "long long long [long] dddddddd"
    //     ],
    //     ["Bling [bling]", "Uber", "long long long long long long [long]"]
    //   ]
    // },
    // {
    //   type: "uml",
    //   title: "Hello lk",
    //   content: [
    //     [
    //       "String [string]",
    //       "Number! [number]",
    //       "long long long [long] dddddddd"
    //     ],
    //     ["Bling [bling]", "Uber", "long long long long long long [long]"]
    //   ]
    // },
    {
      fk: "third",
      type: "uml",
      title: "Hello lk",
      content: [
        [
          "String [string]",
          "Number! [number]",
          "long long long [long] dddddddd",
        ],
        ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ],
    },
    {
      fk: "something_elssee",
      type: "uml",
      title: "Hello dear sir",
      content: [
        [
          "String [string]",
          "Number! [number]",
          "long long long [long] dddddddd",
          "Number! [number]",
          "long long long [long] dddddddd",
          "Number! [number]",
          "long long long [long] dddddddd",
        ],
        ["Bling [bling]", "Uber", "long long long long long long [long]"],
      ],
    },
  ],
  connections: [
    // { id: "e1", label: "hell world", sources: ["first"], targets: ["second"] },
    // { id: "e2", label: "hell world", sources: ["first"], targets: ["third"] }
  ],
};

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

const primitiveAutoLayout = ({ registry }) => {
  const nodes = registry.getAllNodes();

  nodes.forEach((node, i) => {
    if (i === 0) return null;
    const lastNode = nodes[i - 1].getClientRect();
    const adjustment = lastNode.x + lastNode.width + 15;
    node.x(adjustment);
  });
};

const ELK = require("elkjs/lib/elk.bundled");
const elk = new ELK();

const coolerAutoLayour = ({ registry }) => {
  const nodes = registry.getAllNodes();
  const connections = registry.getAllConnections();

  const nodesProxy = nodes.map((node) => {
    return {
      id: registry.nodeToFk(node._id),
      width: node.getClientRect().width,
      height: node.getClientRect().height,
    };
  });
  const layout = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.spacing.componentComponent": 55,
    },
    children: nodesProxy,
    edges: connections,
  };

  elk
    .layout(layout)
    .then((result) => {
      console.log("result", result);
      nodes.forEach((node, i) => {
        const { x, y, width, height } = result.children[i];
        node.setAttrs({ x, y });
      });
    })
    .catch(console.error);
};

const registry = new Registry();

load({ schema: example, registry });
// primitiveAutoLayout({ registry });
coolerAutoLayour({ registry });
// add the layer to the stage
stage.add(layer);

// add controls
enableScrollToScale(stage);
// draw the image
layer.draw();

const graph = {
  id: "root",
  layoutOptions: { "elk.algorithm": "layered" },
  children: [
    { id: "n1", width: 30, height: 30 },
    { id: "n2", width: 30, height: 30 },
    { id: "n3", width: 30, height: 30 },
  ],
  // edges: [
  //   { id: "e1", sources: ["fist"], targets: ["second"] },
  //   { id: "e2", sources: ["n1"], targets: ["n3"] }
  // ]
};
