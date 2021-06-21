/**
 * Root Node Schema:
 *
 * {
 * id: String
 * children: [
 *
 * ],
 * edges: [
 * ]
 * }
 */

export const example = {
  id: "root",
  layoutOptions: {
    "elk.algorithm": "layered",
    "elk.spacing.componentComponent": 50,
    "elk.aspectRatio": window.innerHeight / window.innerWidth,
    "org.eclipse.elk.layered.nodePlacement.bk.edgeStraightening":
      "IMPROVE_STRAIGHTNESS",
    // "org.eclipse.elk.layered.nodePlacement.strategy": "LINEAR_SEGMENTS",
  },
  children: [
    {
      id: "justabox",
      type: "box",
      title: "cool",
      content: `hello world i am your ru`,
    },
    {
      id: "first",
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
      id: "second",
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
      id: "third",
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
      id: "something_elssee",
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
  edges: [
    { id: "e1", label: "hell world", sources: ["first"], targets: ["second"] },
    { id: "e2", label: "hell world", sources: ["first"], targets: ["third"] },
  ],
};
