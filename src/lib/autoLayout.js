import { forEach, merge, mergeDeepRight } from "ramda";

const ELK = require("elkjs/lib/elk.bundled");
const elk = new ELK();

// Without ELK!
export const primitiveAutoLayout = ({ registry }) => {
  const nodes = registry.getAllChildren();

  nodes.forEach((node, i) => {
    if (i === 0) return null;
    const lastNode = nodes[i - 1].getClientRect();
    const adjustment = lastNode.x + lastNode.width + 15;
    node.x(adjustment);
  });
};

// With the all might elk!
export const coolerAutoLayout = async ({ registry }) => {
  const children = registry.getAllChildren();
  const edges = registry.getAllEdges();
  const schema = registry.getSchema();

  try {
    const result = await elk.layout(schema);

    console.log("autoLayoutResultss", result);

    // const mergeDeep = mergeDeepRight(schema, result);
    // console.log("merge result", mergeDeep);
    result.children.forEach((node, i) => {
      const { x, y } = node;
      node.node.setAttrs({ x, y });
    });

    return result;
  } catch (e) {
    console.error("coolerAutoLayout() -", e);
  }
};
