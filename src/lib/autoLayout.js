import { forEach } from "ramda";

const ELK = require("elkjs/lib/elk.bundled");
const elk = new ELK();

// Without ELK!
export const primitiveAutoLayout = ({ registry }) => {
  const nodes = registry.getAllNodes();

  nodes.forEach((node, i) => {
    if (i === 0) return null;
    const lastNode = nodes[i - 1].getClientRect();
    const adjustment = lastNode.x + lastNode.width + 15;
    node.x(adjustment);
  });
};

// With the all might elk!
export const coolerAutoLayout = async ({ registry }) => {
  const nodes = registry.getAllNodes();
  const edges = registry.getAllEdges();

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
      "elk.aspectRatio": window.innerHeight / window.innerWidth,
    },
    children: nodesProxy,
    edges: edges,
    width: 1000,
    height: 1000,
  };

  try {
    console.log("w", window.innerWidth);
    console.log("h", window.innerHeight);

    const result = await elk.layout(layout);
    console.log("autoLayoutResultss", result);
    nodes.forEach((node, i) => {
      const { x, y, width, height } = result.children[i];
      node.setAttrs({ x, y });
    });

    return result;
  } catch (e) {
    console.error("coolerAutoLayout() -", e);
  }
};
